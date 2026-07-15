import { z } from "zod";
import { isValidPhoneNumber } from "libphonenumber-js/max";

export const assessmentSchema = z.object({
  // Step 1: Demographics
  age: z.number().min(16).max(100).optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  previousExperience: z.boolean().optional(),
  trainingLevel: z.enum(["Complete Beginner", "Basic Beginner", "Advanced Beginner", "Intermediate", "Advanced"]).optional(),

  // Step 2: Goals
  goals: z.array(z.string()).min(1, "Please select at least one goal").default([]),

  // Step 3: Equipment
  equipment: z.array(z.string()).min(1, "Please select at least one option").default([]),

  // Step 4: Availability
  preferredDays: z.array(z.string()).min(1, "Select preferred days").default([]),
  preferredTime: z.array(z.string()).min(1, "Select preferred times").default([]),

  // Step 5: Metrics
  heightCm: z.number().min(120).max(250).optional(),
  weightKg: z.number().min(40).max(200).optional(),

  // Step 6: Medical
  currentRoutine: z.string().max(500).optional(),
  injuries: z.string().max(500).optional(),

  // Step 7: Contact
  name: z.string().min(2, "Name is required").max(100).optional(),
  country: z.string().min(2).default("IN"),
  countryCode: z.string().min(1).default("+91"),
  nationalNumber: z.string().optional(),
  instagram: z.string().max(30).optional(),
  city: z.string().min(2, "City is required").max(100).optional(),

  // Step 8: Commitment
  preferredDuration: z.enum(["1 Month", "3 Months", "6 Months", "Long Term"]).optional(),
}).superRefine((data, ctx) => {
  // Complex validation for phone number
  if (data.nationalNumber) {
    if (data.country === "IN" && !/^\d{10}$/.test(data.nationalNumber)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Indian numbers must be exactly 10 digits",
        path: ["nationalNumber"]
      });
    } else {
      // For all countries (including IN for standard checks, though IN is covered above)
      // We pass the country code (e.g. IN) to libphonenumber-js
      const isValid = isValidPhoneNumber(data.nationalNumber, data.country as any);
      if (!isValid) {
        // Fallback generic validation if libphonenumber rejects but it's a 6-15 digit number
        if (!/^\d{6,15}$/.test(data.nationalNumber)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Invalid phone number format",
            path: ["nationalNumber"]
          });
        }
      }
    }
  } else if (data.name) {
    // If they provided a name (meaning they are on or past Step 7), they MUST provide a phone number
    // This maintains the previous `.optional()` behavior before Step 7
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Phone number is required",
      path: ["nationalNumber"]
    });
  }
});

export type AssessmentFormData = z.infer<typeof assessmentSchema>;

// Default values to seed the form
export const defaultAssessmentValues: Partial<AssessmentFormData> = {
  age: 25, // default starting point for wheel picker
  heightCm: 175,
  weightKg: 75,
  trainingLevel: undefined,
  goals: [],
  equipment: [],
  preferredDays: [],
  preferredTime: [],
  currentRoutine: "",
  injuries: "",
  name: "",
  country: "IN",
  countryCode: "+91",
  nationalNumber: "",
  instagram: "",
  city: "",
};
