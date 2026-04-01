"use client";

import { useUser } from "@clerk/nextjs";
import CommentItem from "./CommentItem";
import CommentForm from "./CommentForm";
import { useComments } from "@/store/commentStore";

type Props = {
  postSlug: string;
};

export default function CommentSection({ postSlug }: Props) {
  const { isSignedIn } = useUser();
  const {
    comments,
    loading,
    error,
    totalCount,
    addTopLevelComment,
    addReply,
    deleteComment,
    refresh,
  } = useComments(postSlug);

  return (
    <section className="w-full max-w-3xl mx-auto py-10">
      {/* Top-level comment form */}
      <div className="mb-8">
        {isSignedIn ? (
          <CommentForm
            postSlug={postSlug}
            parentId={null}
            onSuccess={addTopLevelComment}
            placeholder="What are your thoughts?"
          />
        ) : (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-600 bg-zinc-50 dark:bg-zinc-800/50 py-8 px-6 text-center">
            <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium">
              Join the conversation
            </p>
          </div>
        )}
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
          {totalCount > 1 ? "Comments" : "Comment"}
          <span className="bg-orange-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
            {totalCount}
          </span>
        </div>
      </div>

      {/* Comment list */}
      <div className="space-y-6" aria-live="polite" aria-busy={loading}>
        {/* Loading skeletons */}
        {loading && (
          <div className="space-y-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex gap-3 animate-pulse">
                {/* Avatar */}
                <div className="h-9 w-9 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-700" />
                {/* Lines */}
                <div className="flex-1 space-y-2 pt-1">
                  <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-700" />
                  <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-700" />
                  <div className="h-3 w-3/4 rounded bg-zinc-200 dark:bg-zinc-700" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {error && !loading && (
          <div className="flex flex-col items-center gap-3 rounded-xl border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 py-6 px-4 text-center">
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
            <button
              type="button"
              onClick={refresh}
              className="rounded-lg border border-red-300 dark:border-red-700 px-4 py-1.5 text-sm font-medium text-red-700 dark:text-red-300 transition hover:bg-red-100 dark:hover:bg-red-800/40"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && comments.length === 0 && (
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-zinc-50 dark:bg-zinc-800/40 py-10 px-6 text-center">
            <p className="text-sm text-zinc-400 dark:text-zinc-500">
              No comments yet. Be the first to share your thoughts!
            </p>
          </div>
        )}

        {/* Comment list */}
        {!loading &&
          !error &&
          comments.map((comment) => (
            <CommentItem
              key={comment.id}
              comment={comment}
              postSlug={postSlug}
              depth={0}
              onDelete={deleteComment}
              onReplyAdded={addReply}
            />
          ))}
      </div>
    </section>
  );
}
