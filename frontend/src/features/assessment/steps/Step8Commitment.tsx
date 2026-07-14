import { useFormContext } from "react-hook-form";
import { Clock, Calendar, CheckCircle, Zap } from "lucide-react";
import { StepLayout } from "../components/StepLayout";
import { OptionCard } from "../components/OptionCard";
import { AssessmentFormData } from "../schema";


const DURATION_OPTIONS = [
  { id: "1 Month", title: "1 Month", description: "Jumpstart your progress", icon: Zap },
  { id: "3 Months", title: "3 Months", description: "Build solid habits & visible changes", icon: Calendar, recommended: true },
  { id: "6 Months", title: "6 Months", description: "Total body transformation", icon: Clock },
  { id: "Long Term", title: "Long Term", description: "Ongoing elite performance", icon: CheckCircle },
];

export function Step8Commitment() {
  const { watch, setValue } = useFormContext<AssessmentFormData>();
  const duration = watch("preferredDuration");

  

  return (
    <>
      <StepLayout title="Commitment Level" subtitle="Real results take time. What is your preferred coaching duration?">
        <div className="flex flex-col gap-3 mt-6">
          {DURATION_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.id}
              id={opt.id}
              title={opt.title}
              description={opt.description}
              icon={opt.icon}
              selected={duration === opt.id}
              onClick={(id) => setValue("preferredDuration", id as any, { shouldValidate: true })}
              type="radio"
              recommended={opt.recommended}
            />
          ))}
        </div>
      </StepLayout>

    </>
  );
}
