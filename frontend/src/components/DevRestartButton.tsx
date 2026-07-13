import { useNavigate } from "react-router";
import { useQueryClient } from "@tanstack/react-query";

export function DevRestartButton() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  if (!import.meta.env.DEV) {
    return null;
  }

  const handleRestart = () => {
    // Clear local storage
    localStorage.clear();
    // Clear React Query cache
    queryClient.clear();
    // Navigate home
    navigate("/");
  };

  return (
    <button
      onClick={handleRestart}
      className="pointer-events-auto flex items-center h-9 px-3 rounded-lg text-xs font-medium text-zinc-400 border border-white/10 bg-white/5 hover:bg-white/10 hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
    >
      Restart Demo
    </button>
  );
}
