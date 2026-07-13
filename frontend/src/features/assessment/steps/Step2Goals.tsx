import { useFormContext } from "react-hook-form";
import { Dumbbell, Activity, Flame, Move, ArrowUpRight } from "lucide-react";
import { StepLayout } from "../components/StepLayout";
import { OptionCard } from "../components/OptionCard";
import { AssessmentFormData } from "../schema";

interface Step2Props {
  
  
}

const GOAL_OPTIONS = [
  { id: "Build Strength", title: "Build Raw Strength", description: "Increase maximum power and muscular force", icon: Dumbbell, recommended: true },
  { id: "Learn Calisthenics", title: "Master Calisthenics", description: "Unlock skills like muscle-ups and levers", icon: ArrowUpRight, recommended: true },
  { id: "Lose Weight", title: "Burn Fat", description: "Drop body fat while maintaining muscle", icon: Flame },
  { id: "Improve Mobility", title: "Improve Mobility", description: "Increase flexibility and joint health", icon: Move },
  { id: "General Fitness", title: "General Health", description: "Feel better and improve daily energy", icon: Activity },
];

export function Step2Goals({  }: Step2Props) {
  const { watch, setValue } = useFormContext<AssessmentFormData>();
  const goals = watch("goals") || [];

  const toggleGoal = (id: string) => {
    if (goals.includes(id)) {
      setValue("goals", goals.filter(g => g !== id), { shouldValidate: true });
    } else {
      setValue("goals", [...goals, id], { shouldValidate: true });
    }
  };

  

  return (
    <>
      <StepLayout title="Primary Goals" subtitle="Select all that apply. This helps me tailor your trial session.">
        <div className="flex flex-col gap-3">
          {GOAL_OPTIONS.map((goal) => (
            <OptionCard
              key={goal.id}
              id={goal.id}
              title={goal.title}
              description={goal.description}
              icon={goal.icon}
              selected={goals.includes(goal.id)}
              onClick={toggleGoal}
              type="checkbox"
              recommended={goal.recommended}
            />
          ))}
        </div>
      </StepLayout>

    </>
  );
}
