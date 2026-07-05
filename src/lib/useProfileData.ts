import { useEffect, useState } from "react";
import {
  fetchGitHubProfile,
  fetchGitHubRepos,
  aggregateLanguages,
  type LanguageStat,
} from "@/lib/githubApi";
import type { ProfileSnapshot } from "@/data/profileSnapshot";
import type { RepoSnapshot } from "@/data/reposSnapshot";
import { profileSnapshot } from "@/data/profileSnapshot";
import { reposSnapshot } from "@/data/reposSnapshot";

export interface ProfileData {
  profile: ProfileSnapshot;
  repos: RepoSnapshot[];
  languages: LanguageStat[];
  totalStars: number;
  loading: boolean;
  fromCache: boolean;
}

export function useProfileData(): ProfileData {
  const [data, setData] = useState<ProfileData>({
    profile: profileSnapshot,
    repos: reposSnapshot,
    languages: aggregateLanguages(reposSnapshot),
    totalStars: reposSnapshot.reduce((s, r) => s + r.stargazersCount, 0),
    loading: true,
    fromCache: false,
  });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const [profile, repos] = await Promise.all([
        fetchGitHubProfile(),
        fetchGitHubRepos(),
      ]);
      if (cancelled) return;
      const totalStars = repos.reduce((s, r) => s + r.stargazersCount, 0);
      setData({
        profile,
        repos,
        languages: aggregateLanguages(repos),
        totalStars,
        loading: false,
        fromCache: false,
      });
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  return data;
}
