import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { TEXT } from "@/lib/text";

export default function Overture() {
  return (
    <section
      id="overture"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center"
    >
      {/* 顶部标签 */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="font-numeric text-[11px] tracking-ultra text-champagne/75"
      >
        {TEXT.overture.topLabel}
      </motion.div>

      {/* 主名号 */}
      <motion.h1
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 font-display text-[18vw] font-light leading-[0.92] tracking-tight text-gradient-champagne md:text-[12vw] lg:text-[10vw]"
        style={{ fontVariationSettings: '"opsz" 144, "SOFT" 80' }}
      >
        {TEXT.overture.name}
      </motion.h1>

      {/* 副标题 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.1 }}
        className="mt-5 flex items-center gap-4"
      >
        <span className="hairline w-12" />
        <span className="font-numeric text-[11px] tracking-[0.32em] text-ivory-dim md:text-xs">
          {TEXT.overture.subtitle}
        </span>
        <span className="hairline w-12" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 1.4 }}
        className="mt-8 max-w-md font-body text-sm leading-relaxed text-ivory-dim md:text-base"
      >
        {TEXT.overture.description}
      </motion.p>

      {/* 滚动指示器 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="font-numeric text-[9px] tracking-[0.4em] text-ivory-faint">
          {TEXT.overture.scrollHint}
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={14} className="text-champagne/70" strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
