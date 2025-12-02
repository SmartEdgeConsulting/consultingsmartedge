// api/sanity-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { validateWebhook, parseWebhookPayload, isJobDocument } from "@/src/sanity/webhook-utils";
import { upsertJob, softDeleteJob } from "@/lib/careers";

export async function POST(request: NextRequest) {
  try {
    const secret = process.env.SANITY_WEBHOOK_SECRET;
    if (!secret) {
      console.error("SANITY_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const isValid = validateWebhook(request, secret);
    if (!isValid) {
      console.warn("Invalid webhook signature");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const payload = await parseWebhookPayload(request);
    if (!payload) {
      return NextResponse.json(
        { error: "Invalid payload" },
        { status: 400 }
      );
    }

    console.log(`📦 Webhook: ${payload.operation} ${payload.documentId}`);

    // Process based on operation
    let result;
    switch (payload.operation) {
      case "create":
      case "update":
        if (payload.result && isJobDocument(payload)) {
          try {
            result = await upsertJob(payload.result);
            console.log(`✅ ${payload.operation}: ${payload.result.jobTitle} (${result.id})`);
          } catch (error) {
            console.error(`❌ Failed to upsert job ${payload.documentId}:`, error);
            // Return 200 to prevent Sanity retries, but log the error
            return NextResponse.json(
              { 
                success: false,
                operation: payload.operation,
                documentId: payload.documentId,
                error: error instanceof Error ? error.message : "Unknown error"
              },
              { status: 200 } // Still 200 to acknowledge receipt
            );
          }
        }
        break;

      case "delete":
        if (isJobDocument(payload)) {
          try {
            await softDeleteJob(payload.documentId);
            console.log(`🗑️ Soft deleted: ${payload.documentId}`);
          } catch (error) {
            console.error(`❌ Failed to delete job ${payload.documentId}:`, error);
            return NextResponse.json(
              { 
                success: false,
                operation: payload.operation,
                documentId: payload.documentId,
                error: error instanceof Error ? error.message : "Unknown error"
              },
              { status: 200 }
            );
          }
        }
        break;

      default:
        console.warn(`Unknown operation: ${payload.operation}`);
    }

    return NextResponse.json(
      { 
        success: true, 
        operation: payload.operation,
        documentId: payload.documentId,
        result: result?.id
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Webhook error:", error);
    
    return NextResponse.json(
      { 
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      status: "Sanity webhook endpoint is active",
      endpoint: "/api/sanity-webhook",
      method: "POST",
      requiredHeaders: ["x-sanity-webhook-secret"],
      timestamp: new Date().toISOString(),
    },
    { status: 200 }
  );
}