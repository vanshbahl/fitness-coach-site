import { Hero } from "@/features/landing/Hero";
import { FloatingNav } from "@/components/layout/FloatingNav";
import { WhyCalisthenics } from "@/features/landing/components/WhyCalisthenics";
import { WhyQuickStrength } from "@/features/landing/components/WhyQuickStrength";
import { ReelsSection } from "@/features/landing/components/reels";
import { MeetYourCoach } from "@/features/landing/components/MeetYourCoach";
import { Results } from "@/features/landing/components/Results";
import { WhatYouGet } from "@/features/landing/components/WhatYouGet";
import { FaqSection } from "@/features/landing/components/FaqSection";
import { FinalCTA } from "@/features/landing/components/FinalCTA";
import { Footer } from "@/features/landing/components/Footer";

export default function LandingPage() {
  return (
    <main className="min-h-[100dvh] bg-black text-white antialiased selection:bg-white selection:text-black flex flex-col">
      <FloatingNav />
      <Hero />
      <WhyQuickStrength />
      <ReelsSection />
      <WhyCalisthenics />
      <MeetYourCoach />
      <Results />
      <WhatYouGet />
      <FaqSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}
