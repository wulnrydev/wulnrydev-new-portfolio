import { useState, useEffect } from "react";

export const GITHUB_USERNAME = "wulnrydev";

export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
  open_issues_count: number;
  topics: string[];
  fork: boolean;
  archived: boolean;
  homepage: string | null;
  pushed_at: string;
  updated_at: string;
}

export interface GithubStats {
  repoCount: number;
  totalStars: number;
  totalForks: number;
  followers: number;
  topLanguages: { name: string; count: number }[];
}

export interface GithubData {
  user: GithubUser | null;
  repos: GithubRepo[];
  stats: GithubStats | null;
  loading: boolean;
  error: boolean;
}

const API = "https://api.github.com";

/* GitHub's unauthenticated API is rate limited to 60 requests/hour per IP.
   A short-lived cache keeps repeat visits from spending that budget and gives
   the section a graceful fallback if the limit is hit. */
const CACHE_KEY = "wulnrydev:github:v1";
const CACHE_TTL = 30 * 60 * 1000;

interface CachedGithub {
  at: number;
  user: GithubUser;
  repos: GithubRepo[];
  stats: GithubStats;
}

function readCache(): CachedGithub | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as CachedGithub;
    if (!parsed || typeof parsed.at !== "number" || !parsed.stats) return null;
    return parsed;
  } catch {
    return null;
  }
}

function writeCache(entry: CachedGithub) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {
    /* Storage can be unavailable in private mode — caching is optional. */
  }
}

export function useGithub(enabled = true): GithubData {
  const [user, setUser] = useState<GithubUser | null>(null);
  const [repos, setRepos] = useState<GithubRepo[]>([]);
  const [stats, setStats] = useState<GithubStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    /* The section is far below the fold — nothing is requested until it
       actually comes into view, keeping the first load free of third-party
       work and of the large repo list commit. */
    if (!enabled) return;

    let cancelled = false;
    const cached = readCache();

    /* Fresh cache: no network request at all. */
    if (cached && Date.now() - cached.at < CACHE_TTL) {
      setUser(cached.user);
      setRepos(cached.repos);
      setStats(cached.stats);
      setLoading(false);
      return () => {
        cancelled = true;
      };
    }

    const load = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`${API}/users/${GITHUB_USERNAME}`),
          fetch(`${API}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`),
        ]);

        if (!userRes.ok || !reposRes.ok) throw new Error("GitHub API error");

        const userData: GithubUser = await userRes.json();
        const reposData: GithubRepo[] = await reposRes.json();

        // Only the user's own open-source projects (exclude forks of others).
        const ownRepos = reposData
          .filter((r) => !r.fork)
          .sort(
            (a, b) =>
              b.stargazers_count - a.stargazers_count ||
              new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime()
          );

        const totalStars = ownRepos.reduce((sum, r) => sum + r.stargazers_count, 0);
        const totalForks = ownRepos.reduce((sum, r) => sum + r.forks_count, 0);

        const langCounts: Record<string, number> = {};
        for (const r of ownRepos) {
          if (r.language) langCounts[r.language] = (langCounts[r.language] || 0) + 1;
        }
        const topLanguages = Object.entries(langCounts)
          .map(([name, count]) => ({ name, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);

        if (cancelled) return;

        const entry: CachedGithub = {
          at: Date.now(),
          user: userData,
          repos: ownRepos,
          stats: {
            repoCount: ownRepos.length,
            totalStars,
            totalForks,
            followers: userData.followers,
            topLanguages,
          },
        };

        setUser(entry.user);
        setRepos(entry.repos);
        setStats(entry.stats);
        setLoading(false);
        writeCache(entry);
      } catch {
        if (cancelled) return;

        /* Rate limit or network failure: show the last cached snapshot rather
           than an empty error state. */
        if (cached) {
          setUser(cached.user);
          setRepos(cached.repos);
          setStats(cached.stats);
          setLoading(false);
          return;
        }

        setError(true);
        setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;
    };
  }, [enabled]);

  return { user, repos, stats, loading, error };
}
