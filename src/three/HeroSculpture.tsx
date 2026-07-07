import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { useGlassMaterialProps } from "./materials/GlassMaterial";
import { smoothPointer, smoothScroll } from "@/lib/scrollState";
import type { RenderQuality } from "./Scene";

// 一组关键帧，按滚动进度插值雕塑的位置 / 缩放 / 旋转速度
const KEYFRAMES = [
  { p: 0.0, pos: [0, 0, 0] as const, scale: 1.0, spin: 0.18 },
  { p: 0.2, pos: [1.6, 0.7, -0.6] as const, scale: 0.92, spin: 0.22 },
  { p: 0.4, pos: [0, 2.2, -2.2] as const, scale: 0.78, spin: 0.16 },
  { p: 0.6, pos: [-1.8, 0.6, -1.0] as const, scale: 0.86, spin: 0.24 },
  { p: 0.8, pos: [0, 0.4, -0.4] as const, scale: 0.96, spin: 0.2 },
  { p: 1.0, pos: [0, 0, 0] as const, scale: 1.0, spin: 0.18 },
];

function interpKeyframe(p: number) {
  for (let i = 0; i < KEYFRAMES.length - 1; i++) {
    const a = KEYFRAMES[i];
    const b = KEYFRAMES[i + 1];
    if (p >= a.p && p <= b.p) {
      const t = (p - a.p) / (b.p - a.p || 1);
      const ease = t * t * (3 - 2 * t); // smoothstep
      return {
        pos: [
          THREE.MathUtils.lerp(a.pos[0], b.pos[0], ease),
          THREE.MathUtils.lerp(a.pos[1], b.pos[1], ease),
          THREE.MathUtils.lerp(a.pos[2], b.pos[2], ease),
        ] as [number, number, number],
        scale: THREE.MathUtils.lerp(a.scale, b.scale, ease),
        spin: THREE.MathUtils.lerp(a.spin, b.spin, ease),
      };
    }
  }
  const last = KEYFRAMES[KEYFRAMES.length - 1];
  return {
    pos: last.pos as [number, number, number],
    scale: last.scale,
    spin: last.spin,
  };
}

function CrystalShard({
  radius,
  speed,
  phase,
  y,
  size,
  color,
}: {
  radius: number;
  speed: number;
  phase: number;
  y: number;
  size: number;
  color: THREE.ColorRepresentation;
}) {
  const ref = useRef<THREE.Group>(null);
  const glass = useGlassMaterialProps({
    color,
    thickness: 0.8,
    attenuationColor: color,
    attenuationDistance: 1.5,
    iridescence: 0.8,
  });
  useFrame((_, delta) => {
    const t = performance.now() * 0.001;
    if (ref.current) {
      ref.current.position.set(
        Math.cos(t * speed + phase) * radius,
        y + Math.sin(t * speed * 1.3 + phase) * 0.18,
        Math.sin(t * speed + phase) * radius,
      );
      ref.current.rotation.x += delta * 0.4;
      ref.current.rotation.y += delta * 0.55;
    }
  });
  return (
    <group ref={ref}>
      <mesh>
        <icosahedronGeometry args={[size, 0]} />
        <meshPhysicalMaterial {...glass} />
      </mesh>
    </group>
  );
}

