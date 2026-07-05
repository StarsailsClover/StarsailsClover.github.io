// 资料兜底快照（基于 2026-07-06 GitHub API 数据）
export interface ProfileSnapshot {
  login: string;
  name: string | null;
  bio: string | null;
  company: string | null;
  location: string | null;
  twitterUsername: string | null;
  avatarUrl: string;
  htmlUrl: string;
  publicRepos: number;
  followers: number;
  following: number;
  createdAt: string;
}

export const profileSnapshot: ProfileSnapshot = {
  login: "StarsailsClover",
  name: "ZCN0tFound",
  bio: "I'm SailsHuang. Welcome.",
  company: "JKNet NDStudios",
  location: "Guangzhou, China",
  twitterUsername: "sailshuang_",
  avatarUrl: "https://avatars.githubusercontent.com/u/140955561?v=4",
  htmlUrl: "https://github.com/StarsailsClover",
  publicRepos: 36,
  followers: 5,
  following: 3,
  createdAt: "2023-07-30T12:28:38Z",
};
