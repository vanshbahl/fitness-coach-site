import { useLocation, Routes, Route } from "react-router";
import LandingPage from "./pages/LandingPage";
import AssessmentPage from "./pages/AssessmentPage";
import PaymentPage from "./pages/PaymentPage";
import SuccessPage from "./pages/SuccessPage";
import ScheduleBookingPage from "./pages/ScheduleBookingPage";

export default function App() {
  const location = useLocation();

  return (
    <>
      <svg className="fixed inset-0 w-full h-full opacity-[0.015] mix-blend-overlay pointer-events-none z-50" xmlns="http://www.w3.org/2000/svg">
        <filter id="global-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#global-noise)" />
      </svg>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/assessment" element={<AssessmentPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/schedule" element={<ScheduleBookingPage />} />
      </Routes>
    </>
  );
}
