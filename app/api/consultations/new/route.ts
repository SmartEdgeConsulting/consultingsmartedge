//api/consultations/new/route.ts
import { db } from "@/lib/database";
import { consultations } from "@/lib/database/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { pusherServer } from "@/lib/pusher-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, company, challenge } = body;

    // Validate data
    if (!name || !email || !challenge) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Get authenticated user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to apply." },
        { status: 401 }
      );
    }

    // Check for existing consultation from the same user with the same challenge
    const existingConsultations = await db
      .select()
      .from(consultations)
      .where(
        and(
          eq(consultations.userId, userId),
          eq(consultations.challenge, challenge)
        )
      );

    if (existingConsultations.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "You have already submitted a consultation for this challenge",
        },
        { status: 400 }
      );
    }

    // Insert new consultation
    const result = await db
      .insert(consultations)
      .values({
        userId,
        name,
        email,
        company,
        challenge,
        status: "pending",
      })
      .returning();

    const newConsultation = result[0];

    // 3. Trigger real-time event to admin dashboard
    await pusherServer.trigger("admin-dashboard", "new-consultation", {
      id: newConsultation.id,
      name: newConsultation.name,
      email: newConsultation.email,
      company: newConsultation.company,
      challenge: newConsultation.challenge,
      status: newConsultation.status,
      userId: newConsultation.userId,
      createdAt: newConsultation.createdAt,
    });

    return NextResponse.json({
      success: true,
      message: "Consultation request submitted successfully",
      data: newConsultation,
    });

  } catch (error) {
    console.error("Consultation submission error:", error);
    return NextResponse.json(
      {
        error: "Failed to submit consultation. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
