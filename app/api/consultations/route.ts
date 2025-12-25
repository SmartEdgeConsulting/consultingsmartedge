//api/consultations/route.ts
import { db } from "@/lib/database";
import { consultations } from "@/lib/database/schema"; 
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const consultationsList = await db
      .select()
      .from(consultations)
      .orderBy(desc(consultations.createdAt));

    return NextResponse.json({
      success: true,
      data: consultationsList,
      count: consultationsList.length,
    });
  } catch (error) {
    console.error("Database Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch consultations. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
