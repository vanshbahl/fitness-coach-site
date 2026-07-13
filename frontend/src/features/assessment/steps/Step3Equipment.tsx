import { useFormContext } from "react-hook-form";
import { StepLayout } from "../components/StepLayout";
import { SelectionChip } from "../components/SelectionChip";
import { AssessmentFormData } from "../schema";

interface Step3Props {
  
  
}

const EQUIPMENT_OPTIONS = [
  "Pull-up Bar",
  "Resistance Bands",
  "Gym Membership",
  "Rings",
  "Parallettes",
  "Dumbbells",
  "Kettlebells",
  "None (Bodyweight Only)"
];

export function Step3Equipment({  }: Step3Props) {
  const { watch, setValue } = useFormContext<AssessmentFormData>();
  const equipment = watch("equipment") || [];

  const toggleEquipment = (id: string) => {
    if (id === "None (Bodyweight Only)") {
      // If turning ON None, clear everything else. If turning OFF, just empty array.
      if (equipment.includes(id)) {
        setValue("equipment", [], { shouldValidate: true });
      } else {
        setValue("equipment", ["None (Bodyweight Only)"], { shouldValidate: true });
      }
      return;
    }

    // For any other equipment, make sure "None" is removed first
    let newEquipment = equipment.filter(e => e !== "None (Bodyweight Only)");

    if (newEquipment.includes(id)) {
      setValue("equipment", newEquipment.filter(e => e !== id), { shouldValidate: true });
    } else {
      setValue("equipment", [...newEquipment, id], { shouldValidate: true });
    }
  };

  

  return (
    <>
      <StepLayout title="Available Equipment" subtitle="What do you have consistent access to? Select all that apply.">
        <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto mt-6">
          {EQUIPMENT_OPTIONS.map((item) => (
            <SelectionChip
              key={item}
              id={item}
              label={item}
              selected={equipment.includes(item)}
              onClick={toggleEquipment}
            />
          ))}
        </div>
      </StepLayout>

    </>
  );
}
