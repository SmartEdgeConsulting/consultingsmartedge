import { eq } from "drizzle-orm";
import { db } from "./database";
import { comments } from "@/lib/database/schema";
import { PostComment } from "@/types";

export async function getCommentsBySlug(slug: string): Promise<PostComment[]> {
  const rows = await db
    .select()
    .from(comments)
    .where(eq(comments.post_slug, slug))
    .orderBy(comments.created_at);

  return rows.map((row) => ({
    ...row,
    created_at: row.created_at?.toISOString() || new Date().toISOString(),
  }));
}

export function buildCommentTree(comments: PostComment[]): PostComment[] {
  const map = new Map<string, PostComment>();
  const roots: PostComment[] = [];

  // First pass: map all comments by id and init replies array
  for (const comment of comments) {
    map.set(comment.id, { ...comment, replies: [] });
  }

  // Second pass: assign children to their parents
  for (const comment of map.values()) {
    if (comment.parent_id === null) {
      roots.push(comment);
    } else {
      const parent = map.get(comment.parent_id);
      if (parent) {
        parent.replies!.push(comment);
      } else {
        // Parent was deleted but child still exists — show as top-level
        roots.push(comment);
      }
    }
  }

  return roots;
}

export async function createComment({
  post_slug,
  parent_id,
  user_id,
  user_name,
  user_avatar,
  body,
}: {
  post_slug: string;
  parent_id: string | null;
  user_id: string;
  user_name: string;
  user_avatar: string | null;
  body: string;
}): Promise<PostComment> {
  const rows = await db
    .insert(comments)
    .values({
      post_slug,
      parent_id: parent_id ?? null,
      user_id: user_id,
      user_name: user_name,
      user_avatar: user_avatar,
      body,
    })
    .returning();

  const row = rows[0];

  return {
    id: row.id,
    post_slug: row.post_slug,
    parent_id: row.parent_id,
    user_id: row.user_id,
    user_name: row.user_name,
    user_avatar: row.user_avatar,
    body: row.body,
    created_at: row.created_at?.toISOString() || new Date().toISOString(),
  };
}

export async function deleteComment(
  id: string,
  user_id: string,
): Promise<boolean> {
  const rows = await db
    .delete(comments)
    .where(eq(comments.id, id) && eq(comments.user_id, user_id)) 
    .returning({ id: comments.id });

  return rows.length > 0;
}
