// src/sanity/types.ts

// Base Sanity document interface
export interface SanityDocument {
  _id: string;
  _type: string;
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
  [key: string]: unknown;
}

// Specific job/career document type
export interface SanityJob extends SanityDocument {
  _type: "careers";
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

export type SanityOperation = 'create' | 'update' | 'delete';

// Generic webhook payload (uses base SanityDocument)
export interface SanityWebhookPayload {
  operation: SanityOperation;
  documentId: string;
  result?: SanityDocument;
  previous?: SanityDocument;
}

// Specific webhook payload for jobs (uses SanityJob)
export interface SanityJobWebhookPayload {
  operation: SanityOperation;
  documentId: string;
  result?: SanityJob;
  previous?: SanityJob;
}

export interface SanityWebhookEnvelope {
  _id: string;
  _type: 'webhookMessage';
  projectId: string;
  ids: {
    created: string[];
    updated: string[];
    deleted: string[];
  };
}

export interface SanityMutationWebhook {
  _id: string;
  _type: 'mutation';
  transition: 'appear' | 'disappear' | 'update';
  documentId: string;
  result?: SanityDocument;
  previous?: SanityDocument;
}

export interface SanityDataWebhook {
  operation: SanityOperation;
  documentId: string;
  result?: SanityDocument;
  previous?: SanityDocument;
}

// Type guard functions
export function isSanityWebhookEnvelope(data: unknown): data is SanityWebhookEnvelope {
  return (
    typeof data === 'object' &&
    data !== null &&
    (data as SanityWebhookEnvelope)._type === 'webhookMessage' &&
    'ids' in data
  );
}

export function isSanityMutationWebhook(data: unknown): data is SanityMutationWebhook {
  return (
    typeof data === 'object' &&
    data !== null &&
    (data as SanityMutationWebhook)._type === 'mutation' &&
    'transition' in data &&
    'documentId' in data
  );
}

export function isSanityDataWebhook(data: unknown): data is SanityDataWebhook {
  return (
    typeof data === 'object' &&
    data !== null &&
    'operation' in data &&
    'documentId' in data &&
    typeof (data as SanityDataWebhook).operation === 'string' &&
    typeof (data as SanityDataWebhook).documentId === 'string'
  );
}

export function isSanityDocument(data: unknown): data is SanityDocument {
  return (
    typeof data === 'object' &&
    data !== null &&
    '_id' in data &&
    '_type' in data &&
    typeof (data as SanityDocument)._id === 'string' &&
    typeof (data as SanityDocument)._type === 'string'
  );
}

// Specific type guard for job documents
export function isSanityJob(data: unknown): data is SanityJob {
  return (
    isSanityDocument(data) &&
    data._type === 'careers' &&
    'jobTitle' in data &&
    typeof data.jobTitle === 'string' &&
    'slug' in data &&
    typeof data.slug === 'object' &&
    data.slug !== null &&
    'current' in data.slug &&
    typeof data.slug.current === 'string' &&
    'publishedAt' in data &&
    typeof data.publishedAt === 'string' &&
    'available' in data &&
    typeof data.available === 'boolean'
  );
}

// Helper to assert job document type
export function assertSanityJob(data: unknown): asserts data is SanityJob {
  if (!isSanityJob(data)) {
    throw new Error('Document is not a valid job/career document');
  }
}