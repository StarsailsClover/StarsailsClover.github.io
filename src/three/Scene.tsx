import { Canvas, useFrame } from "@react-three/fiber";
import { Suspense, useMemo, useState } from "react";
import * as THREE from "three";
import HeroSculpture from "./HeroSculpture";
import LanguageOrbs from "./LanguageOrbs";
import Dust from "./Dust";
import Lights from "./Lights";
import Environment3D from "./Environment3D";
import PostFX from "./PostFX";
import Rig from "./Rig";
import type { LanguageStat } from "@/lib/githubApi";

interface SceneProps {
  languages: LanguageStat[];
  particleCount?: number;
  onCreated?: () => void;
}

export type RenderQuality = 0 | 1 | 2 | 3;

const QUALITY_DPR: Record<RenderQuality, [number, number]> = {
  0: [0.75, 1],
  1: [0.9, 1.25],
  2: [1, 1.5],
  3: [1, 2],
};

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return (
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
    (typeof window !== "undefined" && window.innerWidth < 768)
  );
}

function initialQuality(mobile: boolean): RenderQuality {
  const cores = typeof navigator === "undefined" ? 8 : navigator.hardwareConcurrency || 4;
  const memory = typeof navigator === "undefined"
    ? 8
    : (navigator as Navigator & { deviceMemory?: number }).deviceMemory || 4;
  if (mobile || cores <= 4 || memory <= 4) return 1;
  return 2;
}

function PerformanceGovernor({
  quality,
  onQualityChange,
}: {
  quality: RenderQuality;
  onQualityChange: (quality: RenderQuality) => void;
}) {
  const state = useMemo(() => ({ frames: 0, elapsed: 0, cooldown: 1.5 }), []);

  useFrame((_, delta) => {
    const safeDelta = Math.min(delta, 0.1);
    state.frames += 1;
    state.elapsed += safeDelta;
    state.cooldown = Math.max(0, state.cooldown - safeDelta);

    if (state.elapsed < 2.5 || state.cooldown > 0) return;

    const avgFps = state.frames / state.elapsed;
    let next = quality;
    if (avgFps < 45 && quality > 0) next = (quality - 1) as RenderQuality;
    if (avgFps > 58 && quality < 3) next = (quality + 1) as RenderQuality;

    state.frames = 0;
    state.elapsed = 0;

    if (next !== quality) {
      state.cooldown = 3;
      onQualityChange(next);
    }
  });

  return null;
}

export default function Scene({ languages, particleCount, onCreated }: SceneProps) {
  const mobile = typeof window !== "undefined" ? isMobile() : false;
  const [quality, setQuality] = useState<RenderQuality>(() => initialQuality(mobile));
  const particles = particleCount ?? Math.round((mobile ? 220 : 760) * [0.45, 0.65, 0.85, 1][quality]);
  const dpr = QUALITY_DPR[quality];
  const shadows = !mobile && quality >= 2;

  return (
    <Canvas
      className="!fixed inset-0"
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      onCreated={onCreated}
      gl={{
        antialias: quality >= 2 && !mobile,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      dpr={dpr}
      camera={{ fov: mobile ? 48 : 42, near: 0.1, far: 100, position: [0, mobile ? 0.25 : 0, mobile ? 7.4 : 6.5] }}
      shadows={shadows}
    >
      <PerformanceGovernor quality={quality} onQualityChange={setQuality} />
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", mobile ? 7 : 9, 22]} />

      <Suspense fallback={null}>
        <Environment3D quality={quality} />
        <Lights quality={quality} shadows={shadows} />
        <HeroSculpture quality={quality} mobile={mobile} />
        <LanguageOrbs languages={languages} quality={quality} mobile={mobile} />
        <Dust count={particles} />
        <Rig />
        <PostFX quality={quality} mobile={mobile} />
      </Suspense>
    </Canvas>
  );
}
