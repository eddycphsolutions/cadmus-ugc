import { captionLine } from "@/lib/caption";
import { portfolioItems, portfolioPerPage } from "@/lib/config";
import { fetchPortfolioPreviews } from "@/lib/social-previews";
import { PortfolioPreviewCard } from "@/components/PortfolioPreviewCard";

export async function Portfolio() {
  const items = await fetchPortfolioPreviews(portfolioItems);
  const showPagination = items.length > portfolioPerPage;

  return (
    <section className="cadmus-section cadmus-portfolio" id="work">
      <div className="cadmus-wrap">
        <div className="cadmus-section-head has-animation">
          <h2 className="cadmus-section-title caption-timeline">
            {captionLine("Selected Work", "caption-line caption-line--words")}
          </h2>
          <p className="cadmus-section-meta">{items.length} pieces across Instagram and TikTok</p>
        </div>

        <div className="cadmus-filters" data-portfolio-filters data-reveal data-reveal-delay="1">
          <button type="button" className="cadmus-filter is-active" data-filter="all" aria-pressed="true">
            All
          </button>
          <button type="button" className="cadmus-filter" data-filter="instagram" aria-pressed="false">
            Instagram
          </button>
          <button type="button" className="cadmus-filter" data-filter="tiktok" aria-pressed="false">
            TikTok
          </button>
        </div>

        <div className="cadmus-portfolio__grid" data-portfolio-grid data-per-page={String(portfolioPerPage)}>
          {items.map((item, index) => (
            <article
              key={item.url}
              className="cadmus-portfolio__item has-animation"
              data-platform={item.platform}
              data-portfolio-item
              data-portfolio-index={String(index)}
              data-delay={String(Math.min(index * 80, 400))}
              hidden={index >= portfolioPerPage ? true : undefined}
            >
              <div className="cadmus-portfolio__embed">
                <PortfolioPreviewCard
                  url={item.url}
                  platform={item.platform}
                  title={item.title}
                  thumbnailUrl={item.thumbnailUrl}
                />
              </div>
              <div className="cadmus-portfolio__meta">
                <span className="cadmus-portfolio__title">{item.title}</span>
                <span className="cadmus-portfolio__brand">{item.brand}</span>
              </div>
            </article>
          ))}
        </div>

        {showPagination ? (
          <nav className="cadmus-pagination cadmus-pagination--portfolio" data-portfolio-pagination aria-label="Portfolio pages">
            <div className="cadmus-pagination__inner">
              <button type="button" className="cadmus-pagination__btn cadmus-pagination__btn--text" data-portfolio-prev disabled>
                Previous
              </button>
              <div className="cadmus-pagination__pages" data-portfolio-pages />
              <button type="button" className="cadmus-pagination__btn cadmus-pagination__btn--text" data-portfolio-next>
                Next
              </button>
            </div>
          </nav>
        ) : null}
      </div>
    </section>
  );
}
