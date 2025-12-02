// api/sanity-webhook/route.ts
import { NextRequest, NextResponse } from "next/server";
import { 
  validateWebhook, 
  parseWebhookPayload, 
  isJobDocument,
  fetchSanityDocument,
  isSanityJob
} from "@/src/sanity/webhook-utils";
import { upsertJob, softDeleteJob } from "@/lib/careers";
import { SanityDocument } from "@/src/sanity/types";

// Type for minimal webhook payload
interface MinimalWebhookPayload {
  operation: 'create' | 'update' | 'delete';
  documentId: string;
  result?: unknown;
  previous?: unknown;
}

// Parse raw payload as fallback
function parseRawPayload(body: string): MinimalWebhookPayload | null {
  try {
    const data: unknown = JSON.parse(body);
    
    if (typeof data !== 'object' || data === null) {
      return null;
    }

    const obj = data as Record<string, unknown>;
    
    // Check for direct document format
    if (obj._id && typeof obj._id === 'string') {
      return {
        operation: 'update',
        documentId: obj._id,
        result: obj
      };
    }
    
    // Check for array format
    if (Array.isArray(obj) && obj.length > 0) {
      const firstItem = obj[0];
      if (typeof firstItem === 'object' && firstItem !== null) {
        const item = firstItem as Record<string, unknown>;
        return {
          operation: (item.operation as 'create' | 'update' | 'delete') || 'update',
          documentId: (item.documentId as string) || (item._id as string) || '',
          result: item.result,
          previous: item.previous
        };
      }
    }
    
    // Check for minimal format
    if (obj.documentId && typeof obj.documentId === 'string') {
      return {
        operation: (obj.operation as 'create' | 'update' | 'delete') || 'update',
        documentId: obj.documentId,
        result: obj.result,
        previous: obj.previous
      };
    }
    
    return null;
  } catch (error) {
    console.error("Failed to parse raw payload:", error);
    return null;
  }
}

// Helper to convert Record to SanityDocument if possible
function recordToSanityDocument(record: Record<string, unknown>): SanityDocument | undefined {
  if (
    typeof record._id === 'string' &&
    typeof record._type === 'string'
  ) {
    return {
      _id: record._id,
      _type: record._type,
      _rev: typeof record._rev === 'string' ? record._rev : undefined,
      _createdAt: typeof record._createdAt === 'string' ? record._createdAt : undefined,
      _updatedAt: typeof record._updatedAt === 'string' ? record._updatedAt : undefined,
      ...Object.keys(record)
        .filter(key => !key.startsWith('_'))
        .reduce((acc, key) => {
          acc[key] = record[key];
          return acc;
        }, {} as Record<string, unknown>)
    };
  }
  return undefined;
}

export async function POST(request: NextRequest) {
  console.log("🎯 Webhook received");
  
  try {
    const secret = process.env.SANITY_WEBHOOK_SECRET;
    const projectId = process.env.SANITY_PROJECT_ID;
    const dataset = process.env.SANITY_DATASET;
    const token = process.env.SANITY_API_TOKEN;

    if (!secret || !projectId || !dataset || !token) {
      console.error("❌ Missing required environment variables");
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Clone request for logging
    const clonedRequest = request.clone();
    const body = await clonedRequest.text();
    const headers = Object.fromEntries(clonedRequest.headers.entries());
    
    console.log("📨 Headers:", JSON.stringify(headers, null, 2));
    console.log("📨 Raw body preview:", body.substring(0, 300));

    const isValid = validateWebhook(request, secret);
    if (!isValid) {
      console.warn("⚠️ Invalid webhook signature");
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Try parsing with main function
    let payload = await parseWebhookPayload(clonedRequest);
    
    // If that fails, try raw parsing and conversion
    if (!payload) {
      console.log("🔄 Trying fallback parsing...");
      const minimalPayload = parseRawPayload(body);
      
      if (minimalPayload) {
        // Convert minimal payload to SanityWebhookPayload format
        const result = minimalPayload.result && typeof minimalPayload.result === 'object' && minimalPayload.result !== null 
          ? recordToSanityDocument(minimalPayload.result as Record<string, unknown>)
          : undefined;
          
        const previous = minimalPayload.previous && typeof minimalPayload.previous === 'object' && minimalPayload.previous !== null
          ? recordToSanityDocument(minimalPayload.previous as Record<string, unknown>)
          : undefined;
        
        payload = {
          operation: minimalPayload.operation,
          documentId: minimalPayload.documentId,
          result,
          previous
        };
      }
    }

    if (!payload) {
      console.error("❌ Failed to parse payload with all methods");
      console.error("Full body:", body);
      
      return NextResponse.json(
        { 
          error: "Invalid payload format",
          message: "Could not parse webhook payload. Check server logs for details."
        },
        { status: 400 }
      );
    }

    console.log(`📦 Webhook: ${payload.operation} ${payload.documentId}`);

    // Check if this is a job document
    if (!isJobDocument(payload)) {
      console.log("⏭️ Not a careers document, skipping");
      return NextResponse.json(
        { 
          success: true, 
          message: "Not a careers document, skipped",
          operation: payload.operation,
          documentId: payload.documentId
        },
        { status: 200 }
      );
    }

    // For create/update operations, ensure we have document data
    if ((payload.operation === 'create' || payload.operation === 'update') && !payload.result) {
      console.log("📡 Fetching document data from Sanity...");
      const document = await fetchSanityDocument(payload.documentId, {
        projectId,
        dataset,
        token
      });
      
      if (!document) {
        console.error(`❌ Failed to fetch document ${payload.documentId}`);
        return NextResponse.json(
          { 
            success: false,
            error: `Document ${payload.documentId} not found in Sanity`,
            operation: payload.operation,
            documentId: payload.documentId
          },
          { status: 200 }
        );
      }
      
      payload.result = document;
    }

    // Process based on operation
    let result: { id: string } | undefined;
    switch (payload.operation) {
      case "create":
      case "update":
        if (payload.result) {
          try {
            // Ensure the result is a valid job document
            if (!isSanityJob(payload.result)) {
              console.error(`❌ Document ${payload.documentId} is not a valid job`);
              return NextResponse.json(
                { 
                  success: false,
                  error: `Document ${payload.documentId} is not a valid job`,
                  operation: payload.operation,
                  documentId: payload.documentId
                },
                { status: 200 }
              );
            }
            
            // Now TypeScript knows payload.result is SanityJob
            result = await upsertJob(payload.result);
            console.log(`✅ ${payload.operation}: ${payload.result.jobTitle} (${result.id})`);
          } catch (error) {
            console.error(`❌ Failed to upsert job ${payload.documentId}:`, error);
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
        } else {
          console.warn("⚠️ No result document in create/update operation");
        }
        break;

      case "delete":
        try {
          // Use the full Sanity ID for deletion
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
        break;

      default:
        console.warn(`⚠️ Unknown operation: ${payload.operation}`);
    }

    return NextResponse.json(
      { 
        success: true, 
        operation: payload.operation,
        documentId: payload.documentId,
        jobId: result?.id
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