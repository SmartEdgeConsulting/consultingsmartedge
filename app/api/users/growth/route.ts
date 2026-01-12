import { db } from "@/lib/database";
import { users } from "@/lib/database/schema";
import { NextResponse } from "next/server";
import { count, lt } from "drizzle-orm";

export async function GET() {
  try {
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const totalUsers = await db.select({ count: count() }).from(users);

    const weekAgoUsers = await db
      .select({ count: count() })
      .from(users)
      .where(lt(users.createdAt, weekAgo));

    const totalCount = Number(totalUsers[0].count);
    const weekAgoCount = Number(weekAgoUsers[0].count);
    const newThisWeek = totalCount - weekAgoCount;

    const growthPercent =
      weekAgoCount > 0
        ? ((totalCount - weekAgoCount) / weekAgoCount) * 100
        : totalCount > 0
          ? 100
          : 0;

    return NextResponse.json({
      success: true,
      data: {
        totalCount,
        weekAgoCount,
        newThisWeek,
        weeklyChange: Math.round(growthPercent * 10) / 10,
      },
      count: 1,
    });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch user growth. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
