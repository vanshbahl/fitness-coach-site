import { useFormContext } from "react-hook-form";
import { StepLayout } from "../components/StepLayout";
import { WheelPicker } from "../components/WheelPicker";
import { SegmentedControl } from "../components/SegmentedControl";
import { OptionCard } from "../components/OptionCard";
import { AssessmentFormData } from "../schema";

export function Step1Demographics() {
  const { watch, setValue } = useFormContext<AssessmentFormData>();
  const age = watch("age");
  const gender = watch("gender");
  const experience = watch("previousExperience");

  

  return (
    <>
      <StepLayout title="The Basics" subtitle="Let's start with your demographics and general experience level.">
        <div className="space-y-12">
          
          {/* Age Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 text-center">Your Age</h3>
            <div className="bg-white/5 rounded-3xl border border-white/10 p-2">
              <WheelPicker 
                min={16} 
                max={100} 
                value={age ?? 25} 
                onChange={(val) => setValue("age", val, { shouldValidate: true })} 
                suffix="years"
              />
            </div>
          </div>

          {/* Gender Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 text-center">Gender</h3>
            <SegmentedControl 
              options={["Male", "Female", "Other"]}
              value={gender}
              onChange={(val) => setValue("gender", val as any, { shouldValidate: true })}
            />
          </div>

          {/* Experience Section */}
          <div className="space-y-6">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 text-center">Previous Training Experience?</h3>
            <div className="flex gap-4">
              <OptionCard 
                id="yes"
                title="Yes"
                selected={experience === true}
                onClick={() => setValue("previousExperience", true, { shouldValidate: true })}
              />
              <OptionCard 
                id="no"
                title="No"
                selected={experience === false}
                onClick={() => setValue("previousExperience", false, { shouldValidate: true })}
              />
            </div>
          </div>
        </div>
      </StepLayout>

    </>
  );
}
