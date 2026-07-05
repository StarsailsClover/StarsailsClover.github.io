import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Scene from "@/three/Scene";
import LoadingScreen from "@/components/LoadingScreen";
import ScrollProgress from "@/components/ScrollProgress";
import BrandMark from "@/components/BrandMark";
import Overture from "@/components/sections/Overture";
import Identity from "@/components/sections/Identity";
import Constellation from "@/components/sections/Constellation";
import Gallery from "@/components/sections/Gallery";
import Coda from "@/components/sections/Coda";
import { useProfileData } from "@/lib/useProfileData";
import { attachScrollListener } from "@/lib/scrollState";

export default function App() {
  const data = useProfileData();
  const [progress, setProgress] = useState(0);
  const [canvasReady, setCanvasReady] = useState(false);
  const [done, setDone] = useState(false);
  const readyRef = useRef(false);

  // 同步 ready 状态到 ref（避免重启动画）
  useEffect(() => {
    readyRef.current = canvasReady && !data.loading;
  }, [canvasReady, data.loading]);

  // 挂滚动 / 指针监听
  useEffect(() => attachScrollListener(), []);

  // 加载进度：时间驱动 + 就绪门控 + 硬上限兜底
  useEffect(() => {
    const start = performance.now();
    const minDur = 1500;
    const hardMax = 4000;
    let raf = 0;
    const tick = () => {
      const elapsed = performance.now() - start;
      const t = Math.min(1, elapsed / minDur);
      setProgress(t);
      if (t >= 1 && readyRef.current) {
        setDone(true);
        return;
      }
      if (elapsed >= hardMax) {
        setProgress(1);
        setDone(true);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="relative min-h-screen w-full">
      {/* 3D 背景 */}
      <Scene languages={data.languages} onCreated={() => setCanvasReady(true)} />

      {/* 顶部进度条与品牌标 */}
      <ScrollProgress />
      <BrandMark />

      {/* 滚动内容 */}
      <main className="relative z-10">
        <Overture />
        <Identity profile={data.profile} totalStars={data.totalStars} />
        <Constellation languages={data.languages} />
        <Gallery repos={data.repos} />
        <Coda />
      </main>

      {/* 加载层 */}
      <AnimatePresence>
        {!done && <LoadingScreen progress={progress} />}
      </AnimatePresence>

      {/* 底部渐变收口 */}
      <motion.div
        className="pointer-events-none fixed bottom-0 left-0 z-20 h-24 w-full"
        style={{
          background: "linear-gradient(to top, rgba(10,10,15,0.6), transparent)",
        }}
        aria-hidden
      />
    </div>
  );
}
