import { siteInfo } from "@/lib/config";

const stats = [
  { number: siteInfo.ttFollowers, label: "TikTok followers" },
  { number: siteInfo.igFollowers, label: "Instagram followers" },
  { number: siteInfo.ttLikes, label: "TikTok likes" },
];

export function StatsStrip() {
  return (
    <section className="cadmus-stats-strip" aria-label="Social stats">
      <div className="cadmus-wrap cadmus-stats-strip__inner">
        {stats.map((stat, index) => (
          <div key={stat.label} className="cadmus-stat-row has-animation" data-delay={String(index * 100)}>
            <span className="cadmus-stat-row__number">{stat.number}</span>
            <span className="cadmus-stat-row__label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
