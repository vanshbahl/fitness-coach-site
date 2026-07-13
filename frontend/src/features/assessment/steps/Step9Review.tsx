import { useFormContext } from "react-hook-form";
import { Edit2 } from "lucide-react";
import { StepLayout } from "../components/StepLayout";
import { AssessmentFormData } from "../schema";

interface Step9Props {
  
  
  onEditStep: (step: number) => void;
}

export function Step9Review({   onEditStep }: Step9Props) {
  const { getValues } = useFormContext<AssessmentFormData>();
  const data = getValues();

  const Section = ({ title, children, step }: { title: string, children: React.ReactNode, step: number }) => (
    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 relative group overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      <div className="flex justify-between items-start mb-4 relative z-10">
        <h3 className="text-xs font-bold uppercase tracking-widest text-zinc-500">{title}</h3>
        <button 
          onClick={() => onEditStep(step)}
          className="text-zinc-400 hover:text-white transition-colors p-1"
          aria-label={`Edit ${title}`}
        >
          <Edit2 className="w-4 h-4" />
        </button>
      </div>
      <div className="relative z-10 text-white font-medium">
        {children}
      </div>
    </div>
  );

  return (
    <>
      <StepLayout title="Your Athlete Profile" subtitle="Review your information before proceeding to booking.">
        <div className="space-y-4 pb-32 mt-6 max-w-lg mx-auto w-full">
          
          <Section title="Demographics" step={1}>
            <p className="text-xl">{data.name}</p>
            <p className="text-zinc-400 mt-1">{data.age} Years • {data.gender} • {data.city}</p>
          </Section>

          <Section title="Body Metrics" step={5}>
            <div className="flex gap-8">
              <div>
                <span className="text-zinc-500 text-sm block">Height</span>
                <span className="text-xl">{data.heightCm} cm</span>
              </div>
              <div>
                <span className="text-zinc-500 text-sm block">Weight</span>
                <span className="text-xl">{data.weightKg} kg</span>
              </div>
            </div>
          </Section>

          <Section title="Goals & Equipment" step={2}>
            <div className="flex flex-wrap gap-2 mb-4">
              {data.goals?.map(g => (
                <span key={g} className="bg-emerald-500/10 text-emerald-400 text-xs px-3 py-1 rounded-full">{g}</span>
              ))}
            </div>
            <p className="text-sm text-zinc-400">
              <span className="text-zinc-300">Equipment:</span> {data.equipment?.join(", ") || "None"}
            </p>
          </Section>

          <Section title="Availability" step={4}>
            <p className="text-sm"><span className="text-zinc-500">Days:</span> {data.preferredDays?.join(", ")}</p>
            <p className="text-sm mt-1"><span className="text-zinc-500">Time:</span> {data.preferredTime?.join(", ")}</p>
          </Section>

          <Section title="Commitment" step={8}>
            <p className="text-lg text-emerald-400">{data.preferredDuration}</p>
          </Section>

        </div>
      </StepLayout>

    </>
  );
}
