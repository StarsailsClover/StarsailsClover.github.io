// 精选仓库兜底快照（基于 2026-07-06 GitHub API 数据，按 Star 降序）
export interface RepoSnapshot {
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  homepage: string | null;
  language: string | null;
  stargazersCount: number;
  forksCount: number;
  topics: string[];
  pushedAt: string;
}

export const reposSnapshot: RepoSnapshot[] = [
  {
    name: "Minecraft.and.MiniWorldCreata-CrossPlatform-CrossPlay",
    fullName: "StarsailsClover/Minecraft.and.MiniWorldCreata-CrossPlatform-CrossPlay",
    description:
      "Block Connected, Enjoy the Worlds. | A Open source technology to solve the CrossPlay interconnection between Minecraft and MiniWorld: Creata.",
    htmlUrl:
      "https://github.com/StarsailsClover/Minecraft.and.MiniWorldCreata-CrossPlatform-CrossPlay",
    homepage: null,
    language: "Python",
    stargazersCount: 29,
    forksCount: 9,
    topics: [],
    pushedAt: "2026-09-05T09:03:38Z",
  },
  {
    name: "MnMCP",
    fullName: "StarsailsClover/MnMCP",
    description:
      "MnMCP | Connect the Worlds, Enjoy with Players. minecraft <-> MiniWorld",
    htmlUrl: "https://github.com/StarsailsClover/MnMCP",
    homepage: "https://starsailsclover.github.io/MnMCP/",
    language: "Python",
    stargazersCount: 6,
    forksCount: 1,
    topics: ["cross-platform", "games", "minecraft", "miniworld-creata", "network"],
    pushedAt: "2026-06-08T07:26:29Z",
  },
  {
    name: "OpenOxygen",
    fullName: "StarsailsClover/OpenOxygen",
    description: "Better than OpenClaw.",
    htmlUrl: "https://github.com/StarsailsClover/OpenOxygen",
    homepage: null,
    language: "TypeScript",
    stargazersCount: 4,
    forksCount: 0,
    topics: [],
    pushedAt: "2026-07-02T15:43:56Z",
  },
  {
    name: "NML",
    fullName: "StarsailsClover/NML",
    description:
      "Flutter, Dart & Kotlin Powered: A Lightweight Cross-Platform Launcher for Minecraft Java Edition",
    htmlUrl: "https://github.com/StarsailsClover/NML",
    homepage: null,
    language: "Rust",
    stargazersCount: 1,
    forksCount: 0,
    topics: [],
    pushedAt: "2026-07-05T14:01:51Z",
  },
  {
    name: "MCJEBooster",
    fullName: "StarsailsClover/MCJEBooster",
    description:
      "JEB | Minecraft Java Edition Multi-Core Optimization Engine / Official Compatibility Pack / High-Compatibility JVM-Level Performance Library",
    htmlUrl: "https://github.com/StarsailsClover/MCJEBooster",
    homepage: null,
    language: "Java",
    stargazersCount: 1,
    forksCount: 0,
    topics: [],
    pushedAt: "2026-05-14T22:32:50Z",
  },
  {
    name: "UniversalVSMCP",
    fullName: "StarsailsClover/UniversalVSMCP",
    description:
      "UVM | Let your AIAgent connect to Visual Studio 2026 via the MCP protocol",
    htmlUrl: "https://github.com/StarsailsClover/UniversalVSMCP",
    homepage: null,
    language: "C#",
    stargazersCount: 1,
    forksCount: 0,
    topics: [],
    pushedAt: "2026-07-02T15:39:22Z",
  },
];
