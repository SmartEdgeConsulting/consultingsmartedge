import { LucideIcon } from "lucide-react";

export type serviceProps = {
  id?: number;
  icon: LucideIcon;
  title: string;
  description: string;
  button: string;
};

export type processProps = {
  id: number;
  title: string;
  description: string;
};

export type teamsProps = {
  id: number;
  name: string;
  role: string;
  bio: string;
  skills: string[];
  avatar: string;
};

export type contactInfoProps = {
  id: number;
  icon: LucideIcon;
  label: string;
  info: string;
  description: string;
};

export type Job = {
  id: number;
  title: string;
  department: string;
  jobType:
    | "Full-time"
    | "Part-time"
    | "Contract"
    | "Internship"
    | "Remote"
    | "Hybrid"
    | "On-site";
  salaryRange: { min: number; max: number; currency: string };
  description: string;
  requirements: string[];
  applyLink: string;
};
