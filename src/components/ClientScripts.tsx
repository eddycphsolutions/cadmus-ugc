"use client";

import Script from "next/script";

export function ClientScripts() {
  return (
    <>
      <Script src="/assets/js/vendor/gsap.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/vendor/ScrollTrigger.min.js" strategy="afterInteractive" />
      <Script src="/assets/js/main.js" strategy="afterInteractive" />
    </>
  );
}
