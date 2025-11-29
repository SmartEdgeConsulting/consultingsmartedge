// app/api/webhooks/clerk/test/route.ts
// Simple test endpoint to verify webhooks can reach your server
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    status: "ok",
    message: "Webhook endpoint is reachable",
    timestamp: new Date().toISOString(),
  });
}

export async function POST(req: Request) {
  console.log("🔔 TEST: Webhook endpoint received POST request");
  
  const body = await req.text();
  const headers = Object.fromEntries(req.headers.entries());
  
  console.log("Headers:", JSON.stringify(headers, null, 2));
  console.log("Body length:", body.length);
  
  return NextResponse.json({
    status: "received",
    message: "Test webhook received",
    bodyLength: body.length,
    hasBody: body.length > 0,
  });
}