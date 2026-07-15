import { AxiosError } from "axios";

export interface ParsedApiError {
  title: string;
  message: string;
  field?: string;
  step?: number;
  focusField?: string;
  severity: "error" | "warning" | "info";
  retryable: boolean;
}

export function parseApiError(error: any): ParsedApiError {
  // Offline check
  if (!navigator.onLine) {
    return {
      title: "Offline",
      message: "No internet connection. Please check your connection and try again.",
      severity: "warning",
      retryable: true
    };
  }

  // Not an Axios error
  if (!error?.isAxiosError) {
    return {
      title: "Error",
      message: error?.message || "An unexpected error occurred.",
      severity: "error",
      retryable: true
    };
  }

  const axiosError = error as AxiosError<any>;

  if (axiosError.code === "ECONNABORTED") {
    return {
      title: "Timeout",
      message: "The server took too long to respond. Please try again.",
      severity: "warning",
      retryable: true
    };
  }

  if (!axiosError.response) {
    return {
      title: "Network Error",
      message: "Could not connect to the server. Please check your connection.",
      severity: "warning",
      retryable: true
    };
  }

  const status = axiosError.response.status;
  const data = axiosError.response.data;

  // 422 Validation Error from FastAPI
  if (status === 422 && data?.detail && Array.isArray(data.detail)) {
    const firstError = data.detail[0];
    const field = firstError.loc?.[firstError.loc.length - 1]; // e.g., "national_number"

    let message = "Please review the highlighted information.";
    let step: number | undefined;
    let focusField = field;

    if (field === "national_number") {
      message = "This phone number doesn't match the selected country.";
      step = 8; // Step7Contact is index 8 in AssessmentWizard
      focusField = "nationalNumber";
    } else if (field === "country") {
      message = "Please select a valid country.";
      step = 8;
    } else if (field === "country_code") {
      message = "Please select a valid country code.";
      step = 8;
      focusField = "countryCode";
    } else if (field === "name") {
      message = "Please enter your full name.";
      step = 8;
    } else if (field === "instagram") {
      message = "Please enter a valid Instagram handle.";
      step = 8;
    } else if (field === "city") {
      message = "Please enter your city.";
      step = 8;
    } else if (field === "age" || field === "gender" || field === "previous_experience") {
      step = 1;
      if (field === "previous_experience") focusField = "previousExperience";
    } else if (field === "training_level") {
      step = 2;
      focusField = "trainingLevel";
    } else if (field === "goals") {
      step = 3;
    } else if (field === "equipment_available") {
      step = 4;
      focusField = "equipment";
    } else if (field === "preferred_days" || field === "preferred_times" || field === "timezone") {
      step = 5;
      if (field === "preferred_days") focusField = "preferredDays";
      if (field === "preferred_times") focusField = "preferredTime";
    } else if (field === "height_cm" || field === "weight_kg") {
      step = 6;
      focusField = field === "height_cm" ? "heightCm" : "weightKg";
    } else if (field === "current_routine" || field === "injuries") {
      step = 7;
      if (field === "current_routine") focusField = "currentRoutine";
    } else if (field === "preferred_duration") {
      step = 9;
      focusField = "preferredDuration";
    }

    return {
      title: "Validation Error",
      message,
      field,
      step,
      focusField,
      severity: "warning",
      retryable: false
    };
  }

  // Other Status Codes
  switch (status) {
    case 400:
      return {
        title: "Invalid Request",
        message: data?.detail || "The request was invalid.",
        severity: "error",
        retryable: false
      };
    case 401:
    case 403:
      return {
        title: "Unauthorized",
        message: "You don't have permission to perform this action.",
        severity: "error",
        retryable: false
      };
    case 404:
      return {
        title: "Not Found",
        message: "The requested resource was not found.",
        severity: "error",
        retryable: false
      };
    case 429:
      return {
        title: "Rate Limited",
        message: "Too many requests. Please slow down and try again.",
        severity: "warning",
        retryable: true
      };
    case 500:
    case 502:
    case 503:
    case 504:
      return {
        title: "Server Error",
        message: "We're experiencing technical difficulties. Please try again later.",
        severity: "error",
        retryable: true
      };
    default:
      return {
        title: "Error",
        message: data?.detail || data?.error || "An unexpected error occurred.",
        severity: "error",
        retryable: true
      };
  }
}
