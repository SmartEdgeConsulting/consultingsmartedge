import { LucideIcon } from "lucide-react";

export type Params = {
  params: Promise<{
    id: string;
  }>;
};

export type serviceProps = {
  id?: number;
  icon: string;
  title: string;
  description: string;
  button: string;
  link?: string;
};

export type processProps = {
  id: number;
  title: string;
  description: string;
  icon: string;
};

export type teamsProps = {
  _id: string;
  name: string;
  skill: string;
  profilePicture: SanityImage;
};

export type contactInfoProps = {
  id?: number;
  icon: string;
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
  slug: string;
  jobTitle: string;
  department: departmentProps;
  jobType: string;
  jobDescription: string;
  publishedAt: string;
  requirements: string[];
};

export interface SanityImage {
  asset: {
    _id: string;
    url: string;
    metadata: {
      dimensions: {
        width: number;
        height: number;
        aspectRatio: number;
      };
      lqip: string;
    };
  };
  caption?: string;
  alt?: string;
}
export interface SanityAsset {
  _id: string;
  url: string;
  metadata: {
    dimensions: {
      width: number;
      height: number;
      aspectRatio: number;
    };
    lqip: string;
  };
}

// types/article.ts
export interface PortableTextImage {
  _key: string;
  _type: "image";
  asset: {
    _ref: string;
    _type: "reference";
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}
export interface Author {
  name: string;
  profilePicture?: SanityImage;
}

// Simplified portable text types
export interface PortableTextChild {
  _key: string;
  _type: string;
  text?: string;
  marks?: string[];
  asset?: SanityImage["asset"];
  alt?: string;
  caption?: string;
  code?: string;
  language?: string;
}

export interface PortableTextBlock {
  _key: string;
  _type: "block";
  style: string;
  children: PortableTextChild[];
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  listItem?: string;
  level?: number;
}

export type PortableTextContent =
  | PortableTextBlock
  | {
      _key: string;
      _type: "image";
      asset: SanityImage["asset"];
      alt?: string;
      caption?: string;
    }
  | {
      _key: string;
      _type: "code";
      code: string;
      language?: string;
    };

export interface Article {
  _id: string;
  title: string;
  slug: string;
  author: Author;
  category: string;
  coverImage: SanityImage;
  content: PortableTextContent[];
  publishedAt: string;
  excerpt?: string;
  estimatedReadingTime?: number;
}

interface button {
  text: string;
  url: string | null;
}

export type eventProps = {
  _id: string;
  name: string;
  slug: string;
  time: string;
  description: string;
  coverImage: SanityImage;
  ctaButton: button;
  publishedAt: string;
};

export type testimonialProps = {
  _id: string;
  name: string;
  slug: string;
  title: string;
  profilePicture: SanityImage;
  testimony: string;
};

export interface videotestimonialProps {
  _id: string;
  video: {
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

export type Registration = {
  id: string;
  name: string;
  email: string;
  phoneNo: string;
  gender: string;
  country?: string;
  occupation?: string;
  education?: string;
  experience?: string;
  interest?: string;
  skillOfInterest?: string[];
  sessionAttendance?: string;
  classHolding?: string;
  classTiming?: string;
  connection?: string;
  device?: string;
  heardAboutUs?: string;
  additionalInfo?: string;
  proofOfPayment: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
  updatedAt?: string;
};

export type Application = {
  id: string;
  careerId: string;
  name: string;
  email: string;
  skills: string;
  portfolio?: string;
  resumeUrl: string;
  career: jobProps;
  phoneNumber: string;
  experience: string;
  userId: string;
  createdAt: string;
};

export type Consultation = {
  id: string;
  name: string;
  email: string;
  company?: string;
  challenge: string;
  status: "pending" | "attended";
  userId: string;
  createdAt: string;
};

export type Research = {
  id: string;
  name: string;
  email: string;
  business: string;
  budget?: string;
  research: string;
  timeline?: string;
  userId: string;
  createdAt: string;
};

export type Statistics = {
  index?: number;
  label: string;
  value: number;
  color: string;
  change?: number;
  icon: LucideIcon;
};

export type coursesProps = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: string;
  thumbnail: SanityImage;
  courseType: string;
  modulesCount: number;
  lessonsCount: number;
  publishedAt: string;
};
