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
  Job,
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

export const careers: Job[] = [
  {
    id: 1,
    title: "Data Analyst",
    department: "Data & Analytics",
    jobType: "Full-time",
    salaryRange: { min: 45000, max: 70000, currency: "USD" },
    description:
      "Help our customers turn raw data into actionable insights. You will own analytics projects from data exploration through reporting and stakeholder delivery — building dashboards, ad-hoc analyses, and data visualizations that drive business decisions.",
    requirements: [
      "Bachelor’s degree in Statistics, Mathematics, Economics, Computer Science or related field",
      "2+ years experience in a data analyst role or similar",
      "Strong SQL skills; experience with BI tools (Looker, Tableau, or Power BI)",
      "Proficiency in Python or R for data manipulation and analysis",
      "Excellent communication skills and experience presenting findings to non-technical stakeholders",
    ],
    applyLink: "https://smartedge.example.com/careers/apply/1",
  },
  {
    id: 2,
    title: "Frontend Developer",
    department: "Engineering",
    jobType: "Hybrid",
    salaryRange: { min: 70000, max: 110000, currency: "USD" },
    description:
      "Build polished, performant user interfaces that make complex data accessible. You will implement designs, optimize load times, and collaborate with product and design to ship delightful UX for our analytics products.",
    requirements: [
      "3+ years building web applications with React (or similar)",
      "Strong TypeScript knowledge and experience with modern CSS/Tailwind",
      "Familiarity with Next.js, SSR/SSG concepts and accessibility best practices",
      "Experience integrating with REST/GraphQL APIs and working with design systems",
      "Attention to detail and a strong sense for UX",
    ],
    applyLink: "https://smartedge.example.com/careers/apply/2",
  },
  {
    id: 3,
    title: "Backend Engineer",
    department: "Engineering",
    jobType: "Full-time",
    salaryRange: { min: 85000, max: 130000, currency: "USD" },
    description:
      "Design and maintain the APIs and data pipelines that power our platform. You'll focus on reliability, scalability, and secondaryurity while working across the stack with data engineering and frontend teams.",
    requirements: [
      "4+ years experience building backend services (Node, Python, Go, or Java)",
      "Deep understanding of RESTful APIs, authentication/authorization, and microservices patterns",
      "Experience with cloud platforms (AWS/GCP/Azure) and containerization (Docker/Kubernetes)",
      "Knowledge of relational and NoSQL databases and query optimization",
      "Familiarity with CI/CD, observability, and automated testing",
    ],
    applyLink: "https://smartedge.example.com/careers/apply/3",
  },
  {
    id: 4,
    title: "Machine Learning Engineer",
    department: "Data Science",
    jobType: "Full-time",
    salaryRange: { min: 95000, max: 150000, currency: "USD" },
    description:
      "Build and productionize ML models that deliver predictive and prescriptive insights. You will work from model design and feature engineering through deployment and monitoring in production.",
    requirements: [
      "MS or BS in Computer Science, Machine Learning, or related engineering field (MS preferred)",
      "Experience building ML models end-to-end and deploying them to production",
      "Strong Python skills and familiarity with ML libraries (scikit-learn, PyTorch, TensorFlow)",
      "Experience with feature stores, model monitoring, and MLOps practices",
      "Ability to translate business problems into ML solutions and communicate results clearly",
    ],
    applyLink: "https://smartedge.example.com/careers/apply/4",
  },
  {
    id: 5,
    title: "Product Manager – Data Products",
    department: "Product",
    jobType: "Full-time",
    salaryRange: { min: 90000, max: 140000, currency: "USD" },
    description:
      "Own the roadmap for a core data product. You will work with design, engineering, and customers to define features, prioritize work, and measure outcomes that increase value and adoption.",
    requirements: [
      "3+ years product management experience (SaaS or data product preferred)",
      "Strong analytical skills and familiarity with data/analytics workflows",
      "Proven ability to lead cross-functional teams and manage stakeholder expectations",
      "Experience writing product requirements, defining KPIs, and running experiments",
      "Excellent communication and customer empathy",
    ],
    applyLink: "https://smartedge.example.com/careers/apply/5",
  },
  {
    id: 6,
    title: "Data Engineer",
    department: "Data & Analytics",
    jobType: "Full-time",
    salaryRange: { min: 85000, max: 125000, currency: "USD" },
    description:
      "Design and maintain robust data pipelines and warehouses that power analytics and ML. You will ensure data quality, optimize ETL jobs, and collaborate closely with analysts and ML engineers.",
    requirements: [
      "3+ years experience in data engineering or backend data roles",
      "Experience with ETL/ELT frameworks, Spark, Airflow or alternatives",
      "Strong SQL skills and cloud data warehouse experience (BigQuery, Redshift, Snowflake)",
      "Knowledge of data modelling, partitioning, and performance optimization",
      "Familiarity with data governance and testing practices",
    ],
    applyLink: "https://smartedge.example.com/careers/apply/6",
  },
  {
    id: 7,
    title: "UI/UX Designer",
    department: "Design",
    jobType: "Remote",
    salaryRange: { min: 65000, max: 95000, currency: "USD" },
    description:
      "Design intuitive interfaces and experiences for data-heavy products. You will own wireframes, prototypes, and the visual design language that helps users understand complexity at a glance.",
    requirements: [
      "3+ years product design experience, preferably in SaaS or analytics",
      "Strong portfolio showcasing interface design, interaction design and prototyping",
      "Familiar with Figma (or similar) and design systems",
      "Ability to collaborate closely with researchers, PMs and engineers",
      "Understanding of data visualization principles and accessibility",
    ],
    applyLink: "https://smartedge.example.com/careers/apply/7",
  },
  {
    id: 8,
    title: "Business Analyst",
    department: "Customer Success & Sales",
    jobType: "Contract",
    salaryRange: { min: 35000, max: 60000, currency: "USD" },
    description:
      "Work with customers to gather requirements, map processes, and translate business questions into analytical work. You’ll act as the bridge between customers and the product team to ensure solutions meet real needs.",
    requirements: [
      "2+ years experience in business analysis, consulting, or a client-facing analytics role",
      "Excellent stakeholder management and problem-framing skills",
      "Comfortable with SQL and spreadsheet modelling",
      "Strong written and verbal communication skills",
      "Experience documenting requirements and creating user stories",
    ],
    applyLink: "https://smartedge.example.com/careers/apply/8",
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
