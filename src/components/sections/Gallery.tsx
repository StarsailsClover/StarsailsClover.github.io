import { motion } from "framer-motion";
import { Star, GitFork, ArrowUpRight, Crown } from "lucide-react";
import Reveal from "@/components/Reveal";
import type { RepoSnapshot } from "@/data/reposSnapshot";
import { LANGUAGE_COLORS } from "@/lib/constants";
import { TEXT } from "@/lib/text";

interface GalleryProps {
  repos: RepoSnapshot[];
}

function languageColor(lang: string | null): string {
  if (!lang) return LANGUAGE_COLORS.Other;
  return LANGUAGE_COLORS[lang] ?? LANGUAGE_COLORS.Other;
}

function RepoCard({ repo, featured, index }: { repo: RepoSnapshot; featured: boolean; index: number }) {
  const color = languageColor(repo.language);
  return (
    <Reveal delay={index * 0.08} y={32}>
      <motion.a
        href={repo.htmlUrl}
        target="_blank"
        rel="noreferrer"
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="group relative flex h-full flex-col overflow-hidden rounded-2xl glass p-6"
        style={
          featured
            ? {
                boxShadow:
                  "inset 0 1px 0 rgba(245,241,232,0.22), 0 30px 60px -20px rgba(0,0,0,0.7), 0 0 0 1px rgba(212,184,150,0.4)",
              }
            : undefined
        }
      >
        {/* 顶部：语言色点 + 名称 + 外链箭头 */}
        <div className="flex items-start gap-3">
          <span
            className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
            style={{ background: color, boxShadow: `0 0 10px ${color}90` }}
          />
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-lg font-medium leading-tight tracking-tight text-ivory break-words md:text-xl">
              {repo.name}
            </h3>
            <div className="mt-1 font-numeric text-[10px] uppercase tracking-[0.22em] text-ivory-faint">
              {repo.language ?? "Other"}
            </div>
          </div>
          <ArrowUpRight
            size={16}
            className="shrink-0 text-ivory-faint transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-champagne"
            strokeWidth={1.5}
          />
        </div>

        {/* 描述 */}
        <p className="mt-4 line-clamp-3 flex-1 font-body text-[13px] leading-relaxed text-ivory-dim">
          {repo.description ?? "—"}
        </p>

        {/* 底部：Star / Fork */}
        <div className="mt-6 flex items-center gap-5 border-t border-ivory/8 pt-4">
          <div className="flex items-center gap-1.5">
            <Star size={13} className="text-champagne" strokeWidth={1.5} />
            <span className="font-numeric text-sm text-ivory/85">
              {repo.stargazersCount}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <GitFork size={13} className="text-aurora/80" strokeWidth={1.5} />
            <span className="font-numeric text-sm text-ivory/85">
              {repo.forksCount}
            </span>
          </div>
          {repo.homepage && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(repo.homepage, "_blank", "noreferrer");
              }}
              className="ml-auto font-numeric text-[10px] tracking-[0.2em] text-ivory-faint underline-offset-4 transition-colors hover:text-aurora hover:underline"
            >
              {TEXT.gallery.demo}
            </button>
          )}
        </div>

        {/* 精选标记 */}
        {featured && (
          <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-champagne/15 px-2.5 py-1 font-numeric text-[9px] tracking-[0.2em] text-champagne">
            <Crown size={10} strokeWidth={1.5} />
            {TEXT.gallery.featured}
          </div>
        )}

        {/* hover 时的光晕 */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle at 50% 0%, ${color}22, transparent 60%)`,
          }}
        />
      </motion.a>
    </Reveal>
  );
}

export default function Gallery({ repos }: GalleryProps) {
  return (
    <section
      id="gallery"
      className="relative flex min-h-screen flex-col justify-center px-6 py-32 md:px-16"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 70% at 50% 50%, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.3) 60%, transparent 100%)",
        }}
      />

      <div className="relative w-full">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <div className="font-numeric text-[10px] tracking-[0.34em] text-aurora/80">
                {TEXT.gallery.act}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-4 font-display text-5xl font-light italic leading-none tracking-tight text-ivory md:text-7xl">
                {TEXT.gallery.title1} <span className="text-gradient-champagne">{TEXT.gallery.title2}</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16}>
            <p className="max-w-sm font-body text-sm leading-relaxed text-ivory-dim md:text-right">
              {TEXT.gallery.description}
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo, i) => (
            <RepoCard
              key={repo.name}
              repo={repo}
              featured={i === 0 && repo.stargazersCount >= 5}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
