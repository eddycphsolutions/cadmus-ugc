import { navItems } from "@/lib/config";

export function SiteHeader() {
  return (
    <>
      <header className="cadmus-header" id="cadmus-header">
        <div className="cadmus-header__inner">
          <a className="cadmus-logo" href="#" rel="home">
            CT
          </a>

          <nav className="cadmus-nav" aria-label="Primary">
            {navItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <div className="cadmus-header__actions">
            <a className="cadmus-btn cadmus-btn--nav" href="#contact">
              Get in touch
            </a>
            <button
              className="cadmus-nav-toggle"
              type="button"
              aria-expanded="false"
              aria-controls="cadmus-drawer"
              data-nav-open
            >
              <span className="screen-reader-text">Open menu</span>
              <span aria-hidden="true" />
              <span aria-hidden="true" />
              <span aria-hidden="true" />
            </button>
          </div>
        </div>
      </header>

      <div className="cadmus-drawer" id="cadmus-drawer" hidden data-mobile-nav>
        <div className="cadmus-drawer__panel" role="dialog" aria-modal="true" aria-label="Site menu">
          <button className="cadmus-drawer__close" type="button" data-nav-close aria-label="Close menu">
            <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
          {navItems.map((item) => (
            <a key={item.href} href={item.href} data-nav-close>
              {item.label}
            </a>
          ))}
          <a className="cadmus-btn" href="#contact" data-nav-close>
            Get in touch
          </a>
        </div>
      </div>
    </>
  );
}
