// api/consultations/export/route.ts
import { db } from "@/lib/database";
import { consultations } from "@/lib/database/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const consultationsList = await db
      .select()
      .from(consultations)
      .orderBy(desc(consultations.createdAt));

    // Convert to CSV
    const headers = [
      "ID",
      "Name",
      "Email",
      "Company",
      "Challenge",
      "Status",
      "Created At",
    ];
    
    const csvRows = [headers.join(",")];

    for (const reg of consultationsList) {
      const row = [
        reg.id,
        `"${reg.name}"`,
        reg.email,
        reg.company,
        reg.challenge,
        reg.status,
        new Date(reg.createdAt).toISOString(),
      ];
      csvRows.push(row.join(","));
    }

    const csv = csvRows.join("\n");

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="consultations-${new Date().toISOString()}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to export consultations.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
