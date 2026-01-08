// app/api/users/growth/route.ts
import { db } from "@/lib/database";
import { users } from "@/lib/database/schema";
import { NextResponse } from "next/server";
import { count, gte, lt } from "drizzle-orm";

export async function GET() {
  try {
    // 🔥 Fix: Convert ISO string → Date object
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000); // ✅ Date object

    // 🔥 Query 1: Total users (ALL TIME)
    const totalUsers = await db
      .select({ count: count() })
      .from(users);

    // 🔥 Query 2: Users OLDER than 7 days ago
    const weekAgoUsers = await db
      .select({ count: count() })
      .from(users)
      .where(lt(users.createdAt, weekAgo)); // ✅ lt() + Date object

    // 🔥 Query 3: New users THIS WEEK
    const newUsersThisWeek = await db
      .select({ count: count() })
      .from(users)
      .where(gte(users.createdAt, weekAgo)); // ✅ gte() + Date object

    const totalCount = Number(totalUsers[0].count);
    const weekAgoCount = Number(weekAgoUsers[0].count);
    const newThisWeek = Number(newUsersThisWeek[0].count);

    // 🧮 Growth formula: (new total - old total) / old total * 100
    const growthPercent = weekAgoCount > 0 
      ? ((totalCount - weekAgoCount) / weekAgoCount) * 100 
      : totalCount > 0 ? 100 : 0;

    return NextResponse.json({
      success: true,
      data: {
        totalCount,           // 1234
        weekAgoCount,         // 1189
        newThisWeek,          // 45
        weeklyChange: Math.round(growthPercent * 10) / 10, // 25.3
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
