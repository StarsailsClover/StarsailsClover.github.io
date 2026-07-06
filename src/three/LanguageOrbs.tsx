import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import type { LanguageStat } from "@/lib/githubApi";
import { useGlassMaterialProps } from "./materials/GlassMaterial";
import { smoothScroll } from "@/lib/scrollState";
import type { RenderQuality } from "./Scene";

// 在 Act 2.5 ~ Act 4 (滚动 0.32 ~ 0.72) 之间淡入淡出
function visibility(p: number) {
  const in_ = THREE.MathUtils.smoothstep(p, 0.32, 0.42);
  const out = 1 - THREE.MathUtils.smoothstep(p, 0.68, 0.78);
  return Math.min(in_, out);
}

function Orb({
  stat,
  index,
  total,
  ringRadius,
  quality,
}: {
  stat: LanguageStat;
  index: number;
  total: number;
  ringRadius: number;
  quality: RenderQuality;
}) {
  const ref = useRef<THREE.Group>(null);
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null);
  const [hovered, setHovered] = useState(false);
  const angle = (index / total) * Math.PI * 2;
  // 尺寸 ∝ 占比，最小 0.32，最大 0.7
  const size = THREE.MathUtils.lerp(0.32, 0.7, stat.ratio);

  const glass = useGlassMaterialProps({
    color: stat.color,
    thickness: 0.9,
    roughness: 0.08,
    iridescence: 0.9,
    iridescenceIOR: 1.4,
    attenuationColor: stat.color,
    attenuationDistance: 0.7,
  });

  useFrame((_, delta) => {
    const t = performance.now() * 0.001;
    const spinSpeed = hovered ? 1.4 : 0.32;
    if (ref.current) {
      const a = angle + t * spinSpeed * 0.4;
      const yBob = Math.sin(t * 0.8 + index) * 0.18;
      ref.current.position.set(
        Math.cos(a) * ringRadius,
        yBob,
        Math.sin(a) * ringRadius,
      );
      ref.current.rotation.y += delta * spinSpeed;
      ref.current.rotation.x += delta * spinSpeed * 0.4;
      const targetScale = hovered ? 1.25 : 1.0;
      ref.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        0.12,
      );
    }
  });

  return (
    <group
      ref={ref}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(false);
        document.body.style.cursor = "";
      }}
    >
      <mesh>
        <icosahedronGeometry args={[size, quality >= 2 ? 1 : 0]} />
        <meshPhysicalMaterial
          ref={matRef}
          {...glass}
          emissive={new THREE.Color(stat.color)}
          emissiveIntensity={hovered ? 0.6 : 0.18}
        />
      </mesh>
      {/* 内核小光点 */}
      {quality >= 2 && <pointLight color={stat.color} intensity={hovered ? 2.5 : 0.8} distance={2.2} />}
    </group>
  );
}

export default function LanguageOrbs({ languages, quality, mobile }: { languages: LanguageStat[]; quality: RenderQuality; mobile: boolean }) {
  const group = useRef<THREE.Group>(null);
  const ringRadius = useMemo(
    () => (mobile ? 1.9 : languages.length > 4 ? 2.7 : 2.2),
    [languages.length, mobile],
  );
  const maxVisible = quality === 0 ? 4 : quality === 1 ? 6 : languages.length;

  useFrame((_, delta) => {
    const p = smoothScroll(delta);
    const vis = visibility(p);
    if (group.current) {
      group.current.visible = vis > 0.01;
      group.current.position.y = THREE.MathUtils.lerp(2.2, 0, vis);
      group.current.rotation.y += delta * 0.05;
      const s = THREE.MathUtils.lerp(0.6, 1.0, vis);
      group.current.scale.set(s, s, s);
    }
  });

  if (languages.length === 0) return null;

  return (
    <group ref={group}>
      {languages.slice(0, maxVisible).map((stat, i, visibleLanguages) => (
        <Orb
          key={stat.name}
          stat={stat}
          index={i}
          total={visibleLanguages.length}
          ringRadius={ringRadius}
          quality={quality}
        />
      ))}
    </group>
  );
}
