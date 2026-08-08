import { captionLine } from "@/lib/caption";
import { siteInfo, taglineRoles } from "@/lib/config";

export function Hero() {
  return (
    <section className="cadmus-hero">
      <div className="cadmus-hero__frame">
        <div className="cadmus-hero__title-wrap" data-hero-title>
          <h1 className="cadmus-hero__display">{captionLine(siteInfo.name)}</h1>
        </div>

        <div className="cadmus-hero__meta" data-hero-meta>
          <p className="cadmus-hero__eyebrow" data-hero-meta-item>
            <span>{taglineRoles()}</span>
          </p>
          <p className="cadmus-hero__lead" data-hero-meta-item>
            {siteInfo.bio}
          </p>
          <div className="cadmus-hero__actions" data-hero-meta-item>
            <a className="cadmus-btn cadmus-btn--pill" href="#contact">
              <span className="cadmus-btn__label">Work with me</span>
            </a>
            <a className="cadmus-btn cadmus-btn--pill cadmus-btn--pill-muted" href="#work">
              <span className="cadmus-btn__label">View work</span>
            </a>
          </div>
        </div>

        <div className="cadmus-hero__media" data-hero-media>
          <div className="cadmus-hero__media-reveal" data-hero-reveal>
            <figure className="cadmus-hero__portrait" data-hero-portrait>
              <img
                src="/assets/images/cadmus-hero.png"
                alt={siteInfo.name}
                width={768}
                height={1024}
                loading="eager"
                decoding="async"
              />
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
