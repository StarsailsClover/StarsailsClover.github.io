import { motion } from "framer-motion";
import { MapPin, Building2, Twitter, Sparkles } from "lucide-react";
import Reveal from "@/components/Reveal";
import AnimatedNumber from "@/components/AnimatedNumber";
import type { ProfileSnapshot } from "@/data/profileSnapshot";
import { GITHUB_PROFILE_URL, TWITTER_URL } from "@/lib/constants";
import { TEXT, fmt } from "@/lib/text";

interface IdentityProps {
  profile: ProfileSnapshot;
  totalStars: number;
}

function StatCell({ value, label, delay }: { value: number; label: string; delay: number }) {
  return (
    <Reveal delay={delay} className="flex flex-col">
      <span className="font-numeric text-4xl font-light tracking-tight text-gradient-champagne md:text-5xl">
        <AnimatedNumber value={value} />
      </span>
      <span className="mt-2 font-numeric text-[10px] uppercase tracking-[0.28em] text-ivory-faint">
        {label}
      </span>
    </Reveal>
  );
}

export default function Identity({ profile, totalStars }: IdentityProps) {
  const twitterHandle = profile.twitterUsername
    ? `@${profile.twitterUsername}`
    : null;
  const joinedYear = new Date(profile.createdAt).getFullYear();

  return (
    <section
      id="identity"
      className="relative flex min-h-screen items-center px-6 py-32 md:px-16"
    >
      {/* 暗化 scrim 提升文字可读性 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 65% 75% at 50% 50%, rgba(10,10,15,0.7) 0%, rgba(10,10,15,0.25) 60%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-20">
        {/* 上层：身份文本 + 纵向肖像 */}
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-[1.3fr_1fr] md:gap-20">
          {/* 左：身份文本 */}
          <div className="flex flex-col">
            <Reveal>
              <div className="font-numeric text-[10px] tracking-[0.34em] text-aurora/80">
                {TEXT.identity.act}
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 className="mt-6 font-display text-6xl font-light italic leading-none tracking-tight text-ivory md:text-7xl">
                {profile.name ?? profile.login}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-3 font-numeric text-xs tracking-[0.24em] text-ivory-dim">
                @{profile.login}
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <p className="mt-8 max-w-md font-body text-base leading-relaxed text-ivory/85 md:text-lg">
                {profile.bio ?? "—"}
              </p>
            </Reveal>

            {/* 元信息 — 横向排列，更精炼 */}
            <Reveal delay={0.32}>
              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-ivory-dim">
                {profile.location && (
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-champagne/80" strokeWidth={1.5} />
                    <span>{profile.location}</span>
                  </div>
                )}
                {profile.company && (
                  <div className="flex items-center gap-2">
                    <Building2 size={13} className="text-champagne/80" strokeWidth={1.5} />
                    <span>{profile.company}</span>
                  </div>
                )}
                {twitterHandle && (
                  <a
                    href={TWITTER_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="group flex items-center gap-2 transition-colors hover:text-aurora"
                  >
                    <Twitter size={13} className="text-aurora/80" strokeWidth={1.5} />
                    <span>{twitterHandle}</span>
                  </a>
                )}
              </div>
            </Reveal>
          </div>

          {/* 右：纵向肖像 — 编辑式长版面 */}
          <Reveal y={36} className="flex justify-center md:justify-end">
            <div className="relative">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="glass-strong relative aspect-[3/4] w-full max-w-xs overflow-hidden rounded-[24px] p-2.5 md:max-w-sm"
              >
                <div className="relative h-full w-full overflow-hidden rounded-[18px]">
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name ?? profile.login}
                    loading="lazy"
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
                </div>
              </motion.div>
              {/* 装饰光圈 */}
              <div
                className="absolute -inset-6 -z-10 rounded-[40px] opacity-60 blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, rgba(212,184,150,0.35), transparent 70%)",
                }}
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 font-numeric text-[9px] tracking-[0.3em] text-champagne/60">
                {TEXT.identity.portraitLabel}
              </div>
            </div>
          </Reveal>
        </div>

        {/* 下层：统计区 + 账号信息 */}
        <div className="flex flex-col gap-8">
          <Reveal delay={0.4}>
            <div className="grid grid-cols-2 gap-8 border-t border-ivory/10 pt-10 md:grid-cols-4">
              <StatCell value={profile.publicRepos} label={TEXT.identity.stats.repos} delay={0.44} />
              <StatCell value={profile.followers} label={TEXT.identity.stats.followers} delay={0.52} />
              <StatCell value={profile.following} label={TEXT.identity.stats.following} delay={0.6} />
              <StatCell value={totalStars} label={TEXT.identity.stats.stars} delay={0.68} />
            </div>
          </Reveal>

          <Reveal delay={0.78}>
            <div className="flex flex-wrap items-center gap-2 text-[11px] text-ivory-faint">
              <Sparkles size={12} className="text-champagne/70" strokeWidth={1.5} />
              <span>{fmt(TEXT.identity.joinedTemplate, { year: joinedYear })}</span>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noreferrer"
                className="ml-2 underline-offset-4 transition-colors hover:text-champagne hover:underline"
              >
                {TEXT.identity.viewProfile}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
