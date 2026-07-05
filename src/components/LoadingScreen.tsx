import { motion } from "framer-motion";
import { TEXT } from "@/lib/text";

export default function LoadingScreen({ progress }: { progress: number }) {
  const p = Math.round(progress * 100);
  return (
    <motion.div
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="flex flex-col items-center gap-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <div className="font-numeric text-[11px] tracking-ultra text-champagne/70">
            {TEXT.loading.label}
          </div>
          <h1 className="mt-3 font-display text-5xl font-light tracking-tight text-gradient-champagne md:text-6xl">
            {TEXT.brand.displayName}
          </h1>
        </motion.div>

        <div className="relative h-px w-56 overflow-hidden bg-ivory/10 md:w-72">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-champagne via-aurora to-rose"
            style={{ width: `${p}%` }}
          />
        </div>
        <div className="font-numeric text-[10px] tracking-[0.3em] text-ivory-faint">
          {p.toString().padStart(3, "0")} · {TEXT.loading.progressLabel}
        </div>
      </div>
    </motion.div>
  );
}
