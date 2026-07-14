import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

import logoText from "@/assets/branding/qs-logo-txt.png";
import logoIcon from "@/assets/branding/qs-logo-pic.png";

const NAV_LINKS = [
  { name: "Philosophy", href: "philosophy" },
  { name: "System", href: "system" },
  { name: "Founder", href: "founder" },
  { name: "Results", href: "results" },
  { name: "FAQ", href: "faq" },
];

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for Active Section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // We only care about intersecting entries
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      // Root margin offsets the trigger area to the top 20-50% of the viewport
      { rootMargin: "-20% 0px -60% 0px" } 
    );

    const sectionIds = ["hero", ...NAV_LINKS.map(l => l.href), "assessment"];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  // Handle body lock, Escape key, and Focus Trap for Mobile Menu
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleEscape);
    } else {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    }

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement | HTMLButtonElement>, targetId: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (targetId === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    
    const element = document.getElementById(targetId);
    if (element) {
      // Offset to account for the floating navbar
      const offset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <>
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 px-4 pt-4 pb-4 pointer-events-none"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between rounded-[24px] px-5 py-3 transition-all duration-500 border bg-black/70 backdrop-blur-2xl border-white/10 shadow-lg shadow-black/50 pointer-events-auto">
          
          <a 
            href="#hero" 
            onClick={(e) => scrollToSection(e, "hero")}
            className="z-50 relative flex items-center" 
            aria-label="Quick Strength Home"
          >
            {/* Mobile: Compact Icon Logo */}
            <img 
              src={logoIcon} 
              alt="Quick Strength Logo" 
              className="h-10 w-auto md:hidden" 
            />
            {/* Desktop: Full Text Logo */}
            <img 
              src={logoText} 
              alt="Quick Strength Logo" 
              className="hidden md:block h-6 w-auto" 
            />
          </a>
          
          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400" aria-label="Desktop navigation">
            {NAV_LINKS.map(link => {
              const isActive = activeSection === link.href;
              return (
                <a 
                  key={link.name} 
                  href={`#${link.href}`} 
                  onClick={(e) => scrollToSection(e, link.href)}
                  className={`relative hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-2 py-1 ${isActive ? 'text-orange-500' : ''}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {link.name}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute left-0 right-0 -bottom-1 h-[2px] bg-orange-500 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <a 
              href="#assessment"
              onClick={(e) => scrollToSection(e, "assessment")}
              className="inline-flex items-center justify-center rounded-full font-bold h-10 px-6 text-sm bg-white text-black hover:-translate-y-[1px] hover:scale-[1.02] shadow-[0_2px_10px_rgba(249,115,22,0.1)] hover:shadow-[0_4px_15px_rgba(249,115,22,0.2)] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black" 
              aria-label="Start your assessment"
            >
              Start Assessment
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button 
            className="md:hidden relative z-50 p-2 -mr-2 text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full transition-transform active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </motion.header>

      {/* Premium Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: "-100%" }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: [0.22, 1, 0.36, 1] } }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl md:hidden flex flex-col pt-32 px-6 pb-8 border-b border-white/10"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
          >
            <nav className="flex flex-col gap-8 w-full items-center justify-center flex-1">
              {NAV_LINKS.map((link, i) => {
                const isActive = activeSection === link.href;
                return (
                  <motion.a
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    key={link.name}
                    href={`#${link.href}`}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className={`text-3xl font-extrabold tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-lg px-4 py-2 ${isActive ? 'text-orange-500' : 'text-zinc-300 hover:text-white'}`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {link.name}
                  </motion.a>
                );
              })}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-sm mt-4"
              >
                <a 
                  href="#assessment"
                  onClick={(e) => scrollToSection(e, "assessment")}
                  className="w-full flex items-center justify-center rounded-full bg-white text-black font-extrabold tracking-wide h-14 text-lg active:scale-[0.98] transition-all hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black" 
                  aria-label="Start your assessment"
                >
                  Start Assessment
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
