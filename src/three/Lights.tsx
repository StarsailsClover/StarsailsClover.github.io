import type { RenderQuality } from "./Scene";

// 三点光：主光暖白 + 补光冷青 + 轮廓光琥珀
export default function Lights({ quality, shadows }: { quality: RenderQuality; shadows: boolean }) {
  const lightScale = [0.72, 0.84, 0.94, 1, 1.12][quality];

  return (
    <>
      <ambientLight intensity={0.18 * lightScale} color="#f5f1e8" />
      <directionalLight
        position={[5, 6, 4]}
        intensity={2.2 * lightScale}
        color="#fff2dc"
        castShadow={shadows}
        shadow-mapSize={quality >= 4 ? [2048, 2048] : quality >= 3 ? [1024, 1024] : [512, 512]}
        shadow-bias={-0.0001}
      />
      {quality >= 1 && <pointLight position={[-5, 1, 3]} intensity={0.6 * lightScale} color="#5eead4" distance={20} />}
      <pointLight position={[0, -2, -5]} intensity={1.4 * lightScale} color="#e8b4b8" distance={18} />
      {quality >= 4 && <pointLight position={[3, 2.4, 2.8]} intensity={0.45 * lightScale} color="#f5f1e8" distance={12} />}
      {quality >= 2 && (
        <spotLight
          position={[0, 8, 2]}
          angle={0.5}
          penumbra={1}
          intensity={1.2 * lightScale}
          color="#d4b896"
          distance={30}
        />
      )}
    </>
  );
}
