import { useFormContext } from "react-hook-form";
import { StepLayout } from "../components/StepLayout";
import { WheelPicker } from "../components/WheelPicker";
import { AssessmentFormData } from "../schema";

interface Step5Props {
  
  
}

export function Step5Metrics({  }: Step5Props) {
  const { watch, setValue } = useFormContext<AssessmentFormData>();
  const heightCm = watch("heightCm");
  const weightKg = watch("weightKg");

  

  return (
    <>
      <StepLayout title="Body Metrics" subtitle="Used to establish your baseline and tailor programming.">
        <div className="space-y-12 mt-6">
          
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 text-center">Height</h3>
            <div className="bg-white/5 rounded-3xl border border-white/10 p-2">
              <WheelPicker 
                min={120} 
                max={250} 
                value={heightCm ?? 175} 
                onChange={(val) => setValue("heightCm", val, { shouldValidate: true })} 
                suffix="cm"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 text-center">Weight</h3>
            <div className="bg-white/5 rounded-3xl border border-white/10 p-2">
              <WheelPicker 
                min={40} 
                max={200} 
                value={weightKg ?? 75} 
                onChange={(val) => setValue("weightKg", val, { shouldValidate: true })} 
                suffix="kg"
              />
            </div>
          </div>

        </div>
      </StepLayout>

    </>
  );
}
