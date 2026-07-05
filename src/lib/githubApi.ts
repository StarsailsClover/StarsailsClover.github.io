import { profileSnapshot, type ProfileSnapshot } from "@/data/profileSnapshot";
import { reposSnapshot, type RepoSnapshot } from "@/data/reposSnapshot";
import { GITHUB_USER } from "@/lib/constants";

const API = "https://api.github.com";
const REPO_CACHE_KEY = "sc_gh_repos_cache_v1";
const PROFILE_CACHE_KEY = "sc_gh_profile_cache_v1";
const CACHE_TTL = 60 * 60 * 1000; // 1 小时

function withTimeout(ms: number): AbortSignal {
  const ctrl = new AbortController();
  setTimeout(() => ctrl.abort(), ms);
  return ctrl.signal;
}

function readCache<T>(key: string): T | null {
  try {
    const raw = sessionStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { t: number; data: T };
    if (Date.now() - parsed.t > CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeCache<T>(key: string, data: T) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), data }));
  } catch {
    /* 静默失败 */
  }
}

export async function fetchGitHubProfile(): Promise<ProfileSnapshot> {
  const cached = readCache<ProfileSnapshot>(PROFILE_CACHE_KEY);
  if (cached) return cached;

  try {
    const res = await fetch(`${API}/users/${GITHUB_USER}`, {
      headers: { Accept: "application/vnd.github+json" },
      signal: withTimeout(8000),
    });
    if (!res.ok) throw new Error(`profile ${res.status}`);
    const j = await res.json();
    const profile: ProfileSnapshot = {
      login: j.login,
      name: j.name,
      bio: j.bio,
      company: j.company,
      location: j.location,
      twitterUsername: j.twitter_username,
      avatarUrl: j.avatar_url,
      htmlUrl: j.html_url,
      publicRepos: j.public_repos ?? profileSnapshot.publicRepos,
      followers: j.followers ?? 0,
      following: j.following ?? 0,
      createdAt: j.created_at,
    };
    writeCache(PROFILE_CACHE_KEY, profile);
    return profile;
  } catch {
    return profileSnapshot; // 降级
  }
}

export async function fetchGitHubRepos(): Promise<RepoSnapshot[]> {
  const cached = readCache<RepoSnapshot[]>(REPO_CACHE_KEY);
  if (cached) return cached;

  try {
    const res = await fetch(
      `${API}/users/${GITHUB_USER}/repos?sort=updated&per_page=100`,
      { headers: { Accept: "application/vnd.github+json" }, signal: withTimeout(8000) },
    );
    if (!res.ok) throw new Error(`repos ${res.status}`);
    const j = (await res.json()) as Array<Record<string, unknown>>;
    const repos: RepoSnapshot[] = j
      .filter((r) => r.fork === false)
      .map((r) => ({
        name: r.name as string,
        fullName: r.full_name as string,
        description: (r.description as string) ?? null,
        htmlUrl: r.html_url as string,
        homepage: (r.homepage as string) ?? null,
        language: (r.language as string) ?? null,
        stargazersCount: r.stargazers_count as number,
        forksCount: r.forks_count as number,
        topics: ((r.topics as string[]) ?? []) as string[],
        pushedAt: r.pushed_at as string,
      }))
      .sort((a, b) => b.stargazersCount - a.stargazersCount)
      .slice(0, 6);
    if (repos.length > 0) {
      writeCache(REPO_CACHE_KEY, repos);
      return repos;
    }
    return reposSnapshot;
  } catch {
    return reposSnapshot; // 降级
  }
}

// 从仓库列表聚合语言使用情况
export interface LanguageStat {
  name: string;
  count: number;
  ratio: number; // 0..1
  color: string;
}

import { LANGUAGE_COLORS } from "@/lib/constants";

export function aggregateLanguages(repos: RepoSnapshot[]): LanguageStat[] {
  const counts = new Map<string, number>();
  let total = 0;
  for (const r of repos) {
    const lang = r.language && r.language.trim() ? r.language : "Other";
    counts.set(lang, (counts.get(lang) ?? 0) + 1);
    total += 1;
  }
  const stats: LanguageStat[] = [];
  for (const [name, count] of counts) {
    stats.push({
      name,
      count,
      ratio: total > 0 ? count / total : 0,
      color: LANGUAGE_COLORS[name] ?? LANGUAGE_COLORS.Other,
    });
  }
  return stats.sort((a, b) => b.count - a.count);
}
