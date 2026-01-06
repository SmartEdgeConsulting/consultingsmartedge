// api/researchs/export/route.ts
import { db } from "@/lib/database";
import { researchs } from "@/lib/database/schema";
import { NextResponse } from "next/server";
import { desc } from "drizzle-orm";

export async function GET() {
  try {
    const researchsList = await db
      .select()
      .from(researchs)
      .orderBy(desc(researchs.createdAt));

    // Convert to CSV
    const headers = [
      "ID",
      "Name",
      "Email",
      "Business",
      "Budget",
      "Research",
      "Timeline",
      "Created At",
      "Updated At",
    ];

    const csvRows = [headers.join(",")];

    for (const reg of researchsList) {
      const row = [
        reg.id,
        `"${reg.name}"`,
        reg.email,
        reg.business,
        reg.budget,
        `"${reg.research}"`,
        reg.timeline,
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
        "Content-Disposition": `attachment; filename="researchs-${new Date().toISOString()}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to export researchs.",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
