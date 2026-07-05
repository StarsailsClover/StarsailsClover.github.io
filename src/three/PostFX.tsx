import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  ChromaticAberration,
  ToneMapping,
} from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction, KernelSize } from "postprocessing";

// 检测移动端以决定是否启用重后处理
function isMobile() {
  if (typeof navigator === "undefined") return false;
  return (
    /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ||
    (typeof window !== "undefined" && window.innerWidth < 768)
  );
}

export default function PostFX() {
  const mobile = typeof window !== "undefined" ? isMobile() : false;
  const offset = new THREE.Vector2(0.0006, 0.0006);

  return (
    <EffectComposer multisampling={mobile ? 0 : 2}>
      <Bloom
        intensity={mobile ? 0.4 : 0.7}
        luminanceThreshold={0.78}
        luminanceSmoothing={0.18}
        mipmapBlur
        kernelSize={KernelSize.LARGE}
      />
      {!mobile && (
        <DepthOfField
          focusDistance={0.018}
          focalLength={0.052}
          bokehScale={2.2}
          height={480}
        />
      )}
      <ChromaticAberration
        offset={offset}
        radialModulation
        modulationOffset={0.3}
        blendFunction={BlendFunction.NORMAL}
      />
      <Vignette eskil={false} offset={0.28} darkness={0.62} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
