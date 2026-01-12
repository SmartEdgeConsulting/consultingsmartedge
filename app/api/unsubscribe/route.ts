import { NextResponse } from "next/server";
import { db } from "@/lib/database";
import { subscribers } from "@/lib/database/schema";
import { eq } from "drizzle-orm";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !isValidEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    // Check if subscriber exists
    const existingSubscriber = await db
      .select()
      .from(subscribers)
      .where(eq(subscribers.email, email.toLowerCase()))
      .limit(1);

    if (existingSubscriber.length === 0) {
      return NextResponse.json(
        { error: "Email not found in our subscriber list" },
        { status: 404 }
      );
    }

    // Check if already unsubscribed
    if (existingSubscriber[0].status === "unsubscribed") {
      return NextResponse.json(
        { message: "Email is already unsubscribed" },
        { status: 200 }
      );
    }

    // Update subscriber status to unsubscribed
    await db
      .update(subscribers)
      .set({
        status: "unsubscribed",
        unsubscribedAt: new Date(),
      })
      .where(eq(subscribers.email, email.toLowerCase()));

    return NextResponse.json(
      { message: "Successfully unsubscribed" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json(
      { error: "Failed to unsubscribe. Please try again." },
      { status: 500 }
    );
  }
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}