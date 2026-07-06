import { Environment, Lightformer } from "@react-three/drei";
import type { RenderQuality } from "./Scene";

// 程序化环境贴图：用 Lightformer 构造冷暖渐变环境，无需外部 HDRI
export default function Environment3D({ quality }: { quality: RenderQuality }) {
  return (
    <Environment resolution={quality >= 2 ? 256 : 128} frames={1}>
      {/* 顶部冷光 */}
      <Lightformer
        intensity={1.4}
        color="#5eead4"
        position={[0, 6, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={[12, 12, 1]}
      />
      {/* 主光暖白（右上） */}
      <Lightformer
        intensity={2.6}
        color="#fff2dc"
        position={[5, 3, 4]}
        rotation={[0, -Math.PI / 4, 0]}
        scale={[8, 8, 1]}
      />
      {/* 轮廓光琥珀（左下后） */}
      <Lightformer
        intensity={1.8}
        color="#e8b4b8"
        position={[-4, -1, -5]}
        rotation={[0, Math.PI / 4, 0]}
        scale={[10, 6, 1]}
      />
      {/* 香槟金底光 */}
      <Lightformer
        intensity={1.2}
        color="#d4b896"
        position={[0, -4, 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={[10, 10, 1]}
      />
      <color attach="background" args={["#0a0a0f"]} />
    </Environment>
  );
}
