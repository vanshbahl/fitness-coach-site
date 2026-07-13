import { useFormContext } from "react-hook-form";
import { StepLayout } from "../components/StepLayout";
import { SelectionChip } from "../components/SelectionChip";
import { AssessmentFormData } from "../schema";

interface Step4Props {
  
  
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const TIMES = ["Morning", "Afternoon", "Evening", "Night"];

export function Step4Availability({  }: Step4Props) {
  const { watch, setValue } = useFormContext<AssessmentFormData>();
  const preferredDays = watch("preferredDays") || [];
  const preferredTime = watch("preferredTime") || [];

  const toggleDay = (day: string) => {
    if (preferredDays.includes(day)) {
      setValue("preferredDays", preferredDays.filter(d => d !== day), { shouldValidate: true });
    } else {
      setValue("preferredDays", [...preferredDays, day], { shouldValidate: true });
    }
  };

  const toggleTime = (time: string) => {
    if (preferredTime.includes(time)) {
      setValue("preferredTime", preferredTime.filter(t => t !== time), { shouldValidate: true });
    } else {
      setValue("preferredTime", [...preferredTime, time], { shouldValidate: true });
    }
  };

  

  return (
    <>
      <StepLayout title="Your Availability" subtitle="When do you typically train?">
        <div className="space-y-10 mt-6">
          
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 text-center">Preferred Days</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-sm mx-auto">
              {DAYS.map((day) => (
                <SelectionChip key={day} id={day} label={day} selected={preferredDays.includes(day)} onClick={toggleDay} />
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500 text-center">Preferred Time</h3>
            <div className="flex flex-wrap justify-center gap-3 max-w-sm mx-auto">
              {TIMES.map((time) => (
                <SelectionChip key={time} id={time} label={time} selected={preferredTime.includes(time)} onClick={toggleTime} />
              ))}
            </div>
          </div>

        </div>
      </StepLayout>

    </>
  );
}
