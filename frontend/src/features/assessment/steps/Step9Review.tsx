import { useFormContext } from "react-hook-form";
import { Edit2 } from "lucide-react";
import { StepLayout } from "../components/StepLayout";
import { AssessmentFormData } from "../schema";

interface Step9Props {
  onEditStep: (step: number) => void;
}

export function Step9Review({ onEditStep }: Step9Props) {
  const { getValues } = useFormContext<AssessmentFormData>();
  const data = getValues();

  const fullName = data.name || "Athlete";
  
  // Extract initials (e.g. "Vansh Bahl" -> "VB")
  const nameParts = (data.name || "A").trim().split(" ");
  const initials = nameParts.length > 1 
    ? (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase()
    : (nameParts[0][0] + (nameParts[0][1] || "")).toUpperCase();

  const Pills = ({ items }: { items: string[] }) => (
    <div className="flex flex-wrap gap-1.5 justify-start sm:justify-end w-full">
      {items.map(item => (
        <span key={item} className="bg-white/5 border border-white/10 text-zinc-300 text-[11px] font-medium px-2.5 py-1 rounded-md whitespace-nowrap">
          {item}
        </span>
      ))}
    </div>
  );

  const InfoRow = ({ label, value, step }: { label: string, value: React.ReactNode, step: number }) => (
    <div className="flex items-start justify-between py-3.5 group/row border-b border-white/5 last:border-0">
      <div className="flex flex-col sm:flex-row sm:items-start justify-between flex-1 gap-2 sm:gap-4">
        <span className="text-[13px] text-zinc-500 font-medium pt-0.5 shrink-0">{label}</span>
        <div className="text-[14px] text-white font-medium text-left sm:text-right w-full sm:w-auto flex items-start justify-start sm:justify-end gap-2 group/value">
          <div className="flex-1 sm:flex-none">
            {value}
          </div>
          <button
            onClick={() => onEditStep(step)}
            className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/10 transition-colors opacity-100 sm:opacity-0 sm:group-hover/row:opacity-100 focus:opacity-100 mt-0.5"
            aria-label={`Edit ${label}`}
          >
            <Edit2 className="w-[11px] h-[11px]" />
          </button>
        </div>
      </div>
    </div>
  );

  const SectionHeader = ({ title }: { title: string }) => (
    <div className="pt-6 pb-2 mb-1">
      <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">{title}</h3>
    </div>
  );

  return (
    <StepLayout>
      <div className="pb-32 mt-4 max-w-lg mx-auto w-full">
        
        {/* Hero Section */}
        <div className="flex flex-col items-center justify-center text-center mb-10">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-center mb-6 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
            <span className="text-xl sm:text-2xl font-bold tracking-widest text-emerald-400 relative z-10">{initials}</span>
          </div>
          <h3 className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-500 mb-3">Your Fitness Profile</h3>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-3">{fullName}</h2>
          <p className="text-zinc-400 font-medium text-[14px] sm:text-[15px] max-w-sm mx-auto">
            Your personalized assessment is complete.
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-white/[0.02] border border-white/10 rounded-[24px] p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
          
          <SectionHeader title="About You" />
          <div className="flex flex-col">
            <InfoRow label="Name" value={data.name || "-"} step={8} />
            <InfoRow label="Phone" value={data.nationalNumber ? `${data.countryCode || ""} ${data.nationalNumber}` : "-"} step={8} />
            <InfoRow label="Instagram" value={data.instagram ? `@${data.instagram}` : "-"} step={8} />
            <InfoRow label="Location" value={data.city || "-"} step={8} />
          </div>

          <SectionHeader title="Training Profile" />
          <div className="flex flex-col">
            <InfoRow label="Age" value={`${data.age} Years`} step={1} />
            <InfoRow label="Gender" value={data.gender || "-"} step={1} />
            <InfoRow label="Body Metrics" value={`${data.heightCm} cm • ${data.weightKg} kg`} step={6} />
            <InfoRow label="Experience" value={data.previousExperience ? "Experienced" : "Beginner"} step={1} />
            <InfoRow label="Training Level" value={data.trainingLevel || "-"} step={2} />
            <InfoRow label="Goals" value={<Pills items={data.goals || []} />} step={3} />
            <InfoRow label="Equipment" value={<Pills items={data.equipment || ["None"]} />} step={4} />
          </div>

          <SectionHeader title="Availability" />
          <div className="flex flex-col">
            <InfoRow label="Commitment" value={data.preferredDuration || "-"} step={9} />
            <InfoRow label="Days" value={<Pills items={data.preferredDays || []} />} step={5} />
            <InfoRow label="Time" value={<Pills items={data.preferredTime || []} />} step={5} />
          </div>

        </div>

        {/* Reassurance Block */}
        <div className="mt-8 text-center px-4">
          <p className="text-[14px] font-medium text-zinc-300 mb-1">Everything looks good?</p>
          <p className="text-[12px] text-zinc-500 max-w-[280px] mx-auto leading-relaxed">
            You'll choose your preferred trial session immediately after secure payment.
          </p>
        </div>

      </div>
    </StepLayout>
  );
}
