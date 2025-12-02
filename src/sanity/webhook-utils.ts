//src/sanity/webhook-utils.ts
import { SanityWebhookPayload } from "./types";

// Validate webhook signature
export function validateWebhook(request: Request, secret: string): boolean {
  const signature = request.headers.get("x-sanity-webhook-secret");
  return signature === secret;
}

// Parse webhook payload
export async function parseWebhookPayload(
  request: Request
): Promise<SanityWebhookPayload | null> {
  try {
    const body = await request.text();
    const data = JSON.parse(body);

    // Basic validation
    if (!data.operation || !data.documentId) {
      console.error("Invalid webhook payload:", data);
      return null;
    }

    return data as SanityWebhookPayload;
  } catch (error) {
    console.error("Error parsing webhook:", error);
    return null;
  }
}

// Check if document is a job
export function isJobDocument(data: SanityWebhookPayload): boolean {
  if (data.result) {
    return data.result._type === "careers";
  }
  // For delete operations, we might need to check the previous state
  if (data.previous) {
    return data.previous._type === "careers";
  }
  return false;
}
