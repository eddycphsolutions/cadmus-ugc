import type { Metadata } from "next";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { ClientScripts } from "@/components/ClientScripts";
import { siteInfo } from "@/lib/config";

export const metadata: Metadata = {
  title: `${siteInfo.name} | UGC Creator`,
  description: siteInfo.bio,
  icons: {
    icon: "/assets/favicon.svg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-GB">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Poppins:wght@600;700&family=Six+Caps&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" href="/assets/fonts/KAREVO.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="stylesheet" href="/assets/css/main.css" />
      </head>
      <body className="cadmus-smooth-scroll">
        <a className="cadmus-skip" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        {children}
        <SiteFooter />
        <ClientScripts />
      </body>
    </html>
  );
}
