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

export type departmentProps = {
  _id: string;
  department: string;
};

export type jobProps = {
  _id: string;
  jobTitle: string;
  department: departmentProps;
  jobType:string;
  jobDescription: string;
  requirements: string[];
  applicationLink: string;
};

export type articlesProp = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  category: string;
  readTime: string;
  date: string;
  coverImage: string;
};
