import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Portfolio } from "@/components/Portfolio";
import { Services } from "@/components/Services";
import { StatsStrip } from "@/components/StatsStrip";

export const revalidate = 86400;

export default function HomePage() {
  return (
    <main id="main">
      <Hero />
      <StatsStrip />
      <About />
      <Portfolio />
      <Services />
      <Contact />
    </main>
  );
}
