import * as z from "zod";

const phoneRegex = /^\+?[0-9]\d{1,14}$/;
export const genderEnum = z.enum(["Male", "Female", "Other", ""]);
export const occupationEnum = z.enum([
  "Student",
  "Job-Seeker",
  "Working Professional",
  "Other",
  "",
]);
export const answerEnum = z.enum(["Yes", "No", ""]);
export const skillEnum = z.enum([
  "Excel",
  "SQL",
  "Power Bi",
  "Tableau",
  "Data Storytelling",
  "Other",
  "",
]);

export const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z
    .string()
    .min(2, "Company Name must be at least 2 characters")
    .or(z.literal(""))
    .optional(),
  message: z.string().min(2, "Your Message must be at least 20 characters"),
});

export type ContactFormData = z.infer<typeof contactSchema>;

export const consultationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  company: z
    .string()
    .min(2, "Company Name must be at least 2 characters")
    .or(z.literal(""))
    .optional(),
  challenge: z.string().min(2, "Your Message must be at least 20 characters"),
});
export type ConsultationFormData = z.infer<typeof consultationSchema>;

export const researchSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  business: z.string().optional().or(z.literal("")),
  budget: z.string().optional().or(z.literal("")),
  research: z.string().min(20, "Research needs must be at least 20 characters"),
  timeline: z.string().optional().or(z.literal("")),
});

export type ResearchFormData = z.infer<typeof researchSchema>;

export const applicationSchema = z.object({
  careerId: z.string().min(1, "Career ID is required"),
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits"),
  experience: z
    .number()
    .min(0, "Experience cannot be negative")
    .max(50, "Experience cannot exceed 50 years"),
  skills: z
    .string()
    .min(10, "Please provide at least 10 characters about your skills"),
  portfolio: z
    .string()
    .url("Please enter a valid URL")
    .optional()
    .or(z.literal("")),
  resumeUrl: z.string().url("Resume is required"),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;

export const bootcampSchema = z.object({
  // Step 1: Personal Information
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNo: z
    .string()
    .min(10, "Phone number must be at least 10 digits")
    .regex(phoneRegex, "Invalid phone number format"),
  gender: genderEnum,
  country: z.string().min(1, "Country is required"),

  // Step 2: Educational & Professional Background
  occupation: occupationEnum,
  education: z.string().min(2, "Education must be at least 2 characters"),
  experience: answerEnum,
  interest: z.string().min(2, "Interest must be at least 2 characters"),
  skillOfInterest: z
    .array(skillEnum)
    .min(1, "Please select at least one skill"),

  // Step 3: Bootcamp-Specific Information
  sessionAttendance: answerEnum,
  classHolding: answerEnum,
  classTiming: answerEnum,
  connection: answerEnum,
  device: answerEnum,
  heardAboutUs: z.string().min(1, "Please tell us where you heard about us"),

  // Step 4: Proof of Payment
  additionalInfo: z.string().optional(),
  proofOfPayment: z.string().url("Please upload a valid proof of payment"),
});

export type BootcampData = z.infer<typeof bootcampSchema>;
