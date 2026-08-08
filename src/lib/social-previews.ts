import { PortfolioPlatform } from "@/lib/config";

const PREVIEW_CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000;

type PreviewCacheEntry = {
  url: string;
  expiresAt: number;
};

const previewCache = new Map<string, PreviewCacheEntry>();

function getCachedPreview(key: string): string | null {
  const entry = previewCache.get(key);
  if (!entry) {
    return null;
  }

  if (Date.now() > entry.expiresAt) {
    previewCache.delete(key);
    return null;
  }

  return entry.url;
}

function setCachedPreview(key: string, url: string): void {
  previewCache.set(key, {
    url,
    expiresAt: Date.now() + PREVIEW_CACHE_TTL_MS,
  });
}

export function instagramShortcode(url: string): string {
  const match = url.match(/instagram\.com\/(?:[^/]+\/)?(?:reel|p|tv)\/([A-Za-z0-9_-]+)/);
  return match?.[1] ?? "";
}

export function tiktokVideoId(url: string): string {
  const match = url.match(/tiktok\.com\/@[^/]+\/video\/(\d+)/);
  return match?.[1] ?? "";
}

function instagramThumbnailScore(url: string): number {
  const sizeTokens: Record<string, number> = {
    "s1080x1920": 5000,
    "s720x1280": 4000,
    "s640x1136": 3500,
    "s640x640": 3000,
    "p640x640": 2500,
    "s480x480": 2000,
    "p480x480": 1500,
    "p240x240": 500,
    "s150x150": 100,
  };

  let score = 0;

  for (const [token, value] of Object.entries(sizeTokens)) {
    if (url.includes(token)) {
      score = Math.max(score, value);
    }
  }

  if (url.includes("/t51.82787-15/")) {
    score += 200;
  }

  return score;
}

function pickInstagramThumbnail(html: string): string {
  const matches = html.match(/https:\/\/scontent[^"\s]+cdninstagram\.com[^"\s]+\.jpg[^"\s]*/g) ?? [];
  const candidates = new Map<string, number>();

  for (const rawUrl of matches) {
    const url = rawUrl.replace(/&amp;/g, "&");
    if (!candidates.has(url)) {
      candidates.set(url, instagramThumbnailScore(url));
    }
  }

  if (candidates.size === 0) {
    return "";
  }

  return [...candidates.entries()].sort((a, b) => b[1] - a[1])[0][0];
}

async function fetchTikTokPreview(url: string): Promise<string> {
  const videoId = tiktokVideoId(url);
  if (!videoId) {
    return "";
  }

  const cacheKey = `tt_${videoId}`;
  const cached = getCachedPreview(cacheKey);
  if (cached) {
    return cached;
  }

  const response = await fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`, {
    headers: {
      "User-Agent": "Mozilla/5.0 (compatible; CadmusUGC/1.0)",
    },
    next: { revalidate: 604800 },
  });

  if (!response.ok) {
    return "";
  }

  const data = (await response.json()) as { thumbnail_url?: string };
  const thumbnail = typeof data.thumbnail_url === "string" ? data.thumbnail_url : "";

  if (thumbnail) {
    setCachedPreview(cacheKey, thumbnail);
  }

  return thumbnail;
}

async function fetchInstagramPreview(url: string): Promise<string> {
  const shortcode = instagramShortcode(url);
  if (!shortcode) {
    return "";
  }

  const cacheKey = `ig_${shortcode}`;
  const cached = getCachedPreview(cacheKey);
  if (cached) {
    return cached;
  }

  const path = url.includes("/p/") ? "p" : "reel";
  const embedUrl = `https://www.instagram.com/${path}/${encodeURIComponent(shortcode)}/embed/`;

  const response = await fetch(embedUrl, {
    headers: {
      "User-Agent": "facebookexternalhit/1.1",
      Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "Accept-Language": "en-GB,en;q=0.9",
    },
    next: { revalidate: 604800 },
  });

  if (!response.ok) {
    return "";
  }

  const html = await response.text();
  const thumbnail = pickInstagramThumbnail(html);

  if (thumbnail) {
    setCachedPreview(cacheKey, thumbnail);
  }

  return thumbnail;
}

export async function fetchSocialPreviewUrl(url: string): Promise<string> {
  const trimmed = url.trim();
  if (!trimmed) {
    return "";
  }

  if (trimmed.includes("tiktok.com")) {
    return fetchTikTokPreview(trimmed);
  }

  if (trimmed.includes("instagram.com")) {
    return fetchInstagramPreview(trimmed);
  }

  return "";
}

export type PortfolioPreview = {
  url: string;
  platform: PortfolioPlatform;
  title: string;
  brand: string;
  category: string;
  thumbnailUrl: string;
};

export async function fetchPortfolioPreviews<T extends { url: string; platform: PortfolioPlatform; title: string; brand: string; category: string }>(
  items: T[],
): Promise<PortfolioPreview[]> {
  const previews = await Promise.all(
    items.map(async (item) => ({
      ...item,
      thumbnailUrl: await fetchSocialPreviewUrl(item.url),
    })),
  );

  return previews;
}
