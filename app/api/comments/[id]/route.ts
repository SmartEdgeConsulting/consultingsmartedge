import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { deleteComment } from "@/lib/comments";
import { Params } from "@/types";

// DELETE /api/comments/:id
export async function DELETE(
  req: NextRequest,
  { params }: Params,
): Promise<NextResponse> {
  const { userId } = await auth();
  const { id } = await params;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const deleted = await deleteComment(id, userId);

    if (!deleted) {
      return NextResponse.json(
        {
          error: "Comment not found or you don't have permission to delete it",
        },
        { status: 404 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("DELETE /api/comments/[id] error:", err);
    return NextResponse.json(
      { error: "Failed to delete comment" },
      { status: 500 },
    );
  }
}
