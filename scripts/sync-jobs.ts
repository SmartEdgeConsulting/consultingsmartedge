// scripts/sync-jobs.ts
import "dotenv/config";
import { serverClient } from "@/src/sanity/client";
import { batchUpsertJobs, syncJobs } from "@/lib/careers"; 
import { getJobs } from "@/src/sanity/queries";

async function syncAllJobs() {
  console.log("🔄 Starting manual job sync from Sanity to Neon...");
  
  try {
    // 1. Fetch all jobs from Sanity
    const sanityJobs = await serverClient.fetch(getJobs);
    console.log(`📊 Found ${sanityJobs.length} jobs in Sanity`);
    
    if (sanityJobs.length === 0) {
      console.log("⚠️ No jobs found in Sanity");
      return;
    }
    
    // 2. Batch upsert jobs
    const successCount = await batchUpsertJobs(sanityJobs);
    console.log(`✅ Successfully synced ${successCount}/${sanityJobs.length} jobs`);
    
    // 3. Mark jobs not in Sanity as deleted
    const sanityIds = sanityJobs.map(job => job._id);
    await syncJobs(sanityIds);
    console.log(`🗑️ Cleaned up orphaned jobs`);
    
    console.log(`\n✨ Sync complete!`);
    console.log(`📋 Active Sanity IDs: ${sanityIds.length}`);
    
  } catch (error) {
    console.error("❌ Sync failed:", error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  syncAllJobs()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}