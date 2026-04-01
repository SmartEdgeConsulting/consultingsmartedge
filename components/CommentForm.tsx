"use client";

import { PostComment } from "@/types";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

type Props = {
  postSlug: string;
  parentId?: string | null;
  onSuccess: (comment: PostComment) => void;
  onCancel?: () => void;
  placeholder?: string;
  autoFocus?: boolean;
  userAvatar?: string;
  userName?: string | null;
};

export default function CommentForm({
  postSlug,
  parentId = null,
  onSuccess,
  onCancel,
  placeholder = "Share your thoughts...",
  autoFocus = false,
}: Props) {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { isSignedIn } = useUser();

  const handleSubmit = async () => {
    if (!body.trim()) return;

    if (!isSignedIn) {
      setError("Please sign in to comment");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: postSlug, body, parent_id: parentId }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || `Failed to post comment: ${res.status}`);
        return;
      }

      setBody("");
      onSuccess(data);
    } catch (err) {
      console.error("Comment submission error:", err);
      setError(
        err instanceof Error ? err.message : "Network error, please try again",
      );
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="flex gap-3 items-start">
        <div className="flex-1">
          <div className="bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-sm text-stone-400">
            Please sign in to comment
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <textarea
          value={body}
          rows={3}
          disabled={loading}
          onChange={(e) => setBody(e.target.value)}
          placeholder={placeholder}
          className="w-full text-sm text-gray-800 placeholder-gray-400 resize-none outline-none"
        />
        <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-3">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-3 py-1.5 text-xs text-stone-500 hover:text-stone-200 transition-colors rounded-md hover:bg-white/5 disabled:opacity-50"
            >
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || !body.trim()}
            className="px-4 py-1.5 text-xs font-medium text-white bg-gradient-primary rounded-md hover:bg-amber-400 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Posting..." : parentId ? "Reply" : "Comment"}
          </button>
        </div>
      </div>
      <div className="flex-1 min-w-0">
        {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
      </div>
    </div>
  );
}
