import { captionLine } from "@/lib/caption";
import { siteInfo } from "@/lib/config";

export function Contact() {
  return (
    <section className="cadmus-contact" id="contact">
      <div className="cadmus-wrap cadmus-contact__inner has-animation">
        <div className="cadmus-contact__heading">
          <h2 className="cadmus-contact__title caption-timeline">
            {captionLine("Let's make", "caption-line caption-line--stack")}
            {captionLine("something", "caption-line caption-line--stack")}
            {captionLine("great.", "caption-line caption-line--stack")}
          </h2>
        </div>
        <div className="cadmus-contact__body">
          <p className="cadmus-contact__lead has-animation" data-delay="120">
            Got a brief or just want to explore what&apos;s possible? Drop me an email and I&apos;ll get back to you within 24 hours.
          </p>
          <div className="cadmus-contact__actions has-animation" data-delay="220">
            <a className="cadmus-btn" href={`mailto:${siteInfo.email}`}>
              <span className="cadmus-btn__label">{siteInfo.email}</span>
            </a>
            <a className="cadmus-btn cadmus-btn--ghost" href={siteInfo.tiktokUrl} target="_blank" rel="noopener noreferrer">
              <span className="cadmus-btn__swap" data-hover="Follow on TikTok">
                TikTok
              </span>
            </a>
            <a className="cadmus-btn cadmus-btn--ghost" href={siteInfo.igUrl} target="_blank" rel="noopener noreferrer">
              <span className="cadmus-btn__swap" data-hover="Follow on Instagram">
                Instagram
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
