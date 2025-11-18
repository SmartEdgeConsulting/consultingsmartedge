import {
  Database,
  ChartCandlestick,
  Brain,
  Gauge,
  BookOpen,
  Compass,
  Lightbulb,
  Users,
  Mail,
  Phone,
  MapPin,
  Clock7,
} from "lucide-react";
import {
  contactInfoProps,
  processProps,
  serviceProps,
  teamsProps,
} from "../types";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
} from "./socialIcons";

export const servicesData: serviceProps[] = [
  {
    id: 1,
    icon: ChartCandlestick,
    title: "Market Research & Strategy",
    description:
      "Gain clarity on your market, customers, and opportunities through research that drives confident decisions.",
    button: "Learn More",
  },
  {
    id: 2,
    icon: Database,
    title: "Data Analytics & Business Intelligence",
    description:
      "Turn data into actionable insights with dashboards, reports, and predictive models tailored to your business.",
    button: "Request Demo",
  },
  {
    id: 3,
    icon: Brain,
    title: "Intelligence Automation",
    description:
      "Automate repetitive analysis, reporting, and decision processes saving you time while improving accuracy.",
    button: "See How It Works",
  },
  {
    id: 4,
    icon: Gauge,
    title: "Quality Engineering",
    description:
      "Ensure data accuracy, consistency, and reliability the foundation of every smart decision.",
    button: "Explore Solutions",
  },
  {
    id: 5,
    icon: BookOpen,
    title: "Learning & Development",
    description:
      "Join our DataEdge Bootcamp and corporate training programs to empower your team with the skills that drive results.",
    button: "Join the Next Bootcamp",
  },
];

export const services: serviceProps[] = [
  {
    id: 1,
    icon: ChartCandlestick,
    title: "Market & Investment Research",
    description:
      "Understand your market, customers, and competition with research-driven intelligence that fuels strategy.",
    button: "Request a Research Proposal",
  },
  {
    id: 2,
    icon: Database,
    title: "Data Analytics & Business Intelligence",
    description:
      "Build custom dashboards and data pipelines that turn numbers into narratives.",
    button: "Schedule a Demo",
  },
  {
    id: 3,
    icon: Brain,
    title: "Intelligence Automation",
    description:
      "Free your team from manual reporting. Automate analytics workflows, alerts, and insights.",
    button: "See Automation in Action",
  },
  {
    id: 4,
    icon: Gauge,
    title: "Quality Engineering",
    description:
      "Ensure your data systems deliver reliable, consistent, and validated outputs.",
    button: "Talk to a Data Engineer",
  },
  {
    id: 5,
    icon: BookOpen,
    title: "Learning & Development",
    description:
      "Upskill yourself or your team through SmartEdge Bootcamps, training programs, and corporate workshops.",
    button: "Join the DataEdge  Bootcamp",
  },
];

export const process: processProps[] = [
  {
    id: 1,
    title: "Discover",
    description: "We understand your goals, challenges, and data needs.",
  },
  {
    id: 2,
    title: "Analyze",
    description: "We use analytics and AI to uncover patterns and insights.",
  },
  {
    id: 3,
    title: "Transform",
    description: "We turn insights into decisions that improve performance.",
  },
  {
    id: 4,
    title: "Automate",
    description: "We implement systems that sustain continuous growth.",
  },
];

export const values = [
  {
    id: 1,
    icon: Compass,
    title: "Integrity and Clarity",
  },
  {
    id: 2,
    icon: Lightbulb,
    title: "Innovation and Impact",
  },
  {
    id: 3,
    icon: Users,
    title: "Collaboration and Growth",
  },
];

export const teams: teamsProps[] = [
  {
    id: 1,
    name: "Dr. Sarah Chen",
    role: "Chief Data Scientist",
    bio: "PhD in Machine Learning with 12+ years experience in predictive analytics and AI solutions.",
    skills: ["Machine Learning", "Predictive Analytics", "AI Solutions"],
    avatar: "",
  },
  {
    id: 2,
    name: "Dr. Sarah Chen",
    role: "Chief Data Scientist",
    bio: "PhD in Machine Learning with 12+ years experience in predictive analytics and AI solutions.",
    skills: ["Machine Learning", "Predictive Analytics", "Cloud Architecture"],
    avatar: "",
  },
  {
    id: 3,
    name: "David Kim",
    role: "Analytics Consultant",
    bio: "Expert in building scalable data infrastructures and real-time analytics pipelines.",
    skills: ["Dashboard Design", "Change Management", "AI Solutions"],
    avatar: "",
  },
  {
    id: 4,
    name: "Emily Thompson",
    role: "Business Intelligence Analyst",
    bio: "PhD in Machine Learning with 12+ years experience in predictive analytics and AI solutions.",
    skills: ["Machine Learning", "Dashboard Design", "AI Solutions"],
    avatar: "",
  },
];

