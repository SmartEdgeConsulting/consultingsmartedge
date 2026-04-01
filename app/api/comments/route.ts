import { auth, currentUser } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import {
  getCommentsBySlug,
  buildCommentTree,
  createComment,
} from "@/lib/comments";

// GET /api/comments?slug=my-post-slug
export async function GET(req: NextRequest) {
  const slug = req.nextUrl.searchParams.get("slug");

  if (!slug) {
    return Response.json({ error: "slug is required" }, { status: 400 });
  }

  try {
    const flat = await getCommentsBySlug(slug);
    const tree = buildCommentTree(flat);
    return Response.json(tree);
  } catch (err) {
    console.error("GET /api/comments error:", err);
    return Response.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

// POST /api/comments
// Body: { slug: string, body: string, parent_id?: string | null }
export async function POST(req: NextRequest) {
  const { userId } = await auth();

  if (!userId) {
    return Response.json({ error: "You must be signed in to comment" }, { status: 401 });
  }

  try {
    const user = await currentUser();
    const { slug, body, parent_id = null } = await req.json();

    if (!slug || typeof slug !== "string") {
      return Response.json({ error: "slug is required" }, { status: 400 });
    }

    if (!body || typeof body !== "string" || body.trim().length === 0) {
      return Response.json({ error: "Comment body cannot be empty" }, { status: 400 });
    }

    if (body.trim().length > 2000) {
      return Response.json({ error: "Comment must be under 2000 characters" }, { status: 400 });
    }

    const user_name =
      `${user?.firstName ?? ""} ${user?.lastName ?? ""}`.trim() ||
      user?.username ||
      "Anonymous";

    const comment = await createComment({
      post_slug: slug,
      parent_id: parent_id ?? null,
      user_id: userId,
      user_name,
      user_avatar: user?.imageUrl ?? null,
      body: body.trim(),
    });

    return Response.json(comment, { status: 201 });
  } catch (err) {
    console.error("POST /api/comments error:", err);
    return Response.json({ error: "Failed to create comment" }, { status: 500 });
  }
}