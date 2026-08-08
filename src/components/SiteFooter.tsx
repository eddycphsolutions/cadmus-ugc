import { siteInfo } from "@/lib/config";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="cadmus-footer">
      <div className="cadmus-wrap cadmus-footer__inner">
        <p className="cadmus-footer__copy">
          &copy; {year} {siteInfo.nameFirst} {siteInfo.nameLast}
        </p>
        <p className="cadmus-footer__meta">{siteInfo.email}</p>
      </div>
    </footer>
  );
}
