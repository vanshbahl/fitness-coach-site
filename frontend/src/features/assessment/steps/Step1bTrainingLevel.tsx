import { useFormContext } from "react-hook-form";
import { Activity } from "lucide-react";
import { StepLayout } from "../components/StepLayout";
import { OptionCard } from "../components/OptionCard";
import { AssessmentFormData } from "../schema";

const TRAINING_LEVELS = [
  { 
    id: "Complete Beginner", 
    title: "Complete Beginner", 
    description: "No prior training experience" 
  },
  { 
    id: "Basic Beginner", 
    title: "Basic Beginner", 
    description: "Can perform basic movements like wall push-ups, incline push-ups, or a plank" 
  },
  { 
    id: "Advanced Beginner", 
    title: "Advanced Beginner", 
    description: "Can perform push-ups, bodyweight squats, and bar hangs" 
  },
  { 
    id: "Intermediate", 
    title: "Intermediate", 
    description: "Can perform pull-ups, dips, L-sits, or similar bodyweight skills" 
  },
  { 
    id: "Advanced", 
    title: "Advanced", 
    description: "Training advanced calisthenics skills such as handstands, muscle-ups, front lever, planche progressions, or 90° holds" 
  },
];

export function Step1bTrainingLevel() {
  const { watch, setValue } = useFormContext<AssessmentFormData>();
  const trainingLevel = watch("trainingLevel");

  return (
    <StepLayout
      title="What best describes your current training level?"
      subtitle="This helps us personalize your trial session and recommend the right starting point."
    >
      <div className="flex flex-col gap-3 max-w-lg mx-auto w-full">
        {TRAINING_LEVELS.map((level) => (
          <OptionCard
            key={level.id}
            id={level.id}
            title={level.title}
            description={level.description}
            icon={Activity}
            selected={trainingLevel === level.id}
            onClick={() => setValue("trainingLevel", level.id as AssessmentFormData["trainingLevel"], { shouldValidate: true })}
          />
        ))}
      </div>
    </StepLayout>
  );
}
