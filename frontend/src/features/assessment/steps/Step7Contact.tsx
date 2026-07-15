import { useFormContext } from "react-hook-form";
import { StepLayout } from "../components/StepLayout";
import { PhoneInput } from "@/components/forms/PhoneInput";
import { AssessmentFormData } from "../schema";

interface Step7Props {
  
  
}

export function Step7Contact({  }: Step7Props) {
  const { register, watch, setValue, formState: { errors } } = useFormContext<AssessmentFormData>();
  
  const country = watch("country") || "IN";
  const countryCode = watch("countryCode") || "+91";
  const nationalNumber = watch("nationalNumber") || "";

  return (
    <>
      <StepLayout title="Contact Info" subtitle="Almost done. How do we reach you?">
        <div className="space-y-6 mt-6 max-w-sm mx-auto w-full">
          
          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 pl-1">Full Name *</label>
            <input 
              type="text"
              {...register("name")}
              placeholder="e.g. John Doe"
              className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
            />
            {errors.name && <span className="text-red-400 text-xs pl-1">{errors.name.message}</span>}
          </div>

          <PhoneInput
            countryValue={country}
            countryCodeValue={countryCode}
            nationalNumberValue={nationalNumber}
            onCountryChange={(val) => setValue("country", val, { shouldValidate: true })}
            onCountryCodeChange={(val) => setValue("countryCode", val, { shouldValidate: true })}
            onNationalNumberChange={(val) => setValue("nationalNumber", val, { shouldValidate: true })}
            error={errors.nationalNumber?.message}
          />

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 pl-1">Instagram Handle</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500 font-semibold">@</span>
              <input 
                type="text"
                {...register("instagram", {
                  setValueAs: (val) => val.replace('@', '') // Auto strip @
                })}
                placeholder="username"
                className="w-full h-14 bg-white/5 border border-white/10 rounded-xl pl-9 pr-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[11px] font-bold uppercase tracking-widest text-zinc-500 pl-1">City *</label>
            <input 
              type="text"
              {...register("city")}
              placeholder="e.g. Mumbai"
              className="w-full h-14 bg-white/5 border border-white/10 rounded-xl px-4 text-white placeholder-zinc-600 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all"
            />
          </div>

        </div>
      </StepLayout>

    </>
  );
}
