import { z } from "zod";

export const assessmentSchema = z.object({
  // Step 1: Demographics
  age: z.number().min(16).max(100).optional(),
  gender: z.enum(["Male", "Female", "Other"]).optional(),
  previousExperience: z.boolean().optional(),

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
  whatsapp: z.string().regex(/^\+?[1-9]\d{1,14}$/, "Valid WhatsApp number is required").optional(),
  instagram: z.string().max(30).optional(),
  city: z.string().min(2, "City is required").max(100).optional(),

  // Step 8: Commitment
  preferredDuration: z.enum(["1 Month", "3 Months", "6 Months", "Long Term"]).optional(),
});

export type AssessmentFormData = z.infer<typeof assessmentSchema>;

// Default values to seed the form
export const defaultAssessmentValues: Partial<AssessmentFormData> = {
  age: 25, // default starting point for wheel picker
  heightCm: 175,
  weightKg: 75,
  goals: [],
  equipment: [],
  preferredDays: [],
  preferredTime: [],
  currentRoutine: "",
  injuries: "",
  name: "",
  whatsapp: "",
  instagram: "",
  city: "",
};
