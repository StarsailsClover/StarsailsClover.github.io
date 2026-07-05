import { motion } from "framer-motion";
import { Github, Sparkles, ArrowUpRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { GITHUB_PROFILE_URL, METEOR_URL } from "@/lib/constants";
import { TEXT, fmt } from "@/lib/text";

export default function Coda() {
  const year = new Date().getFullYear();
  return (
    <section
      id="coda"
      className="relative flex min-h-screen flex-col items-center justify-center px-6 py-32 text-center"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(10,10,15,0.55) 0%, rgba(10,10,15,0.85) 70%, #0a0a0f 100%)",
        }}
      />

      <div className="relative flex flex-col items-center">
        <Reveal>
          <div className="font-numeric text-[10px] tracking-[0.34em] text-aurora/80">
            {TEXT.coda.act}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <h2 className="mt-6 font-display text-6xl font-light italic leading-[0.95] tracking-tight text-gradient-champagne md:text-8xl">
            {TEXT.coda.title1}
            <br />
            {TEXT.coda.title2}
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-8 max-w-md font-body text-sm leading-relaxed text-ivory-dim md:text-base">
            {TEXT.coda.description}
          </p>
        </Reveal>

        {/* 双 CTA：GitHub · 飞流星墅 */}
        <Reveal delay={0.32}>
          <div className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <motion.a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="group inline-flex items-center gap-3 rounded-full glass-strong px-8 py-4"
            >
              <Github size={18} className="text-ivory" strokeWidth={1.5} />
              <span className="font-numeric text-sm tracking-[0.2em] text-ivory">
                {TEXT.coda.githubLabel}
              </span>
              <ArrowUpRight
                size={16}
                className="text-champagne transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </motion.a>

            <motion.a
              href={METEOR_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3 }}
              whileTap={{ y: 0 }}
              transition={{ type: "spring", stiffness: 320, damping: 22 }}
              className="group inline-flex items-center gap-3 rounded-full glass px-8 py-4"
              style={{ boxShadow: "inset 0 1px 0 rgba(245,241,232,0.12), 0 0 0 1px rgba(94,234,212,0.25)" }}
            >
              <Sparkles size={18} className="text-aurora" strokeWidth={1.5} />
              <span className="font-numeric text-sm tracking-[0.2em] text-ivory">
                {TEXT.coda.meteorLabel}
              </span>
              <ArrowUpRight
                size={16}
                className="text-aurora transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </motion.a>
          </div>
        </Reveal>

        {/* 分隔星号线 */}
        <Reveal delay={0.56}>
          <div className="mt-20 flex items-center gap-4">
            <span className="hairline w-16" />
            <span className="text-champagne/60">✦</span>
            <span className="hairline w-16" />
          </div>
        </Reveal>

        <Reveal delay={0.66}>
          <div className="mt-8 flex flex-col items-center gap-2">
            <div className="font-display text-sm italic text-ivory-dim">
              {TEXT.coda.footerName}
            </div>
            <div className="font-numeric text-[9px] tracking-[0.3em] text-ivory-faint">
              {fmt(TEXT.coda.footerCreditTemplate, { year })}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
