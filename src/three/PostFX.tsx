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
import type { RenderQuality } from "./Scene";

export default function PostFX({ quality, mobile }: { quality: RenderQuality; mobile: boolean }) {
  const offset = new THREE.Vector2(0.00035 + quality * 0.0001, 0.00035 + quality * 0.0001);
  const bloom = mobile ? 0.28 + quality * 0.08 : 0.38 + quality * 0.12;

  return (
    <EffectComposer multisampling={quality >= 3 && !mobile ? 2 : 0}>
      <Bloom
        intensity={bloom}
        luminanceThreshold={0.78}
        luminanceSmoothing={0.18}
        mipmapBlur={quality >= 1}
        kernelSize={quality >= 2 ? KernelSize.LARGE : KernelSize.MEDIUM}
      />
      {quality >= 3 && !mobile && (
        <DepthOfField
          focusDistance={0.018}
          focalLength={0.052}
          bokehScale={2.2}
          height={480}
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
      <Vignette eskil={false} offset={0.28} darkness={0.62} />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
    </EffectComposer>
  );
}
