import { captionLine } from "@/lib/caption";
import { services } from "@/lib/config";

export function Services() {
  return (
    <section className="cadmus-section cadmus-services" id="services">
      <div className="cadmus-wrap">
        <div className="cadmus-section-head has-animation">
          <h2 className="cadmus-section-title caption-timeline">
            {captionLine("Services", "caption-line caption-line--words")}
          </h2>
          <p className="cadmus-section-meta">Rates on request</p>
        </div>
        <p className="cadmus-services__intro" data-reveal data-reveal-delay="1">
          Authentic short-form video content built for performance — not just awareness.
        </p>
        <div className="cadmus-services__grid">
          {services.map((service, index) => (
            <article key={service.title} className="cadmus-service has-animation" data-delay={String(index * 100)}>
              <div className="cadmus-service__head">
                <span className="cadmus-service__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="cadmus-service__title">{service.title}</h3>
              </div>
              <p className="cadmus-service__desc">{service.desc}</p>
              <ul className="cadmus-service__tags">
                {service.features.map((feature) => (
                  <li key={feature}>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
