import Reveal from "@/components/Reveal";
import type { LanguageStat } from "@/lib/githubApi";
import { TEXT, fmt } from "@/lib/text";

interface ConstellationProps {
  languages: LanguageStat[];
}

export default function Constellation({ languages }: ConstellationProps) {
  return (
    <section
      id="constellation"
      className="relative flex min-h-screen items-center px-6 py-32 md:px-16 pointer-events-none"
    >
      {/* 左右暗化，让中央 3D 球阵更突出 */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, rgba(10,10,15,0.88) 0%, rgba(10,10,15,0.25) 38%, rgba(10,10,15,0.25) 62%, rgba(10,10,15,0.88) 100%)",
        }}
      />

      <div className="relative grid w-full grid-cols-1 gap-12 md:grid-cols-[0.9fr_1.1fr]">
        {/* 左侧：标题与说明 */}
        <div className="flex flex-col justify-center">
          <Reveal>
            <div className="font-numeric text-[10px] tracking-[0.34em] text-aurora/80">
              {TEXT.constellation.act}
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="mt-4 font-display text-5xl font-light italic leading-[0.95] tracking-tight text-ivory md:text-7xl">
              {TEXT.constellation.title1}
              <br />
              <span className="text-gradient-aurora">{TEXT.constellation.title2}</span>
            </h2>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-6 max-w-sm font-body text-sm leading-relaxed text-ivory-dim md:text-base">
              {TEXT.constellation.description}
            </p>
          </Reveal>
          <Reveal delay={0.28}>
            <div className="mt-8 font-numeric text-[10px] tracking-[0.3em] text-ivory-faint">
              {fmt(TEXT.constellation.liveOrbsTemplate, { count: languages.length })}
            </div>
          </Reveal>
        </div>

        {/* 右侧：3D 球阵可见区，下方叠加图例 */}
        <div className="flex flex-col justify-end gap-8">
          {/* 中间留空给 3D 球阵 */}
          <div className="hidden h-[40vh] md:block" />
          <Reveal delay={0.2}>
            <div className="glass-strong rounded-2xl p-6">
              <div className="mb-4 font-numeric text-[10px] tracking-[0.3em] text-ivory-faint">
                {TEXT.constellation.legend}
              </div>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3 md:grid-cols-3">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{
                        background: lang.color,
                        boxShadow: `0 0 12px ${lang.color}80`,
                      }}
                    />
                    <span className="font-body text-xs text-ivory/85">
                      {lang.name}
                    </span>
                    <span className="ml-auto font-numeric text-[10px] text-ivory-faint">
                      {Math.round(lang.ratio * 100)}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
