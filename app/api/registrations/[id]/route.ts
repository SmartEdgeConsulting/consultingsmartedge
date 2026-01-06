// app/api/registrations/[id]/route.ts
import { db } from "@/lib/database";
import { registrations } from "@/lib/database/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { Resend } from "resend";
import { getEmailContent } from "@/lib/getEmailContent";
import { Params } from "@/types";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(
  req: NextRequest,
  { params }: Params
): Promise<NextResponse> {
  try {
    const body = await req.json();
    const { data: newStatus } = body;
    const { id: regId } = await params;

    if (!regId) {
      return NextResponse.json(
        { success: false, error: "Registration ID not provided" },
        { status: 400 }
      );
    }

    // Validate status
    if (!["pending", "accepted", "rejected"].includes(newStatus)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    // Get the registration details first
    const [registration] = await db
      .select()
      .from(registrations)
      .where(eq(registrations.id, regId))
      .limit(1);

    if (!registration) {
      return NextResponse.json(
        { success: false, error: "Registration not found" },
        { status: 404 }
      );
    }

    // Update the status in the database
    await db
      .update(registrations)
      .set({
        status: newStatus,
        updatedAt: new Date(),
      })
      .where(eq(registrations.id, regId));

    // Send email notification only for accepted or rejected status
    if (newStatus === "accepted" || newStatus === "rejected") {
      try {
        const emailContent = getEmailContent(newStatus, registration.name);

        await resend.emails.send({
          from: "SmartEdge Consulting <noreply@consultingsmartedge.com>",
          to: registration.email,
          subject: emailContent.subject,
          html: emailContent.html,
        });

        console.log(
          `Email sent to ${registration.email} for status: ${newStatus}`
        );
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    }

    return NextResponse.json({
      success: true,
      message: `Status updated to ${newStatus}${newStatus !== "pending" ? " and email sent" : ""}`,
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
