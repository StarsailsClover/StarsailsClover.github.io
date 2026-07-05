import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
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

function isMobile() {
  if (typeof navigator === "undefined") return false;
  return (
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
    (typeof window !== "undefined" && window.innerWidth < 768)
  );
}

export default function Scene({ languages, particleCount, onCreated }: SceneProps) {
  const mobile = typeof window !== "undefined" ? isMobile() : false;
  const particles = particleCount ?? (mobile ? 220 : 760);

  return (
    <Canvas
      className="!fixed inset-0"
      style={{ position: "fixed", inset: 0, zIndex: 0 }}
      onCreated={onCreated}
      gl={{
        antialias: !mobile,
        alpha: false,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.05,
      }}
      dpr={mobile ? [1, 1.5] : [1, 2]}
      camera={{ fov: 42, near: 0.1, far: 100, position: [0, 0, 6.5] }}
      shadows={!mobile}
    >
      <color attach="background" args={["#0a0a0f"]} />
      <fog attach="fog" args={["#0a0a0f", 9, 22]} />

      <Suspense fallback={null}>
        <Environment3D />
        <Lights />
        <HeroSculpture />
        <LanguageOrbs languages={languages} />
        <Dust count={particles} />
        <Rig />
        <PostFX />
      </Suspense>
    </Canvas>
  );
}
