// lib/types/clerk.ts
// Shared types for Clerk error handling across your application

export interface ClerkError {
  errors?: ClerkErrorDetail[];
  clerkError?: boolean;
  status?: number;
}

export interface ClerkErrorDetail {
  message: string;
  longMessage?: string;
  code?: string;
  meta?: {
    paramName?: string;
    sessionId?: string;
  };
}

export type ClerkErrorCode =
  | "form_identifier_exists"
  | "form_password_incorrect"
  | "form_password_pwned"
  | "form_param_nil"
  | "form_password_length_too_short"
  | "form_identifier_not_found"
  | "session_exists"
  | "not_allowed_access"
  | "verification_expired"
  | "verification_failed";

// Helper function to extract user-friendly error messages
export function getClerkErrorMessage(err: unknown): string {
  if (!err || typeof err !== "object") {
    return "An unexpected error occurred";
  }

  const clerkError = err as ClerkError;

  if (clerkError.errors && clerkError.errors.length > 0) {
    const error = clerkError.errors[0];
    
    // Return user-friendly messages for common error codes
    switch (error.code) {
      case "form_identifier_exists":
        return "An account with this email already exists";
      case "form_password_incorrect":
        return "Invalid email or password";
      case "form_password_pwned":
        return "This password has been compromised. Please choose a different one";
      case "form_password_length_too_short":
        return "Password must be at least 8 characters long";
      case "form_identifier_not_found":
        return "No account found with this email";
      case "verification_expired":
        return "Verification link has expired. Please request a new one";
      case "verification_failed":
        return "Verification failed. Please try again";
      default:
        return error.longMessage || error.message || "An error occurred";
    }
  }

  return "Something went wrong. Please try again";
}

// Type guard to check if error is a Clerk error
export function isClerkError(err: unknown): err is ClerkError {
  return (
    typeof err === "object" &&
    err !== null &&
    "errors" in err &&
    Array.isArray((err as ClerkError).errors)
  );
}