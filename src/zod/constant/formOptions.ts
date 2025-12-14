import { Control, FieldErrors, UseFormRegister } from "react-hook-form";
import { BootcampData } from "../schema";

export const genderOptions = ["Male", "Female", "Other"] as const;
export const occupationOptions = ["Student", "Job-Seeker", "Working Professional", "Other"] as const;
export const skillOptions = ["Excel", "SQL", "Power Bi", "Tableau", "Data Storytelling", "Other"] as const;
export const yesNoOptions = ["Yes", "No"] as const;

export type FormProps = {
  register: UseFormRegister<BootcampData>;
  errors: FieldErrors<BootcampData>;
  control?: Control<BootcampData>
}