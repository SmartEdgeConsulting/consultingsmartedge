// api/registrations/new/route.ts
import { db } from "@/lib/database";
import { registrations } from "@/lib/database/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { pusherServer } from "@/lib/pusher-server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Check for existing registration
    const existingRegistration = await db
      .select()
      .from(registrations)
      .where(eq(registrations.email, body.email))
      .limit(1);

    if (existingRegistration.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: "You have already registered for this bootcamp.",
        },
        { status: 400 }
      );
    }

    // Insert new registration
    const result = await db
      .insert(registrations)
      .values({
        name: body.name,
        email: body.email,
        phoneNo: body.phoneNo,
        gender: body.gender,
        country: body.country,
        occupation: body.occupation,
        education: body.education,
        experience: body.experience,
        interest: body.interest,
        skillOfInterest: body.skillOfInterest,
        sessionAttendance: body.sessionAttendance,
        classHolding: body.classHolding,
        classTiming: body.classTiming,
        connection: body.connection,
        device: body.device,
        heardAboutUs: body.heardAboutUs,
        additionalInfo: body.additionalInfo,
        proofOfPayment: body.proofOfPayment,
        status: "pending",
      })
      .returning();

    const newRegistration = result[0];

    // 3. Trigger real-time event to admin dashboard
    await pusherServer.trigger("admin-dashboard", "new-registration", {
      id: newRegistration.id,
      name: newRegistration.name,
      email: newRegistration.email,
      phoneNo: newRegistration.phoneNo,
      gender: newRegistration.gender,
      proofOfPayment: newRegistration.proofOfPayment,
      status: newRegistration.status,
      createdAt: newRegistration.createdAt,
    });

    return NextResponse.json({
      success: true,
      message: "Registration submitted successfully",
      data: newRegistration,
    });
  } catch (error) {
    console.error("Registration submission error:", error);
    return NextResponse.json(
      {
        error: "Failed to submit registration. Please try again.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
