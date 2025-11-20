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
} from "./social-icons";

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
    color: "bg-red-200",
  },
  {
    id: 2,
    title: "Analyze",
    description: "We use analytics and AI to uncover patterns and insights.",
    color: "bg-orange-200",
  },
  {
    id: 3,
    title: "Transform",
    description: "We turn insights into decisions that improve performance.",
    color: "bg-yellow-200",
  },
  {
    id: 4,
    title: "Automate",
    description: "We implement systems that sustain continuous growth.",
    color: "bg-green-200",
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
