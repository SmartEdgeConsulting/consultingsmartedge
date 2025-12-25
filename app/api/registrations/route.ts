// api/registrations/route.ts
import { db } from "@/lib/database";
import { registrations } from "@/lib/database/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const registrationsList = await db
      .select()
      .from(registrations)
      .orderBy(desc(registrations.createdAt));

    return NextResponse.json({
      success: true,
      data: registrationsList,
      count: registrationsList.length,
    });
    
  } catch (error) {
    console.error("Database Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch registrations. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}