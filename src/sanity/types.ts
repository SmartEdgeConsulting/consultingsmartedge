//src/sanity/types.ts
export interface SanityJob {
  _id: string;
  _type: "careers";
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
  jobTitle: string;
  slug: { current: string };
  department?: {
    _id: string;
    department: string;
    slug: { current: string };
  };
  jobDescription?: string; 
  jobType?: string;
  publishedAt: string;
  available: boolean;
}

export interface SanityWebhookPayload {
  operation: "create" | "update" | "delete";
  documentId: string;
  result?: SanityJob;
  previous?: SanityJob;
}