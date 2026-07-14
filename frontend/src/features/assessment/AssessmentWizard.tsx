import { useState, useEffect } from "react";
import { FormProvider } from "react-hook-form";
import { useNavigate } from "react-router";
import { useAssessmentForm } from "./useAssessmentForm";
import { AssessmentLayout } from "./components/AssessmentLayout";
import { useCreateBooking } from "../../hooks/api/booking";
// Steps
import { WelcomeScreen } from "./steps/WelcomeScreen";
import { Step1Demographics } from "./steps/Step1Demographics";
import { Step2Goals } from "./steps/Step2Goals";
import { Step3Equipment } from "./steps/Step3Equipment";
import { Step4Availability } from "./steps/Step4Availability";
import { Step5Metrics } from "./steps/Step5Metrics";
import { Step6Medical } from "./steps/Step6Medical";
import { Step7Contact } from "./steps/Step7Contact";
import { Step8Commitment } from "./steps/Step8Commitment";
import { Step9Review } from "./steps/Step9Review";

export function AssessmentWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const form = useAssessmentForm();
  const navigate = useNavigate();

  const [direction, setDirection] = useState(1);
  const [isSaving, setIsSaving] = useState(false);
  const createBookingMutation = useCreateBooking();

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentStep]);

  const data = form.watch();

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return !!data.age && !!data.gender && data.previousExperience !== undefined;
      case 2: return data.goals && data.goals.length > 0;
      case 3: return data.equipment && data.equipment.length > 0;
      case 4: return data.preferredDays && data.preferredDays.length > 0 && data.preferredTime && data.preferredTime.length > 0;
      case 7: return (data.name?.trim()?.length || 0) >= 2 && (data.whatsapp?.trim()?.length || 0) >= 5 && (data.city?.trim()?.length || 0) >= 2;
      case 8: return !!data.preferredDuration;
      default: return true;
    }
  };

  const handleNext = async () => {
    if (isSaving) return;

    let fieldsToValidate: any[] = [];
    switch (currentStep) {
      case 1: fieldsToValidate = ["age", "gender", "previousExperience"]; break;
      case 2: fieldsToValidate = ["goals"]; break;
      case 3: fieldsToValidate = ["equipment"]; break;
      case 4: fieldsToValidate = ["preferredDays", "preferredTime"]; break;
      case 5: fieldsToValidate = ["heightCm", "weightKg"]; break;
      case 6: fieldsToValidate = ["currentRoutine", "injuries"]; break;
      case 7: fieldsToValidate = ["name", "whatsapp", "instagram", "city"]; break;
      case 8: fieldsToValidate = ["preferredDuration"]; break;
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await (form.trigger as any)(fieldsToValidate);
      if (!isValid) return;
    }

    if (currentStep === 9) {
      setIsSaving(true);
      try {
        const result = await createBookingMutation.mutateAsync(data);
        localStorage.setItem("qs_booking_id", result.id);
        navigate("/payment");
      } catch (err) {
        console.error(err);
      } finally {
        setIsSaving(false);
      }
      return;
    }

    // Success transition
    setIsSaving(true);
    setTimeout(() => {
      setDirection(1);
      setCurrentStep(prev => Math.min(prev + 1, 9));
      setIsSaving(false);
    }, 400); // allow morph animation to finish
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
      >
        {currentStep === 0 && <WelcomeScreen />}
        {currentStep === 1 && <Step1Demographics />}
        {currentStep === 2 && <Step2Goals />}
        {currentStep === 3 && <Step3Equipment />}
        {currentStep === 4 && <Step4Availability />}
        {currentStep === 5 && <Step5Metrics />}
        {currentStep === 6 && <Step6Medical />}
        {currentStep === 7 && <Step7Contact />}
        {currentStep === 8 && <Step8Commitment />}
        {currentStep === 9 && <Step9Review onEditStep={setCurrentStep} />}
      </AssessmentLayout>
    </FormProvider>
  );
}
