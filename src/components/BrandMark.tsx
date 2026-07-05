import { Github } from "lucide-react";
import { GITHUB_PROFILE_URL } from "@/lib/constants";
import { TEXT } from "@/lib/text";

export default function BrandMark() {
  return (
    <>
      {/* 左上：品牌标 */}
      <a
        href={GITHUB_PROFILE_URL}
        target="_blank"
        rel="noreferrer"
        className="group fixed left-6 top-5 z-[60] flex items-center gap-3 md:left-10 md:top-8"
      >
        <span className="font-display text-xl italic tracking-tight text-ivory">
          {TEXT.brand.monogram}
        </span>
        <span className="hidden font-numeric text-[10px] tracking-[0.34em] text-ivory-dim transition-colors group-hover:text-champagne sm:block">
          {TEXT.brand.name}
        </span>
      </a>

      {/* 右上：GitHub 入口 */}
      <a
        href={GITHUB_PROFILE_URL}
        target="_blank"
        rel="noreferrer"
        aria-label="GitHub"
        className="fixed right-6 top-5 z-[60] flex h-10 w-10 items-center justify-center rounded-full glass text-ivory transition-all hover:text-champagne md:right-10 md:top-8"
      >
        <Github size={16} strokeWidth={1.5} />
      </a>
    </>
  );
}
