import * as THREE from "three";
import { useMemo } from "react";

// 玻璃材质预设：高透射 + 虹彩 + 清漆，营造琉璃质感
export interface GlassMaterialProps {
  color?: THREE.ColorRepresentation;
  transmission?: number;
  thickness?: number;
  roughness?: number;
  ior?: number;
  iridescence?: number;
  iridescenceIOR?: number;
  clearcoat?: number;
  attenuationColor?: THREE.ColorRepresentation;
  attenuationDistance?: number;
  envMapIntensity?: number;
  transparent?: boolean;
  opacity?: number;
}

export function useGlassMaterialProps(overrides: GlassMaterialProps = {}) {
  return {
    color: overrides.color ?? "#f5f1e8",
    transmission: overrides.transmission ?? 1,
    thickness: overrides.thickness ?? 1.4,
    roughness: overrides.roughness ?? 0.06,
    ior: overrides.ior ?? 1.5,
    iridescence: overrides.iridescence ?? 1,
    iridescenceIOR: overrides.iridescenceIOR ?? 1.3,
    clearcoat: overrides.clearcoat ?? 1,
    clearcoatRoughness: 0.08,
    attenuationColor: overrides.attenuationColor ?? "#d4b896",
    attenuationDistance: overrides.attenuationDistance ?? 1.2,
    envMapIntensity: overrides.envMapIntensity ?? 1.4,
    transparent: overrides.transparent ?? true,
    opacity: overrides.opacity ?? 1,
    side: THREE.DoubleSide,
  };
}

// 圆形粒子贴图（程序化生成，避免外部资源）
export function useCircleTexture() {
  return useMemo(() => {
    const size = 64;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(
      size / 2,
      size / 2,
      0,
      size / 2,
      size / 2,
      size / 2,
    );
    grad.addColorStop(0, "rgba(255,255,255,1)");
    grad.addColorStop(0.4, "rgba(255,255,255,0.55)");
    grad.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);
}
