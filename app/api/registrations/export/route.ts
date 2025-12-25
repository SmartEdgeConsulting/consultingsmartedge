// api/registrations/export/route.ts
import { db } from "@/lib/database";
import { registrations } from "@/lib/database/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const registrationsList = await db
      .select()
      .from(registrations)
      .orderBy(desc(registrations.createdAt));

    // Convert to CSV
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone Number",
      "Gender",
      "Country",
      "Occupation",
      "Education",
      "Experience",
      "Interest",
      "Skills of Interest",
      "Session Attendance",
      "Class Holding",
      "Class Timing",
      "Connection",
      "Device",
      "Heard About Us",
      "Additional Info",
      "Proof of Payment",
      "Status",
      "Created At",
      "Updated At",
    ];

    const csvRows = [headers.join(",")];

    for (const reg of registrationsList) {
      const row = [
        reg.id,
        `"${reg.name}"`,
        reg.email,
        reg.phoneNo,
        reg.gender,
        `"${reg.country}"`,
        reg.occupation,
        `"${reg.education}"`,
        reg.experience,
        `"${reg.interest}"`,
        `"${Array.isArray(reg.skillOfInterest) ? reg.skillOfInterest.join("; ") : reg.skillOfInterest}"`,
        reg.sessionAttendance,
        reg.classHolding,
        reg.classTiming,
        reg.connection,
        reg.device,
        `"${reg.heardAboutUs}"`,
        `"${reg.additionalInfo || ""}"`,
        reg.proofOfPayment,
        reg.status,
        new Date(reg.createdAt).toISOString(),
        new Date(reg.updatedAt).toISOString(),
      ];
      csvRows.push(row.join(","));
    }

    const csv = csvRows.join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="registrations-${new Date().toISOString()}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to export registrations.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}