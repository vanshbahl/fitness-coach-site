import { Hero } from "@/features/landing/Hero";
import { FloatingNav } from "@/components/layout/FloatingNav";

export default function LandingPage() {
  return (
    <main className="min-h-[100dvh] bg-background text-foreground antialiased selection:bg-primary selection:text-primary-foreground">
      <FloatingNav />
      <Hero />
    </main>
  );
}
