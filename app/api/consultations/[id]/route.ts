// app/api/consultations/[id]/route.ts
import { db } from "@/lib/database";
import { consultations } from "@/lib/database/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { Params } from "@/types";

export async function POST(
  req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { data: newStatus } = body;
    const { id: conId } = await params;

    if (!conId) {
      return NextResponse.json(
        { success: false, error: "Consultation ID not provided" },
        { status: 400 }
      );
    }

    // Validate status
    if (!["pending", "attended"].includes(newStatus)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    // Get the Consultation details first
    const [consultation] = await db
      .select()
      .from(consultations)
      .where(eq(consultations.id, conId))
      .limit(1);

    if (!consultation) {
      return NextResponse.json(
        { success: false, error: "Consultation not found" },
        { status: 404 }
      );
    }

    // Update the status in the database
    await db
      .update(consultations)
      .set({
        status: newStatus,
        updatedAt: new Date(),
      })
      .where(eq(consultations.id, conId));

    return NextResponse.json({
      success: true,
      message: `Status updated to ${newStatus} `,
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
