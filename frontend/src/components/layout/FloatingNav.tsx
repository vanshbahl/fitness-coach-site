import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router";
import { Menu, X } from "lucide-react";

import logoText from "@/assets/branding/qs-logo-txt.png";
import logoIcon from "@/assets/branding/qs-logo-pic.png";

const NAV_LINKS = [
  { name: "Philosophy", href: "#philosophy" },
  { name: "Results", href: "#results" },
  { name: "FAQ", href: "#faq" },
];

export function FloatingNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Subtle blur and shadow on scroll for premium desktop experience
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.header 
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 px-4 pt-4 pb-4 pointer-events-none"
      >
        <div className={`max-w-5xl mx-auto flex items-center justify-between rounded-2xl px-5 py-3 transition-all duration-500 ${scrolled ? 'bg-black/60 backdrop-blur-xl border border-white/15 shadow-2xl' : 'bg-black/20 backdrop-blur-md border border-white/5'} pointer-events-auto`}>
          
          <a href="#" className="z-50 relative flex items-center" aria-label="Quick Strength Home">
            {/* Mobile: Compact Icon Logo */}
            <img 
              src={logoIcon} 
              alt="Quick Strength Logo Icon" 
              className="h-12 w-auto md:hidden" 
            />
            {/* Desktop: Full Text Logo */}
            <img 
              src={logoText} 
              alt="Quick Strength Official Logo" 
              className="hidden md:block h-8 w-auto" 
            />
          </a>
          
          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400" aria-label="Desktop navigation">
            {NAV_LINKS.map(link => (
              <a key={link.name} href={link.href} className="hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded px-2 py-1">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/assessment"
              className="inline-flex items-center justify-center rounded-full font-semibold h-9 px-5 text-xs bg-white text-black hover:bg-zinc-200 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black transition-colors" 
              aria-label="Start your assessment"
            >
              Start Assessment
            </Link>
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
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(24px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black/90 md:hidden flex flex-col pt-32 px-6 pb-8"
          >
            {/* Top Branding in Menu */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-10 w-full flex justify-center"
            >
              <img src={logoText} alt="Quick Strength Official Logo" className="h-8 w-auto opacity-90" />
            </motion.div>

            <nav className="flex flex-col gap-6 w-full" aria-label="Mobile navigation">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 + 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-3xl font-semibold text-zinc-300 hover:text-white tracking-tight text-center"
                >
                  {link.name}
                </motion.a>
              ))}
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="w-full h-[1px] bg-white/10 my-6"
              />
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4 w-full"
              >
                <Link 
                  to="/assessment"
                  className="w-full flex items-center justify-center rounded-xl bg-white text-black font-semibold h-14 text-lg active:scale-[0.98] transition-all hover:bg-zinc-200" 
                  onClick={() => setIsOpen(false)} 
                  aria-label="Start your assessment"
                >
                  Start Assessment
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
