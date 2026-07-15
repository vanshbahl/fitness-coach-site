/**
 * Determines whether demo mode should be enabled.
 * Production builds will always disable demo mode.
 * Development builds will default to false, unless explicitly enabled via
 * localStorage or the VITE_ENABLE_DEMO_MODE environment variable.
 */
const getIsDemoMode = (): boolean => {
  // 1. Production safety: never use demo mode in prod
  if (import.meta.env.PROD) {
    return false;
  }

  // 2. LocalStorage override has highest priority
  const localVal = localStorage.getItem("demo_mode");
  if (localVal === "true") {
    return true;
  }
  if (localVal === "false") {
    return false;
  }

  // 3. Environment Variable fallback
  if (import.meta.env.VITE_ENABLE_DEMO_MODE === "true") {
    return true;
  }

  // 4. Default to false (Real Backend)
  return false;
};

export const isDemoMode = getIsDemoMode();

// Log status only once on startup
if (import.meta.env.DEV) {
  if (isDemoMode) {
    // eslint-disable-next-line no-console
  } else {
    // eslint-disable-next-line no-console
  }
}
