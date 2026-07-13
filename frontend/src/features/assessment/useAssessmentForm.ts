import { useForm, UseFormReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { assessmentSchema, AssessmentFormData, defaultAssessmentValues } from "./schema";

const STORAGE_KEY = "qs_assessment_draft";

export function useAssessmentForm(): UseFormReturn<AssessmentFormData> & { isLoaded: boolean, clearAssessmentData: () => void } {
  const [isLoaded, setIsLoaded] = useState(false);

  const methods = useForm<AssessmentFormData>({
    resolver: zodResolver(assessmentSchema) as any,
    defaultValues: defaultAssessmentValues,
    mode: "onChange",
  });

  // Load from local storage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Reset form with saved values merged over defaults
        methods.reset({ ...defaultAssessmentValues, ...parsed });
      }
    } catch (error) {
      console.error("Failed to load assessment draft:", error);
    } finally {
      setIsLoaded(true);
    }
  }, [methods.reset]); // Only run once on mount, reset is stable

  // Auto-save on changes
  useEffect(() => {
    if (!isLoaded) return;
    const subscription = methods.watch((value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value));
    });
    return () => subscription.unsubscribe();
  }, [methods.watch, isLoaded]);

  const clearAssessmentData = () => {
    localStorage.removeItem(STORAGE_KEY);
    methods.reset(defaultAssessmentValues);
  };

  return { ...methods, isLoaded, clearAssessmentData };
}
