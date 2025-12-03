// app/api/sanity-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { upsertJob, softDeleteJob } from "@/lib/careers";
import { isSanityJob } from "@/src/sanity/types";

export async function POST(request: NextRequest) {
  console.log("🎯 Webhook received");
  
  try {
    // 1. Check secret
    const secret = process.env.SANITY_WEBHOOK_SECRET;
    if (!secret) {
      return NextResponse.json(
        { error: "Missing SANITY_WEBHOOK_SECRET" },
        { status: 500 }
      );
    }

    // 2. Validate signature
    const signature = request.headers.get("x-sanity-webhook-secret");
    if (signature !== secret) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // 3. Parse the request body
    const body = await request.json();
    console.log("📦 Webhook data:", body._type || "unknown");

    // 4. Check if it's a careers document (Sanity sends it directly with projection!)
    if (!isSanityJob(body)) {
      return NextResponse.json(
        { success: true, message: "Not a careers document, skipping" },
        { status: 200 }
      );
    }

    // 5. Check if document is deleted (look for _deleted flag)
    if (body._deleted === true) {
      await softDeleteJob(body._id);
      console.log(`🗑️ Deleted: ${body.jobTitle || body._id}`);
      return NextResponse.json(
        { success: true, message: "Document deleted" },
        { status: 200 }
      );
    }

    // 6. Upsert the job (create or update)
    const result = await upsertJob(body);
    console.log(`✅ Synced: ${body.jobTitle}`);

    return NextResponse.json(
      { 
        success: true, 
        jobId: result.id,
        jobTitle: body.jobTitle 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Webhook error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      status: "Active",
      timestamp: new Date().toISOString()
    },
    { status: 200 }
  );
}