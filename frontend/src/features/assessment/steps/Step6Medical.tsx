import { useFormContext } from "react-hook-form";
import { StepLayout } from "../components/StepLayout";
import { AssessmentFormData } from "../schema";

interface Step6Props {
  
  
}

export function Step6Medical({  }: Step6Props) {
  const { register } = useFormContext<AssessmentFormData>();

  // These are optional in schema, but we'll consider it valid if they just see the page
  

  return (
    <>
      <StepLayout title="Medical & Background" subtitle="Help me understand your body's current state. Leave blank if not applicable.">
        <div className="space-y-8 mt-6 max-w-sm mx-auto w-full">
          
          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-500 pl-1">Current Routine</label>
            <textarea 
              {...register("currentRoutine")}
              placeholder="e.g. 3 days a week Push/Pull/Legs..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all min-h-[120px] resize-none"
            />
          </div>

          <div className="space-y-3">
            <label className="text-sm font-bold uppercase tracking-widest text-zinc-500 pl-1">Past or Current Injuries</label>
            <textarea 
              {...register("injuries")}
              placeholder="e.g. Lower back pain, shoulder impingement..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:ring-1 focus:ring-white/30 transition-all min-h-[120px] resize-none"
            />
          </div>

        </div>
      </StepLayout>

    </>
  );
}
