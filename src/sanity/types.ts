// src/sanity/types.ts
export interface SanityJob {
  _id: string;
  _type: "careers";
  _rev?: string;
  _createdAt?: string;
  _updatedAt?: string;
  _deleted?: boolean;
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

export function isSanityJob(data: unknown): data is SanityJob {
  if (typeof data !== 'object' || data === null) {
    return false;
  }

  const obj = data as Record<string, unknown>;
  
  return (
    obj._type === 'careers' &&
    typeof obj.jobTitle === 'string' &&
    typeof obj.slug === 'object' &&
    obj.slug !== null &&
    typeof (obj.slug as Record<string, unknown>).current === 'string'
  );
}