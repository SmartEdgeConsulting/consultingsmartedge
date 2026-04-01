"use client";

import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { toast } from "sonner";
import { PostComment } from "@/types";
import { useEffect } from "react";

interface CommentsState {
  // State
  comments: PostComment[];
  loading: boolean;
  error: string | null;
  activePostSlug: string | null;

  // Actions
  setActivePost: (slug: string) => void;
  fetchComments: (postSlug: string) => Promise<void>;
  clearComments: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Comment mutations
  addTopLevelComment: (comment: PostComment) => void;
  addReply: (parentId: string, reply: PostComment) => void;
  deleteComment: (id: string) => void;

  // Utilities
  getTotalCount: () => number;
}

function insertReply(
  comments: PostComment[],
  parentId: string,
  reply: PostComment,
): PostComment[] {
  return comments.map((comment) => {
    if (comment.id === parentId) {
      return {
        ...comment,
        replies: [...(comment.replies || []), { ...reply, replies: [] }],
      };
    }
    if (comment.replies && comment.replies.length > 0) {
      return {
        ...comment,
        replies: insertReply(comment.replies, parentId, reply),
      };
    }
    return comment;
  });
}

function removeComment(comments: PostComment[], id: string): PostComment[] {
  return comments
    .filter((comment) => comment.id !== id)
    .map((comment) => ({
      ...comment,
      replies: comment.replies ? removeComment(comment.replies, id) : [],
    }));
}

function countAll(comments: PostComment[]): number {
  return comments.reduce(
    (acc, comment) => acc + 1 + countAll(comment.replies || []),
    0,
  );
}

export const useCommentsStore = create<CommentsState>()(
  devtools(
    (set, get) => ({
      // Initial state
      comments: [],
      loading: true,
      error: null,
      activePostSlug: null,

      // Set which post we're viewing
      setActivePost: (slug: string) => {
        set({ activePostSlug: slug });
      },

      // Fetch comments for a specific post
      fetchComments: async (postSlug: string) => {
        set({ loading: true, error: null, activePostSlug: postSlug });

        try {
          const res = await fetch(`/api/comments?slug=${postSlug}`);

          if (!res.ok) {
            console.log(
              "Error fetching comments:",
              res.status,
              res.statusText,
            );
          }

          const data = await res.json();
          set({ comments: data, loading: false });
        } catch (error) {
          console.error("Error fetching comments:", error);
          set({
            error: "Could not load comments. Please refresh.",
            loading: false,
          });
          toast.error("Failed to load comments");
        }
      },

      // Clear comments (useful when navigating away)
      clearComments: () => {
        set({ comments: [], activePostSlug: null });
      },

      // Add a new top-level comment
      addTopLevelComment: (comment: PostComment) => {
        set((state) => ({
          comments: [...state.comments, { ...comment, replies: [] }],
        }));
        toast.success("Comment added!");
      },

      // Add a reply to an existing comment
      addReply: (parentId: string, reply: PostComment) => {
        set((state) => ({
          comments: insertReply(state.comments, parentId, {
            ...reply,
            replies: [],
          }),
        }));
        toast.success("Reply added!");
      },

      // Delete a comment (handles nested deletion automatically)
      deleteComment: (id: string) => {
        set((state) => ({
          comments: removeComment(state.comments, id),
        }));
        toast.success("Comment deleted");
      },

      // Get total comment count including nested replies
      getTotalCount: () => {
        return countAll(get().comments);
      },

      // Setters
      setLoading: (loading: boolean) => set({ loading }),
      setError: (error: string | null) => set({ error }),
    }),
    { name: "comments-store" },
  ),
);

// Optional: Hook to automatically fetch comments when post slug changes
export function useComments(postSlug: string) {
  const {
    comments,
    loading,
    error,
    fetchComments,
    addTopLevelComment,
    addReply,
    deleteComment,
    getTotalCount,
  } = useCommentsStore();

  useEffect(() => {
    fetchComments(postSlug);

    return () => {
      useCommentsStore.getState().clearComments();
    };
  }, [postSlug, fetchComments]);

  return {
    comments,
    loading,
    error,
    totalCount: getTotalCount(),
    addTopLevelComment,
    addReply,
    deleteComment,
    refresh: () => fetchComments(postSlug),
  };
}
