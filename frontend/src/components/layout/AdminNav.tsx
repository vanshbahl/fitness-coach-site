import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router";

import logoText from "@/assets/branding/qs-logo-txt.png";
import logoIcon from "@/assets/branding/qs-logo-pic.png";

const NAV_LINKS = [
  { name: "Overview", href: "#", disabled: true },
  { name: "Documentation", href: "#", disabled: true },
];

export function AdminNav() {
  const [isOpen, setIsOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

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

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <>
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-50 px-4 pt-4 pb-4 pointer-events-none"
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between rounded-[24px] px-5 py-3 transition-all duration-500 border bg-black/70 backdrop-blur-2xl border-white/10 shadow-lg shadow-black/50 pointer-events-auto">
          
          <Link 
            to="/admin" 
            className="z-50 relative flex items-center" 
            aria-label="Admin Portal Home"
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
          </Link>
          
          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400" aria-label="Desktop navigation">
            {NAV_LINKS.map(link => (
              <span 
                key={link.name} 
                className={`relative px-2 py-1 ${link.disabled ? 'text-zinc-600 cursor-not-allowed' : 'text-zinc-400 hover:text-white transition-colors cursor-pointer'}`}
                aria-disabled={link.disabled}
              >
                {link.name}
              </span>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link 
              to="/"
              className="inline-flex items-center justify-center rounded-full font-bold h-10 px-6 text-sm bg-white text-black hover:-translate-y-[1px] hover:scale-[1.02] shadow-[0_2px_10px_rgba(249,115,22,0.1)] hover:shadow-[0_4px_15px_rgba(249,115,22,0.2)] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black" 
              aria-label="Return to public website"
            >
              Website
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
              {NAV_LINKS.map((link, i) => (
                <motion.span
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.2, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  key={link.name}
                  className={`text-3xl font-extrabold tracking-tight px-4 py-2 ${link.disabled ? 'text-zinc-700 cursor-not-allowed' : 'text-zinc-300'}`}
                  aria-disabled={link.disabled}
                >
                  {link.name}
                </motion.span>
              ))}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-sm mt-4"
              >
                <Link 
                  to="/"
                  className="w-full flex items-center justify-center rounded-full bg-white text-black font-extrabold tracking-wide h-14 text-lg active:scale-[0.98] transition-all hover:bg-zinc-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black" 
                  aria-label="Return to public website"
                >
                  Website
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
