import { captionLine } from "@/lib/caption";
import { niches, siteInfo, taglineText } from "@/lib/config";

export function About() {
  return (
    <section className="cadmus-section cadmus-about" id="about">
      <div className="cadmus-about__inner">
        <figure className="cadmus-about__media has-animation">
          <img
            src="/assets/images/cadmus-about.png"
            alt={siteInfo.name}
            width={794}
            height={700}
            loading="lazy"
            decoding="async"
          />
        </figure>

        <div className="cadmus-about__content">
          <div className="cadmus-section-head has-animation" data-delay="80">
            <h2 className="cadmus-section-title caption-timeline">
              {captionLine("About me", "caption-line caption-line--words")}
            </h2>
            <p className="cadmus-section-meta">{taglineText()}</p>
          </div>

          <div className="cadmus-about__body has-animation" data-delay="160">
            <p className="cadmus-about__lead">{siteInfo.bio}</p>
            <p className="cadmus-about__text">{siteInfo.aboutMore}</p>
          </div>

          <div className="cadmus-about__specialisms has-animation" data-delay="240">
            <p className="cadmus-about__specialisms-label">Specialisms</p>
            <ul className="cadmus-about__tags">
              {niches.map((tag) => (
                <li key={tag}>
                  <span>{tag}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="cadmus-about__actions has-animation" data-delay="320">
            <a className="cadmus-btn" href="#contact">
              <span className="cadmus-btn__label">Get in touch</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
