//lib/career.ts
import { SanityJob } from "@/src/sanity/types";
import { db } from "./database";
import { careers, type Career, type NewCareer } from "./database/schema";
import { eq, and, inArray, desc, sql, isNull, not } from "drizzle-orm";

// Convert job from sanity to database format
function sanityToDbJob(sanityJob: SanityJob): NewCareer {
  return {
    sanityId: sanityJob._id,
    sanityRev: sanityJob._rev,
    jobTitle: sanityJob.jobTitle,
    slug: sanityJob.slug?.current || null,
    jobDescription: sanityJob.jobDescription || null,
    jobType: sanityJob.jobType || null,
    department: sanityJob.department?.department || null,
    publishedAt: sanityJob.publishedAt
      ? new Date(sanityJob.publishedAt)
      : new Date(),
    available: sanityJob.available || false,
  };
}

// Upsert job (create or update)
export async function upsertJob(sanityJob: SanityJob): Promise<Career> {
  // Check if revision has changed (avoid unnecessary updates)
  const existing = await getJobBySanityId(sanityJob._id);

  if (
    existing &&
    existing.sanityRev === sanityJob._rev &&
    !existing.deletedAt
  ) {
    console.log(
      `⏭️ Skipping ${sanityJob.jobTitle} (rev ${sanityJob._rev} unchanged)`
    );
    return existing;
  }

  const dbJob = sanityToDbJob(sanityJob);

  const [job] = await db
    .insert(careers)
    .values({
      ...dbJob,
      updatedAt: new Date(),
    })
    .onConflictDoUpdate({
      target: careers.sanityId,
      set: {
        sanityRev: dbJob.sanityRev,
        jobTitle: dbJob.jobTitle,
        slug: dbJob.slug,
        jobDescription: dbJob.jobDescription,
        jobType: dbJob.jobType,
        department: dbJob.department,
        publishedAt: dbJob.publishedAt,
        available: dbJob.available,
        updatedAt: new Date(),
        deletedAt: null, // Restore if was soft-deleted
      },
    })
    .returning();

  return job;
}

// lib/careers.ts

/**
 * Batch upsert jobs (more efficient for initial sync)
 */
export async function batchUpsertJobs(
  sanityJobs: SanityJob[]
): Promise<number> {
  if (sanityJobs.length === 0) return 0;

  let successCount = 0;

  // Process in chunks to avoid overwhelming the database
  const CHUNK_SIZE = 50;
  for (let i = 0; i < sanityJobs.length; i += CHUNK_SIZE) {
    const chunk = sanityJobs.slice(i, i + CHUNK_SIZE);

    try {
      await Promise.all(chunk.map((job) => upsertJob(job)));
      successCount += chunk.length;
      console.log(
        `✓ Processed ${Math.min(i + CHUNK_SIZE, sanityJobs.length)}/${sanityJobs.length} jobs`
      );
    } catch (error) {
      console.error(`Failed to process chunk ${i}-${i + CHUNK_SIZE}:`, error);
      // Continue with next chunk
    }
  }

  return successCount;
}

export async function softDeleteJob(sanityId: string): Promise<void> {
  await db
    .update(careers)
    .set({
      available: false,
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(careers.sanityId, sanityId));
}

// Get all available jobs (not deleted)
export async function getAvailableJobs(): Promise<Career[]> {
  return await db
    .select()
    .from(careers)
    .where(and(eq(careers.available, true), isNull(careers.deletedAt)))
    .orderBy(desc(careers.publishedAt));
}

// Bulk sync: mark jobs not in current Sanity list as deleted
export async function syncJobs(sanityIds: string[]): Promise<void> {
  if (sanityIds.length === 0) return;

  // Mark jobs not in current Sanity list as deleted
  await db
    .update(careers)
    .set({
      available: false,
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(careers.available, true),
        isNull(careers.deletedAt),
        not(inArray(careers.sanityId, sanityIds))
      )
    );
}

// Get job by Sanity ID
export async function getJobBySanityId(
  sanityId: string
): Promise<Career | null> {
  const [job] = await db
    .select()
    .from(careers)
    .where(eq(careers.sanityId, sanityId))
    .limit(1);

  return job || null;
}

// Get job by slug
export async function getJobBySlug(slug: string): Promise<Career | null> {
  const [job] = await db
    .select()
    .from(careers)
    .where(
      and(
        eq(careers.slug, slug),
        eq(careers.available, true),
        isNull(careers.deletedAt)
      )
    )
    .limit(1);

  return job || null;
}

// Count available jobs
export async function countAvailableJobs(): Promise<number> {
  const [result] = await db
    .select({ count: sql<number>`count(*)` })
    .from(careers)
    .where(and(eq(careers.available, true), isNull(careers.deletedAt)));

  return result?.count || 0;
}

// Get jobs by department
export async function getJobsByDepartment(
  department: string
): Promise<Career[]> {
  return await db
    .select()
    .from(careers)
    .where(
      and(
        eq(careers.department, department),
        eq(careers.available, true),
        isNull(careers.deletedAt)
      )
    )
    .orderBy(desc(careers.publishedAt));
}

// Archive old jobs (optional cleanup)
export async function archiveOldJobs(monthsOld: number = 6): Promise<void> {
  const cutoffDate = new Date();
  cutoffDate.setMonth(cutoffDate.getMonth() - monthsOld);

  await db
    .update(careers)
    .set({
      available: false,
      updatedAt: new Date(),
    })
    .where(
      and(
        eq(careers.available, true),
        isNull(careers.deletedAt),
        sql`${careers.publishedAt} < ${cutoffDate}`
      )
    );
}
