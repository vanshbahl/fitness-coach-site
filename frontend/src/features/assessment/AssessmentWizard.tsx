import { useState, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import { useAssessmentForm } from "./useAssessmentForm";
import { AssessmentLayout } from "./components/AssessmentLayout";
import { useCreateBooking } from "../../hooks/api/booking";
import { parseApiError, ParsedApiError } from "../../utils/errorParser";
import { isValidPhoneNumber } from "libphonenumber-js/max";
// Steps
import { WelcomeScreen } from "./steps/WelcomeScreen";
import { Step1Demographics } from "./steps/Step1Demographics";
import { Step1bTrainingLevel } from "./steps/Step1bTrainingLevel";
import { Step2Goals } from "./steps/Step2Goals";
import { Step3Equipment } from "./steps/Step3Equipment";
import { Step4Availability } from "./steps/Step4Availability";
import { Step5Metrics } from "./steps/Step5Metrics";
import { Step6Medical } from "./steps/Step6Medical";
import { Step7Contact } from "./steps/Step7Contact";
import { Step8Commitment } from "./steps/Step8Commitment";
import { Step9Review } from "./steps/Step9Review";

export function AssessmentWizard() {
  const location = useLocation();
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(() => {
    return location.state?.returnToReview ? 10 : 0;
  });
  const [hasUnlockedReview, setHasUnlockedReview] = useState(() => {
    return location.state?.returnToReview ? true : false;
  });

  const form = useAssessmentForm();
  const [direction, setDirection] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const [globalError, setGlobalError] = useState<ParsedApiError | null>(null);
  const createBookingMutation = useCreateBooking();

  // Clear location state on mount to prevent sticky returnToReview on refresh
  useEffect(() => {
    if (location.state?.returnToReview) {
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);

  // Unlock review step for production navigation improvement
  useEffect(() => {
    if (currentStep === 10 && !hasUnlockedReview) {
      setHasUnlockedReview(true);
    }
  }, [currentStep, hasUnlockedReview]);

  // Developer shortcut to bypass onboarding UI testing
  const handleDevSkip = () => {
    form.reset({
      age: 28,
      gender: "Male",
      previousExperience: true,
      goals: ["Build Muscle", "Increase Strength"],
      equipment: ["Dumbbells", "Pull-up Bar"],
      preferredDays: ["Monday", "Wednesday", "Friday"],
      preferredTime: ["Morning"],
      heightCm: 180,
      weightKg: 75,
      currentRoutine: "Basic pushups and pullups",
      injuries: "None",
      name: "Test User",
      country: "IN",
      countryCode: "+91",
      nationalNumber: "9876543210",
      instagram: "testuser",
      city: "Test City",
      preferredDuration: "3 Months",
      trainingLevel: "Intermediate"
    });
    setDirection(1);
    setCurrentStep(10);
    setHasUnlockedReview(true);
  };

  // Scroll to top on step change and clear global error
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setGlobalError(null);
  }, [currentStep]);

  const data = form.watch();

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return !!data.age && !!data.gender && data.previousExperience !== undefined;
      case 2: return !!data.trainingLevel;
      case 3: return data.goals && data.goals.length > 0;
      case 4: return data.equipment && data.equipment.length > 0;
      case 5: return data.preferredDays && data.preferredDays.length > 0 && data.preferredTime && data.preferredTime.length > 0;
      case 8: return (data.name?.trim()?.length || 0) >= 2 && (data.nationalNumber?.trim()?.length || 0) >= 5 && (data.city?.trim()?.length || 0) >= 2;
      case 9: return !!data.preferredDuration;
      default: return true;
    }
  };

  const handleNext = async () => {
    if (isSaving) return;

    let fieldsToValidate: any[] = [];
    switch (currentStep) {
      case 1: fieldsToValidate = ["age", "gender", "previousExperience"]; break;
      case 2: fieldsToValidate = ["trainingLevel"]; break;
      case 3: fieldsToValidate = ["goals"]; break;
      case 4: fieldsToValidate = ["equipment"]; break;
      case 5: fieldsToValidate = ["preferredDays", "preferredTime"]; break;
      case 6: fieldsToValidate = ["heightCm", "weightKg"]; break;
      case 7: fieldsToValidate = ["currentRoutine", "injuries"]; break;
      case 8: fieldsToValidate = ["name", "country", "countryCode", "nationalNumber", "instagram", "city"]; break;
      case 9: fieldsToValidate = ["preferredDuration"]; break;
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await (form.trigger as any)(fieldsToValidate);
      if (!isValid) return;
    }

    if (currentStep === 10) {
      setGlobalError(null);
      
      // Frontend Phone Validation
      if (data.country && data.nationalNumber) {
        try {
          if (!isValidPhoneNumber(data.nationalNumber, data.country as any)) {
            setDirection(-1);
            setCurrentStep(8);
            setTimeout(() => {
              form.setError("nationalNumber", { type: "manual", message: "This phone number doesn't match the selected country." });
              try {
                form.setFocus("nationalNumber");
              } catch (e) {
                const el = document.getElementsByName("nationalNumber")[0] as HTMLElement;
                if (el) el.focus();
              }
            }, 300);
            return;
          }
        } catch {
          // Fallback if parsing fails entirely
        }
      }

      setIsSaving(true);
      try {
        const result = await createBookingMutation.mutateAsync(data);
        localStorage.setItem("qs_booking_id", result.id);
        navigate("/payment");
      } catch (err: any) {
        const parsed = parseApiError(err);
        if (parsed.step !== undefined && parsed.focusField) {
          setDirection(-1);
          setCurrentStep(parsed.step);
          setTimeout(() => {
            form.setError(parsed.focusField as any, { type: "manual", message: parsed.message });
            try {
              form.setFocus(parsed.focusField as any);
            } catch (e) {
              // Fallback for custom components not registered with ref (e.g. PhoneInput)
              const el = document.getElementsByName(parsed.focusField as string)[0] as HTMLElement;
              if (el) el.focus();
            }
          }, 300);
        } else {
          setGlobalError(parsed);
        }
      } finally {
        setIsSaving(false);
      }
      return;
    }

    // Success transition
    setIsSaving(true);
    setTimeout(() => {
      setDirection(1);
      if (hasUnlockedReview && currentStep < 10) {
        setCurrentStep(10);
      } else {
        setCurrentStep(prev => Math.min(prev + 1, 10));
      }
      setIsSaving(false);
    }, 300); // allow morph animation to finish
  };

  const handleBack = () => {
    if (isSaving) return;
    setDirection(-1);
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  if (!form.isLoaded) return null; // Prevent hydration flash

  return (
    <FormProvider {...form}>
      <AssessmentLayout
        currentStep={currentStep}
        direction={direction}
        isSaving={isSaving}
        isValid={isStepValid()}
        onNext={handleNext}
        onBack={currentStep > 0 ? handleBack : undefined}
        hasUnlockedReview={hasUnlockedReview}
        onDevSkip={handleDevSkip}
        globalError={globalError}
      >
        {currentStep === 0 && <WelcomeScreen />}
        {currentStep === 1 && <Step1Demographics />}
        {currentStep === 2 && <Step1bTrainingLevel />}
        {currentStep === 3 && <Step2Goals />}
        {currentStep === 4 && <Step3Equipment />}
        {currentStep === 5 && <Step4Availability />}
        {currentStep === 6 && <Step5Metrics />}
        {currentStep === 7 && <Step6Medical />}
        {currentStep === 8 && <Step7Contact />}
        {currentStep === 9 && <Step8Commitment />}
        {currentStep === 10 && <Step9Review onEditStep={setCurrentStep} />}
      </AssessmentLayout>
    </FormProvider>
  );
}
