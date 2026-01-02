// app/api/applications/route.ts

import { db } from "@/lib/database";
import { applications } from "@/lib/database/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      careerId,
      name,
      email,
      phoneNumber,
      experience,
      skills,
      portfolio,
      resumeUrl,
    } = body;

    // Validate required fields
    if (!careerId) {
      return NextResponse.json(
        { error: "Career ID is required" },
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

    // Check if user already applied for this career
    const existingApplications = await db
      .select()
      .from(applications)
      .where(
        and(
          eq(applications.userId, userId),
          eq(applications.careerId, careerId)
        )
      );

    if (existingApplications.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "You have already applied to this position",
        },
        { status: 400 }
      );
    }

    // Insert new application
    await db.insert(applications).values({
      careerId,
      userId,
      name,
      email,
      phoneNumber,
      experience,
      skills,
      portfolio,
      resumeUrl,
    });

    return NextResponse.json({
      success: true,
      message: "Application submitted successfully",
    });
  } catch (error) {
    console.error("Application submission error:", error);
    return NextResponse.json(
      {
        error: "Failed to submit application. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const applicationsList = await db.query.applications.findMany({
      with: {
        career: true,
      },
      orderBy: (applications, { desc }) => [desc(applications.createdAt)],
    });

    return NextResponse.json({
      success: true,
      data: applicationsList,
      count: applicationsList.length,
    });
  } catch (error) {
    console.error("Database Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch applications. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
