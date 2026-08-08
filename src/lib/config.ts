export const siteInfo = {
  name: "Cadmus The Creator",
  nameFirst: "Cadmus",
  nameLast: "The Creator",
  tagline: ["Filmmaker", "Product creator", "Storyteller"],
  bio: "Short-form ads and authentic UGC content that converts. Working with brands across product, lifestyle, tech and AI.",
  aboutMore:
    "From concept and scripting through filming and editing, I deliver platform-ready content built for performance — whether you need a single hero clip or a full content bundle for paid and organic channels.",
  email: "cadmusthecreator@gmail.com",
  igUrl: "https://www.instagram.com/cadmusthecreator/",
  tiktokUrl: "https://www.tiktok.com/@cadmusthecreator",
  igFollowers: "65+",
  ttFollowers: "52+",
  ttLikes: "594+",
} as const;

export const navItems = [
  { label: "About me", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
] as const;

export const niches = [
  "Product video",
  "UGC",
  "Storytelling",
  "Brand content",
  "Short-form",
  "AI products",
] as const;

export const services = [
  {
    title: "UGC content",
    desc: "Authentic short-form video content built for performance — not just awareness.",
    features: ["Concept creation", "Filming and editing", "Paid ad ready", "Content bundles"],
  },
  {
    title: "Product showcases",
    desc: "Clean, conversion-focused clips that highlight features, texture and use.",
    features: ["Hero product shots", "Feature callouts", "Platform-ready formats", "Fast turnaround"],
  },
  {
    title: "Story-led brand films",
    desc: "Short narrative pieces that connect your product to real moments and emotions.",
    features: ["Script support", "On-camera delivery", "B-roll capture", "Organic and paid edits"],
  },
  {
    title: "Custom packages",
    desc: "Tailored to your brief, budget and timeline. Let us figure out what works for you.",
    features: ["Photos and videos", "Flexible deliverables", "Whitelisting on request", "Custom pricing"],
  },
] as const;

export type PortfolioPlatform = "instagram" | "tiktok";

export type PortfolioItem = {
  platform: PortfolioPlatform;
  url: string;
  title: string;
  brand: string;
  category: string;
};

export const portfolioItems: PortfolioItem[] = [
  { platform: "instagram", url: "https://www.instagram.com/cadmusthecreator/reel/DbvsZJhokyw/", title: "Product showcase reel", brand: "Brand content", category: "product" },
  { platform: "instagram", url: "https://www.instagram.com/cadmusthecreator/reel/DbqhgqGoE1o/", title: "UGC product demo", brand: "Product video", category: "ugc" },
  { platform: "instagram", url: "https://www.instagram.com/cadmusthecreator/reel/DbV0pApID-4/", title: "Story-led product clip", brand: "Storytelling", category: "story" },
  { platform: "instagram", url: "https://www.instagram.com/cadmusthecreator/reel/DbGfiNJKF0p/", title: "AI product feature", brand: "AI products", category: "product" },
  { platform: "instagram", url: "https://www.instagram.com/cadmusthecreator/reel/Da5l9tzIldC/", title: "Short-form brand reel", brand: "Brand content", category: "ugc" },
  { platform: "instagram", url: "https://www.instagram.com/cadmusthecreator/reel/DblXwPlIzn-/", title: "Product close-up reel", brand: "Product video", category: "product" },
  { platform: "tiktok", url: "https://www.tiktok.com/@cadmusthecreator/video/7659461290166996246", title: "TikTok product showcase", brand: "Product video", category: "product" },
  { platform: "tiktok", url: "https://www.tiktok.com/@cadmusthecreator/video/7611587407795817750", title: "UGC hook and demo", brand: "UGC", category: "ugc" },
  { platform: "tiktok", url: "https://www.tiktok.com/@cadmusthecreator/video/7597080550129585430", title: "Brand storytelling clip", brand: "Storytelling", category: "story" },
  { platform: "tiktok", url: "https://www.tiktok.com/@cadmusthecreator/video/7671336062144318752", title: "Creator-led product review", brand: "Brand content", category: "ugc" },
  { platform: "tiktok", url: "https://www.tiktok.com/@cadmusthecreator/video/7668368389546528022", title: "Short-form product feature", brand: "Product video", category: "product" },
  { platform: "tiktok", url: "https://www.tiktok.com/@cadmusthecreator/video/7664928494077447446", title: "Social-ready UGC edit", brand: "UGC", category: "ugc" },
];

export const portfolioPerPage = 6;

export function taglineText(): string {
  return siteInfo.tagline.join(", ");
}

export function taglineRoles(): string {
  return siteInfo.tagline.join(" · ");
}
