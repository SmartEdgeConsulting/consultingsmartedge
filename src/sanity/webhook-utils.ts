// src/sanity/webhook-utils.ts
import { 
  SanityWebhookPayload,
  SanityOperation,
  SanityDocument,
  SanityJob,
  SanityWebhookEnvelope,
  SanityMutationWebhook,
  SanityDataWebhook,
  isSanityWebhookEnvelope,
  isSanityMutationWebhook,
  isSanityDataWebhook,
  isSanityDocument,
  isSanityJob as sanityIsSanityJob,
  assertSanityJob
} from "./types";

// Re-export isSanityJob
export { sanityIsSanityJob as isSanityJob };

// Validate webhook signature
export function validateWebhook(request: Request, secret: string): boolean {
  const signature = request.headers.get("x-sanity-webhook-secret");
  return signature === secret;
}

// Parse webhook payload with enhanced logging
export async function parseWebhookPayload(
  request: Request
): Promise<SanityWebhookPayload | null> {
  try {
    const body = await request.text();
    console.log("📥 Raw webhook body:", body);
    
    if (!body.trim()) {
      console.error("❌ Empty webhook body");
      return null;
    }

    let data: unknown;
    try {
      data = JSON.parse(body);
    } catch (parseError) {
      console.error("❌ Failed to parse JSON:", parseError);
      return null;
    }

    console.log("📦 Parsed webhook data structure:", {
      type: typeof data,
      isObject: typeof data === 'object' && data !== null,
      keys: typeof data === 'object' && data !== null ? Object.keys(data) : []
    });

    // Handle different Sanity webhook formats
    let payload: SanityWebhookPayload | null = null;

    if (isSanityWebhookEnvelope(data)) {
      payload = parseEnvelopeFormat(data);
    } else if (isSanityMutationWebhook(data)) {
      payload = parseMutationFormat(data);
    } else if (isSanityDataWebhook(data)) {
      payload = parseDataFormat(data);
    } else {
      console.error("❌ Unknown webhook format");
      // Try to extract data from unknown format
      payload = extractFromUnknownFormat(data);
    }

    if (payload) {
      console.log("✅ Normalized payload:", JSON.stringify(payload, null, 2));
    }

    return payload;
  } catch (error) {
    console.error("❌ Error parsing webhook:", error);
    return null;
  }
}

// Parse envelope format (webhookMessage)
function parseEnvelopeFormat(data: SanityWebhookEnvelope): SanityWebhookPayload | null {
  const { ids } = data;
  
  const allIds = [
    ...(ids.created || []),
    ...(ids.updated || []),
    ...(ids.deleted || [])
  ];

  if (allIds.length === 0) {
    console.warn("⚠️ No document IDs in envelope");
    return null;
  }

  const documentId = allIds[0];
  let operation: SanityOperation = 'update';

  if (ids.created && ids.created.includes(documentId)) {
    operation = 'create';
  } else if (ids.deleted && ids.deleted.includes(documentId)) {
    operation = 'delete';
  }

  return {
    operation,
    documentId,
    result: undefined,
    previous: undefined
  };
}

// Parse mutation format (GROQ-powered webhooks)
function parseMutationFormat(data: SanityMutationWebhook): SanityWebhookPayload {
  let operation: SanityOperation = 'update';
  
  if (data.transition === 'appear') {
    operation = 'create';
  } else if (data.transition === 'disappear') {
    operation = 'delete';
  }

  return {
    operation,
    documentId: data.documentId,
    result: data.result,
    previous: data.previous
  };
}

// Parse data format (direct document data)
function parseDataFormat(data: SanityDataWebhook): SanityWebhookPayload {
  return {
    operation: data.operation,
    documentId: data.documentId,
    result: data.result,
    previous: data.previous
  };
}

