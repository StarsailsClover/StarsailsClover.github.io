// 全局可变状态：滚动进度与鼠标视差。
// 使用模块级 ref 避免 React 重渲染，3D useFrame 直接读取。
export const scrollState = {
  progress: 0, // 0..1 整页归一化滚动进度
  velocity: 0,
};

export const pointerState = {
  x: 0, // -1..1
  y: 0, // -1..1
  targetX: 0,
  targetY: 0,
};

export function attachScrollListener() {
  const update = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const p = max > 0 ? window.scrollY / max : 0;
    scrollState.progress = Math.min(1, Math.max(0, p));
  };
  const onPointer = (e: PointerEvent) => {
    pointerState.targetX = (e.clientX / window.innerWidth) * 2 - 1;
    pointerState.targetY = (e.clientY / window.innerHeight) * 2 - 1;
  };
  update();
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  window.addEventListener("pointermove", onPointer, { passive: true });
  return () => {
    window.removeEventListener("scroll", update);
    window.removeEventListener("resize", update);
    window.removeEventListener("pointermove", onPointer);
  };
}

// 在 useFrame 中调用，平滑插值指针
export function smoothPointer(delta: number, damp = 6) {
  pointerState.x += (pointerState.targetX - pointerState.x) * Math.min(1, delta * damp);
  pointerState.y += (pointerState.targetY - pointerState.y) * Math.min(1, delta * damp);
  return pointerState;
}

// 平滑插值滚动进度（用于 3D 相机缓动）
export function smoothScroll(delta: number, damp = 4) {
  scrollState.velocity += (scrollState.progress - scrollState.velocity) * Math.min(1, delta * damp);
  return scrollState.velocity;
}
