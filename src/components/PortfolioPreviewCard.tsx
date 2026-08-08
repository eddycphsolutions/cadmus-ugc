import { PortfolioPlatform } from "@/lib/config";
import { Icon } from "@/lib/icons";

type PortfolioPreviewCardProps = {
  url: string;
  platform: PortfolioPlatform;
  title: string;
  thumbnailUrl: string;
};

export function PortfolioPreviewCard({ url, platform, title, thumbnailUrl }: PortfolioPreviewCardProps) {
  const platformName = platform === "tiktok" ? "TikTok" : "Instagram";
  const label = title || `View on ${platformName}`;

  if (!thumbnailUrl) {
    return (
      <a className="cadmus-embed-fallback" href={url} target="_blank" rel="noopener noreferrer">
        <span className="cadmus-embed-fallback__platform">{platformName}</span>
        <span className="cadmus-embed-fallback__label">{label}</span>
        <Icon name={platform} />
      </a>
    );
  }

  return (
    <a className="cadmus-portfolio__preview" href={url} target="_blank" rel="noopener noreferrer">
      <img
        className="cadmus-portfolio__preview-img"
        src={thumbnailUrl}
        alt={label}
        loading="lazy"
        decoding="async"
        width={400}
        height={711}
      />
      <span className="cadmus-portfolio__preview-shade" aria-hidden="true" />
      <span className="cadmus-portfolio__preview-play" aria-hidden="true">
        <Icon name="play" />
      </span>
      <span className="cadmus-portfolio__preview-platform" aria-hidden="true">
        <Icon name={platform} />
      </span>
    </a>
  );
}
