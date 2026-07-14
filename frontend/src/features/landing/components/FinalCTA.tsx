import { motion } from "framer-motion";
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

export function FinalCTA() {
  return (
    <section id="assessment" className="relative w-full bg-black py-32 sm:py-48 px-6 sm:px-8 border-t border-white/5 overflow-hidden">
      
      {/* Huge Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vw] sm:w-[50vw] sm:h-[50vw] bg-white/5 rounded-full blur-[150px] mix-blend-screen pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-5xl sm:text-7xl font-extrabold tracking-tighter text-white mb-6 leading-[1.05]">
            Ready to Begin?
          </h2>
          <p className="text-lg sm:text-xl text-zinc-400 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Stop guessing. Start building real strength. Book your trial assessment today and get a personalized roadmap to elite physical mastery.
          </p>

          <Link 
            to="/assessment"
            className="h-16 px-10 flex items-center justify-center text-lg font-semibold rounded-2xl group w-full sm:w-auto mx-auto bg-white text-black hover:-translate-y-0.5 hover:scale-[1.02] shadow-[0_4px_20px_rgba(249,115,22,0.12)] hover:shadow-[0_8px_30px_rgba(249,115,22,0.22)] transition-all duration-250 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          >
            Start Your Assessment
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
