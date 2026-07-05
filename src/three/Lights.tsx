// 三点光：主光暖白 + 补光冷青 + 轮廓光琥珀
export default function Lights() {
  return (
    <>
      <ambientLight intensity={0.18} color="#f5f1e8" />
      <directionalLight
        position={[5, 6, 4]}
        intensity={2.2}
        color="#fff2dc"
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-bias={-0.0001}
      />
      <pointLight position={[-5, 1, 3]} intensity={0.6} color="#5eead4" distance={20} />
      <pointLight position={[0, -2, -5]} intensity={1.4} color="#e8b4b8" distance={18} />
      <spotLight
        position={[0, 8, 2]}
        angle={0.5}
        penumbra={1}
        intensity={1.2}
        color="#d4b896"
        distance={30}
      />
    </>
  );
}
