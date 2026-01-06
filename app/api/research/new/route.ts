//api/research/new/route.ts
import { db } from "@/lib/database";
import { researchs } from "@/lib/database/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";
import { pusherServer } from "@/lib/pusher-server";
import { researchSchema } from "@/src/zod/schema";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate with Zod schema
    const validationResult = researchSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Validation failed",
        },
        { status: 400 }
      );
    }

    const { name, email, business, budget, research, timeline } =
      validationResult.data;

    // Get authenticated user
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: "Unauthorized. Please sign in to submit.",
        },
        { status: 401 }
      );
    }

    // Check for existing research from the same user with the same research content
    const existingResearch = await db
      .select()
      .from(researchs)
      .where(
        and(eq(researchs.userId, userId), eq(researchs.research, research))
      );

    if (existingResearch.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error:
            "You have already submitted a research request with this content",
        },
        { status: 400 }
      );
    }

    // Insert new research
    const result = await db
      .insert(researchs)
      .values({
        userId,
        name,
        email,
        business: business || null,
        budget: budget || null,
        research,
        timeline: timeline && timeline.trim() !== "" ? timeline : null, 
      })
      .returning();

    const newResearch = result[0];

    // Trigger real-time event to admin dashboard
    await pusherServer.trigger("admin-dashboard", "new-research", {
      id: newResearch.id,
      name: newResearch.name,
      email: newResearch.email,
      business: newResearch.business,
      budget: newResearch.budget,
      research: newResearch.research,
      timeline: newResearch.timeline,
      userId: newResearch.userId,
      createdAt: newResearch.createdAt,
    });

    return NextResponse.json({
      success: true,
      message: "Research request submitted successfully",
      data: newResearch,
    });
  } catch (error) {
    console.error("Research submission error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to submit research request. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