export default function HeroSculpture({ quality, mobile }: { quality: RenderQuality; mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ribbon = useRef<THREE.Mesh>(null);
  const core = useRef<THREE.Mesh>(null);
  const innerRing = useRef<THREE.Mesh>(null);
  const outerHalo = useRef<THREE.Mesh>(null);

  const ribbonGlass = useGlassMaterialProps({
    color: "#f5f1e8",
    thickness: 1.6,
    roughness: 0.04,
    iridescence: 1,
    attenuationColor: "#d4b896",
    attenuationDistance: 1.0,
  });
  const coreGlass = useGlassMaterialProps({
    color: "#5eead4",
    thickness: 0.9,
    roughness: 0.12,
    iridescence: 1,
    iridescenceIOR: 1.46,
    attenuationColor: "#5eead4",
    attenuationDistance: 0.8,
  });
  const haloGlass = useGlassMaterialProps({
    color: "#f5f1e8",
    thickness: 0.35,
    roughness: 0.02,
    iridescence: 1,
    attenuationColor: "#d4b896",
    attenuationDistance: 1.8,
    envMapIntensity: quality >= 4 ? 2.2 : 1.4,
    opacity: quality >= 4 ? 0.72 : 0.48,
  });

  // 噪声变形几何（一次性）
  const ribbonGeo = useMemo(() => {
    const radialSegments = [96, 144, 192, 240, 320][quality];
    const tubularSegments = [8, 12, 16, 18, 24][quality];
    const g = new THREE.TorusKnotGeometry(1.05, 0.32, radialSegments, tubularSegments, 2, 3);
    const pos = g.attributes.position as THREE.BufferAttribute;
    const v = new THREE.Vector3();
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i);
      const n = (Math.sin(v.x * 3.2) + Math.cos(v.y * 2.7) + Math.sin(v.z * 3.5)) * 0.045;
      v.multiplyScalar(1 + n);
      pos.setXYZ(i, v.x, v.y, v.z);
    }
    g.computeVertexNormals();
    return g;
  }, [quality]);

  useFrame((_, delta) => {
    const p = smoothScroll(delta);
    const kf = interpKeyframe(p);
    const ptr = smoothPointer(delta, 3);
    if (group.current) {
      group.current.position.lerp(
        new THREE.Vector3(kf.pos[0] + ptr.x * 0.25, kf.pos[1] + ptr.y * 0.18, kf.pos[2]),
        0.1,
      );
      const s = kf.scale * (mobile ? 0.82 : 1);
      group.current.scale.lerp(new THREE.Vector3(s, s, s), 0.1);
    }
    if (ribbon.current) {
      ribbon.current.rotation.x += delta * kf.spin;
      ribbon.current.rotation.y += delta * kf.spin * 1.4;
      ribbon.current.rotation.z += delta * kf.spin * 0.3;
    }
    if (core.current) {
      core.current.rotation.x -= delta * kf.spin * 0.6;
      core.current.rotation.y -= delta * kf.spin * 0.9;
    }
    if (innerRing.current) {
      innerRing.current.rotation.x += delta * kf.spin * 0.45;
      innerRing.current.rotation.z -= delta * kf.spin * 0.8;
    }
    if (outerHalo.current) {
      outerHalo.current.rotation.y -= delta * kf.spin * 0.28;
      outerHalo.current.rotation.z += delta * kf.spin * 0.18;
    }
  });

  return (
    <group ref={group}>
      {/* 主体：扭曲环结缎带 */}
      <mesh ref={ribbon} geometry={ribbonGeo} castShadow>
        <meshPhysicalMaterial {...ribbonGlass} />
      </mesh>
      {/* 内核：青色多面体 */}
      <mesh ref={core} scale={0.42}>
        <icosahedronGeometry args={[1, 1]} />
        <meshPhysicalMaterial {...coreGlass} />
      </mesh>
      {quality >= 3 && (
        <mesh ref={innerRing} scale={0.78} rotation={[Math.PI / 2.6, 0.2, 0.4]}>
          <torusGeometry args={[1.04, 0.018, quality >= 4 ? 18 : 10, quality >= 4 ? 192 : 96]} />
          <meshPhysicalMaterial {...haloGlass} />
        </mesh>
      )}
      {quality >= 4 && (
        <mesh ref={outerHalo} scale={1.38} rotation={[0.35, 0.55, 0.2]}>
          <torusGeometry args={[1.35, 0.012, 12, 240]} />
          <meshPhysicalMaterial {...haloGlass} opacity={0.42} />
        </mesh>
      )}
      {/* 三颗轨道晶片 */}
      {quality >= 1 && <CrystalShard radius={2.0} speed={0.45} phase={0} y={0.1} size={0.18} color="#d4b896" />}
      {quality >= 2 && <CrystalShard radius={2.3} speed={-0.32} phase={2.1} y={-0.25} size={0.14} color="#e8b4b8" />}
      {quality >= 2 && <CrystalShard radius={1.8} speed={0.6} phase={4.2} y={0.35} size={0.12} color="#5eead4" />}
      {quality >= 4 && <CrystalShard radius={2.55} speed={0.24} phase={5.4} y={0.02} size={0.1} color="#f5f1e8" />}
    </group>
  );
}
