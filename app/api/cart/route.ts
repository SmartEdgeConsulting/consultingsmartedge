//api/consultations/new/route.ts
import { db } from "@/lib/database";
import { cartItems } from "@/lib/database/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      userId,
      courseId,
      courseSlug,
      courseTitle,
      coursePrice,
      courseThumbnail,
    } = body;

    // Validate data
    if (!courseId || !courseSlug || !courseTitle || !coursePrice) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Get authenticated user
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "Unauthorized. Please sign in to add items to cart." },
        { status: 401 },
      );
    }

    // Verify the userId from request matches the authenticated user
    if (userId !== clerkUserId) {
      return NextResponse.json({ error: "User ID mismatch" }, { status: 403 });
    }

    // Check if item already exists in cart
    const existingItem = await db
      .select()
      .from(cartItems)
      .where(
        and(
          eq(cartItems.userId, clerkUserId),
          eq(cartItems.courseId, courseId),
        ),
      );

    if (existingItem.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "This course is already in your cart",
        },
        { status: 400 },
      );
    }

    // Insert new consultation
    const result = await db
      .insert(cartItems)
      .values({
        userId: clerkUserId,
        courseId,
        courseSlug,
        courseTitle,
        coursePrice,
        courseThumbnail: courseThumbnail || null,
        quantity: "1",
      })
      .returning();

    const newItem = result[0];

    return NextResponse.json({
      success: true,
      message: "Course added to cart successfully",
      item: newItem,
    });
  } catch (error) {
    console.error("Course addition error:", error);
    return NextResponse.json(
      {
        error: "Failed to add course to cart. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}


export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const requestedUserId = searchParams.get("userId");

    // Get authenticated user
    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    // Verify user is requesting their own cart
    if (requestedUserId && requestedUserId !== clerkUserId) {
      return NextResponse.json(
        { error: "Access denied" },
        { status: 403 },
      );
    }

    const items = await db
      .select()
      .from(cartItems)
      .where(eq(cartItems.userId, clerkUserId))
      .orderBy(cartItems.addedAt);

    return NextResponse.json({ 
      success: true, 
      items 
    });

  } catch (error) {
    console.error("Fetch cart error:", error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 },
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { courseId } = body;

    const { userId: clerkUserId } = await auth();

    if (!clerkUserId) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 },
      );
    }

    await db
      .delete(cartItems)
      .where(
        and(
          eq(cartItems.userId, clerkUserId),
          eq(cartItems.courseId, courseId)
        )
      );

    return NextResponse.json({ 
      success: true, 
      message: "Item removed from cart" 
    });

  } catch (error) {
    console.error("Delete cart error:", error);
    return NextResponse.json(
      { error: "Failed to remove from cart" },
      { status: 500 },
    );
  }
}