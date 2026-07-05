import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { scrollState, smoothPointer, smoothScroll } from "@/lib/scrollState";

// 相机关键帧：每幕一组 (位置, 目标)
const CAM_KEYS = [
  { p: 0.0, pos: [0, 0, 6.5] as const, target: [0, 0, 0] as const },
  { p: 0.2, pos: [1.6, 0.4, 5.4] as const, target: [0, 0.2, 0] as const },
  { p: 0.4, pos: [0, 0.6, 7.2] as const, target: [0, 0.4, 0] as const },
  { p: 0.6, pos: [-1.4, 0.5, 6.0] as const, target: [0, 0.1, 0] as const },
  { p: 0.8, pos: [0, 0.2, 8.2] as const, target: [0, 0, 0] as const },
  { p: 1.0, pos: [0, 0, 9.5] as const, target: [0, 0, 0] as const },
];

function interp(p: number) {
  for (let i = 0; i < CAM_KEYS.length - 1; i++) {
    const a = CAM_KEYS[i];
    const b = CAM_KEYS[i + 1];
    if (p >= a.p && p <= b.p) {
      const t = (p - a.p) / (b.p - a.p || 1);
      const e = t * t * (3 - 2 * t);
      return {
        pos: [
          THREE.MathUtils.lerp(a.pos[0], b.pos[0], e),
          THREE.MathUtils.lerp(a.pos[1], b.pos[1], e),
          THREE.MathUtils.lerp(a.pos[2], b.pos[2], e),
        ] as [number, number, number],
        target: [
          THREE.MathUtils.lerp(a.target[0], b.target[0], e),
          THREE.MathUtils.lerp(a.target[1], b.target[1], e),
          THREE.MathUtils.lerp(a.target[2], b.target[2], e),
        ] as [number, number, number],
      };
    }
  }
  const last = CAM_KEYS[CAM_KEYS.length - 1];
  return { pos: last.pos as [number, number, number], target: last.target as [number, number, number] };
}

const _target = new THREE.Vector3();
const _pos = new THREE.Vector3();

export default function Rig() {
  const { camera } = useThree();
  useFrame((_, delta) => {
    const p = smoothScroll(delta, 3.5);
    const ptr = smoothPointer(delta, 2.5);
    const kf = interp(p);
    _pos.set(
      kf.pos[0] + ptr.x * 0.45,
      kf.pos[1] + ptr.y * 0.3,
      kf.pos[2],
    );
    camera.position.lerp(_pos, 0.08);
    _target.set(kf.target[0] + ptr.x * 0.12, kf.target[1] + ptr.y * 0.08, kf.target[2]);
    camera.lookAt(_target);
    // scrollState.velocity 已被 smoothScroll 更新，无需再用
    void scrollState;
  });
  return null;
}
