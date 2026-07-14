export function Footer() {
  return (
    <footer className="w-full bg-black border-t border-white/10 pt-20 pb-12 px-6 sm:px-8">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            Quick Strength
          </h2>
          <p className="text-zinc-500 font-medium">
            Elite Calisthenics Coaching by Abhay Pandey
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 sm:gap-16 text-sm font-medium">
          <div className="flex flex-col gap-3">
            <span className="text-zinc-600 font-semibold tracking-wider uppercase text-[11px]">Social</span>
            <a href="https://www.instagram.com/quick_strength" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">Instagram</a>
            <a href="https://www.youtube.com/@QuickStrength/" target="_blank" rel="noopener noreferrer" className="text-zinc-400 hover:text-white transition-colors">YouTube</a>
          </div>
          
          <div className="flex flex-col gap-3">
            <span className="text-zinc-600 font-semibold tracking-wider uppercase text-[11px]">Contact</span>
            <a href="tel:+919876543210" className="text-zinc-400 hover:text-white transition-colors">+91 98765 43210</a>
            <a href="mailto:hello@quickstrength.com" className="text-zinc-400 hover:text-white transition-colors">hello@quickstrength.com</a>
          </div>
        </div>
        
      </div>
      
      <div className="max-w-5xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-medium text-zinc-600">
        <p>© {new Date().getFullYear()} Quick Strength. All rights reserved.</p>
        <p>Built for Mastery.</p>
      </div>
    </footer>
  );
}
