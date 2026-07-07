import * as THREE from "three";
import {
  EffectComposer,
  Bloom,
  DepthOfField,
  Vignette,
  ChromaticAberration,
  ToneMapping,
  Noise,
} from "@react-three/postprocessing";
import { ToneMappingMode, BlendFunction, KernelSize } from "postprocessing";
import type { RenderQuality } from "./Scene";

export default function PostFX({ quality, mobile }: { quality: RenderQuality; mobile: boolean }) {
  const offset = new THREE.Vector2(0.00035 + quality * 0.0001, 0.00035 + quality * 0.0001);
  const bloom = mobile ? 0.28 + quality * 0.08 : 0.38 + quality * 0.14;
  const dofHeight = quality >= 4 ? 720 : 480;

  return (
    <EffectComposer multisampling={quality >= 4 && !mobile ? 4 : quality >= 3 && !mobile ? 2 : 0}>
      <Bloom
        intensity={bloom}
        luminanceThreshold={quality >= 4 ? 0.68 : 0.78}
        luminanceSmoothing={quality >= 4 ? 0.26 : 0.18}
        mipmapBlur={quality >= 1}
        kernelSize={quality >= 4 ? KernelSize.HUGE : quality >= 2 ? KernelSize.LARGE : KernelSize.MEDIUM}
      />
      {quality >= 3 && !mobile && (
        <DepthOfField
          focusDistance={0.018}
          focalLength={quality >= 4 ? 0.064 : 0.052}
          bokehScale={quality >= 4 ? 2.8 : 2.2}
          height={dofHeight}
        />
      )}
      {quality >= 1 && (
        <ChromaticAberration
          offset={offset}
          radialModulation
          modulationOffset={0.3}
          blendFunction={BlendFunction.NORMAL}
        />
      )}
      {quality >= 4 && !mobile && <Noise opacity={0.018} blendFunction={BlendFunction.SOFT_LIGHT} />}
      <Vignette eskil={false} offset={0.28} darkness={0.62} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
