import { LucideIcon } from "lucide-react";

export type serviceProps = {
  id?: number;
  icon: LucideIcon;
  title: string;
  description: string;
  button: string;
  link?: string;
};

export type processProps = {
  id: number;
  title: string;
  description: string;
  color: string;
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
  jobType: string;
  jobDescription: string;
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

export type eventProps = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  coverImage: SanityImage;
  publishedAt: string;
};
