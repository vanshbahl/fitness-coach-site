import { useEffect } from "react";
import { useLocation } from "react-router";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    try {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
      });
    } catch (e) {
      // Fallback for browsers that do not support "instant" or options object
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
