"use client";

import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import CommentForm from "./CommentForm";
import { PostComment } from "@/types";
import { Avatar, AvatarFallback } from "./ui/avatar";

type Props = {
  comment: PostComment;
  postSlug: string;
  depth?: number;
  onDelete: (id: string) => void;
  onReplyAdded: (parentId: string, reply: PostComment) => void;
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 30) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString();
}

function getInitials(name: string | null | undefined): string {
  if (!name) return "US";
  return name
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
}

export default function CommentItem({
  comment,
  postSlug,
  depth = 0,
  onDelete,
  onReplyAdded,
}: Props) {
  const { isSignedIn, user } = useUser();
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const isOwner = isSignedIn && user?.id === comment.user_id;
  const hasReplies = comment.replies && comment.replies.length > 0;
  const indentLevel = Math.min(depth, 6);

  const handleDelete = async () => {
    if (!confirm("Delete this comment?")) return;
    setIsDeleting(true);
    try {
      const res = await fetch(`/api/comments/${comment.id}`, {
        method: "DELETE",
      });
      if (res.ok) onDelete(comment.id);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleReplySuccess = (newReply: PostComment) => {
    onReplyAdded(comment.id, { ...newReply, replies: [] });
    setShowReplyForm(false);
  };

  return (
    <div
      className="relative"
      style={{ marginLeft: `${indentLevel * 1.25}rem` }}
    >
      {/* Thread line for nested comments */}
      {depth > 0 && (
        <div className="absolute left-0 top-0 bottom-0 w-px bg-zinc-200 dark:bg-zinc-700 -translate-x-3" />
      )}

      <div className="flex flex-col gap-2">
        <div className="flex gap-3 py-4 border-b border-gray-100">
          <Avatar className="size-10 shrink-0 border-2 border-transparent hover:border-gray-300 transition-colors duration-200">
            <AvatarFallback className="bg-blue-100 text-blue-800 font-semibold">
              {getInitials(comment.user_name)}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-sm font-medium text-gray-900">
                {comment.user_name}
              </span>
              <span className="text-xs text-gray-400">
                {timeAgo(comment.created_at)}
              </span>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed wrap-break-word">
              {comment.body}
            </p>

            <div className="flex items-center gap-2 mt-2">
              {isSignedIn && (
                <button
                  type="button"
                  onClick={() => setShowReplyForm(!showReplyForm)}
                  className="text-xs text-stone-500 hover:text-amber-400 transition-colors"
                >
                  {showReplyForm ? "Cancel" : "↩ Reply"}
                </button>
              )}
              {isOwner && (
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="text-xs text-red-500 hover:text-red-400 transition-colors disabled:opacity-50"
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </button>
              )}
              {hasReplies && (
                <button
                  type="button"
                  onClick={() => setCollapsed(!collapsed)}
                  className="text-xs text-stone-400 hover:text-stone-200 transition-colors"
                >
                  {collapsed
                    ? `Show ${comment.replies!.length} repl${comment.replies!.length === 1 ? "y" : "ies"}`
                    : "Hide"}
                </button>
              )}
            </div>
          </div>
        </div>

        {!collapsed && (
          <>
            {showReplyForm && isSignedIn && (
              <div className="mt-2">
                <CommentForm
                  postSlug={postSlug}
                  parentId={comment.id}
                  onSuccess={handleReplySuccess}
                  onCancel={() => setShowReplyForm(false)}
                  placeholder={`Reply to ${comment.user_name}...`}
                  autoFocus
                />
              </div>
            )}

            {hasReplies && (
              <div className="mt-3 space-y-4">
                {comment.replies!.map((reply) => (
                  <CommentItem
                    key={reply.id}
                    comment={reply}
                    postSlug={postSlug}
                    depth={depth + 1}
                    onDelete={onDelete}
                    onReplyAdded={onReplyAdded}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
