import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WorkIndex from "@/components/WorkIndex";
import Pricing from "@/components/Pricing";
import FooterCTA from "@/components/FooterCTA";

export default function Home() {
  return (
    <main className="overflow-x-hidden w-full max-w-full bg-[#FAF6EF] text-[#1C1A17]">
      <Nav />
      <Hero />
      <Marquee />
      <WorkIndex />
      <Pricing />
      <FooterCTA />
    </main>
  );
}
