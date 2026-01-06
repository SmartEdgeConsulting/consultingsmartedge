// api/users/route.ts
import { db } from "@/lib/database";
import { users } from "@/lib/database/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const usersList = await db
      .select()
      .from(users)
      .orderBy(desc(users.createdAt));

    return NextResponse.json({
      success: true,
      data: usersList,
      count: usersList.length,
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