export const contactInfo: contactInfoProps[] = [
  {
    id: 1,
    icon: Mail,
    label: "Email",
    info: "hello@smartedge-analytics.com",
    description: "Get in touch with our support team",
  },
  {
    id: 2,
    icon: Phone,
    label: "Phone",
    info: "+1 (555) 123-4567",
    description: "Mon-Fri from 8am to 5pm",
  },
  {
    id: 3,
    icon: MapPin,
    label: "Office",
    info: "123 Data Drive, Analytics City, AC 12345",
    description: "Come say hello at our office",
  },
  {
    id: 4,
    icon: Clock7,
    label: "Working Hours",
    info: "Mon-Fri: 8:00 AM - 6:00 PM",
    description: "Weekend support available",
  },
];

export const socials = [
  {
    id: 1,
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/smartedge-analytics",
    icon: LinkedInIcon,
  },
  {
    id: 2,
    name: "Facebook",
    href: "https://www.linkedin.com/company/smartedge-analytics",
    icon: FacebookIcon,
  },
  {
    id: 3,
    name: "Instagram",
    href: "https://www.linkedin.com/company/smartedge-analytics",
    icon: InstagramIcon,
  },
  {
    id: 4,
    name: "Youtube",
    href: "https://www.linkedin.com/company/smartedge-analytics",
    icon: YouTubeIcon,
  },
];

export const reasons = [
  {
    id: 1,
    text: "Be part of a forward-thinking team building data-driven solutions that make real impact.",
  },
  {
    id: 2,
    text: "We invest in your development with continuous learning, mentorship, and leadership opportunities.",
  },
  {
    id: 3,
    text: "Work with passionate professionals who value teamwork and support each other’s success.",
  },
  {
    id: 4,
    text: "Access advanced tools and modern tech stacks that enable you to do your best work.",
  },
  {
    id: 5,
    text: "Your contributions directly help shape smarter decisions for businesses and communities.",
  },
];

export const blogArticles = [
  {
    id: 1,
    title: "How to Write a Job-Winning Resume in 2025",
    slug: "job-winning-resume-2025",
    excerpt:
      "Learn the exact structure, keywords, and design employers are looking for in modern resumes.",
    content:
      "A detailed guide on building a resume that stands out. We'll cover formatting, ATS optimization, power verbs, and real examples...",
    author: "Sarah Johnson",
    authorImage: "/authors/sarah.jpg",
    category: "Career Tips",
    readTime: "6 min read",
    date: "2025-01-14",
    coverImage: "/blogs/resume-guide.jpg",
  },
  {
    id: 2,
    title: "How AI Is Transforming Hiring for Job Seekers",
    slug: "ai-transforming-hiring",
    excerpt:
      "Recruiters are using AI more than ever. Here's how to adapt and take advantage of the trend.",
    content:
      "Artificial Intelligence now filters resumes, ranks candidates, and even analyzes interview performance...",
    author: "Michael Carter",
    authorImage: "/authors/michael.jpg",
    category: "Hiring Trends",
    readTime: "5 min read",
    date: "2025-02-03",
    coverImage: "/blogs/ai-hiring.jpg",
  },
  {
    id: 3,
    title: "Top Tech Skills Companies Want in 2025",
    slug: "top-tech-skills-2025",
    excerpt:
      "From cloud computing to prompt engineering, here are the most in-demand skills you should learn.",
    content:
      "Tech roles are evolving fast. Mastering cloud DevOps, TypeScript frameworks, AI tools, and data visualization is now essential...",
    author: "Linda Park",
    authorImage: "/authors/linda.jpg",
    category: "Tech Careers",
    readTime: "7 min read",
    date: "2025-03-01",
    coverImage: "/blogs/tech-skills.jpg",
  },
  {
    id: 4,
    title: "How to Prepare for Your Next Remote Interview",
    slug: "remote-interview-tips",
    excerpt:
      "Remote interviews require a different approach. Here’s how to impress recruiters virtually.",
    content:
      "Setting up good lighting, mastering online communication, and preparing technical tests are key for remote hiring...",
    author: "James Walker",
    authorImage: "/authors/james.jpg",
    category: "Interviews",
    readTime: "4 min read",
    date: "2025-01-28",
    coverImage: "/blogs/remote-interview.jpg",
  },
  {
    id: 5,
    title: "How to Build a Strong Portfolio as a Developer",
    slug: "developer-portfolio-guide",
    excerpt:
      "A complete guide for building a portfolio that attracts recruiters and clients.",
    content:
      "Your portfolio should highlight real-world projects, clean UI, problem-solving skills, and story-driven case studies...",
    author: "Maria Gomez",
    authorImage: "/authors/maria.jpg",
    category: "Development",
    readTime: "8 min read",
    date: "2025-04-10",
    coverImage: "/blogs/dev-portfolio.jpg",
  },
];