// Extract data from unknown webhook format
function extractFromUnknownFormat(data: unknown): SanityWebhookPayload | null {
  if (typeof data !== 'object' || data === null) {
    return null;
  }

  const obj = data as Record<string, unknown>;
  
  // Check for array format (multiple mutations)
  if (Array.isArray(obj) && obj.length > 0) {
    const firstItem = obj[0];
    if (typeof firstItem === 'object' && firstItem !== null) {
      const item = firstItem as Record<string, unknown>;
      const documentId = (item.documentId as string) || (item._id as string);
      if (!documentId) return null;
      
      return {
        operation: (item.operation as SanityOperation) || 'update',
        documentId,
        result: isSanityDocument(item.result) ? item.result : undefined,
        previous: isSanityDocument(item.previous) ? item.previous : undefined
      };
    }
  }

  // Check for direct document
  if (obj._id && typeof obj._id === 'string' && 
      obj._type && typeof obj._type === 'string' &&
      obj._type !== 'webhookMessage' && 
      obj._type !== 'mutation' &&
      isSanityDocument(obj)) {
    return {
      operation: 'update',
      documentId: obj._id,
      result: obj,
      previous: undefined
    };
  }

  // Minimal format extraction
  let documentId: string = '';
  let operation: SanityOperation = 'update';

  if (typeof obj.documentId === 'string') {
    documentId = obj.documentId;
  } else if (typeof obj._id === 'string') {
    documentId = obj._id;
  }

  if (typeof obj.operation === 'string' && 
      ['create', 'update', 'delete'].includes(obj.operation)) {
    operation = obj.operation as SanityOperation;
  }

  if (!documentId) {
    return null;
  }

  return {
    operation,
    documentId,
    result: isSanityDocument(obj.result) ? obj.result : undefined,
    previous: isSanityDocument(obj.previous) ? obj.previous : undefined
  };
}

// Check if document is a job
export function isJobDocument(data: SanityWebhookPayload): boolean {
  console.log("🔍 Checking if job document...");
  
  // Check result first
  if (data.result) {
    const isJob = sanityIsSanityJob(data.result);
    console.log(`Result is${isJob ? "" : " NOT"} a careers document`);
    return isJob;
  }
  
  // Check previous if result not available
  if (data.previous) {
    const isJob = sanityIsSanityJob(data.previous);
    console.log(`Previous is${isJob ? "" : " NOT"} a careers document`);
    return isJob;
  }
  
  // Check documentId pattern as fallback
  if (data.documentId) {
    const isJob = data.documentId.includes('careers-') || data.documentId.includes('.careers-');
    console.log(`Document ID ${isJob ? "contains" : "does not contain"} careers pattern`);
    return isJob;
  }
  
  console.log("⚠️ No result, previous, or identifiable document ID found");
  return false;
}

// Helper to fetch document from Sanity when only ID is provided
export async function fetchSanityDocument(
  documentId: string, 
  clientConfig: {
    projectId: string;
    dataset: string;
    token: string;
  }
): Promise<SanityDocument | null> {
  try {
    const response = await fetch(
      `https://${clientConfig.projectId}.api.sanity.io/v2024-01-01/data/query/${clientConfig.dataset}?query=*[_id=="${documentId}"]`,
      {
        headers: {
          'Authorization': `Bearer ${clientConfig.token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch document: ${response.statusText}`);
    }

    const result = await response.json();
    const document = result.result?.[0] || null;
    
    // Validate it's a SanityDocument
    return isSanityDocument(document) ? document : null;
  } catch (error) {
    console.error(`❌ Failed to fetch document ${documentId}:`, error);
    return null;
  }
}

// Helper to fetch and validate job document
export async function fetchSanityJob(
  documentId: string, 
  clientConfig: {
    projectId: string;
    dataset: string;
    token: string;
  }
): Promise<SanityJob | null> {
  const document = await fetchSanityDocument(documentId, clientConfig);
  if (!document) return null;
  
  if (sanityIsSanityJob(document)) {
    return document;
  }
  
  console.error(`Document ${documentId} is not a valid job:`, document);
  return null;
}