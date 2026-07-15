import { isDemoMode } from "../utils/demo";

export function DemoBanner() {
  if (!isDemoMode) return null;

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-[100] pointer-events-none">
      <div className="bg-black/80 backdrop-blur-md border border-amber-500/30 text-amber-500 px-3 py-1.5 rounded-full shadow-lg flex items-center gap-2 pointer-events-auto shadow-amber-500/10">
        <span className="text-sm">🛠</span>
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider leading-tight">Demo Mode Enabled</span>
          <span className="text-[9px] opacity-80 leading-tight">Backend is bypassed</span>
        </div>
      </div>
    </div>
  );
}
