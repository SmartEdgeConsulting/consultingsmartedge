// stores/cartStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CartItem } from "@/lib/database/schema";
import { coursesProps, SanityImage } from "@/types";
import { urlFor } from "@/lib/utils/image-builder";

export interface CartItemWithDetails extends Partial<CartItem> {
  _id?: string; // Drizzle UUID (for existing DB items)
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  coursePrice: string;
  courseThumbnail?: string;
  quantity: string;
  addedAt?: Date;
}

interface CartStore {
  // State
  items: CartItemWithDetails[];
  isLoading: boolean;
  error: string | null;

  // Actions
  fetchCart: (userId: string) => Promise<void>;
  addToCart: (userId: string | null, course: coursesProps) => Promise<void>;
  removeFromCart: (userId: string | null, courseId: string) => Promise<void>;
  clearCart: (userId: string | null) => Promise<void>;

  // Computed
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (courseId: string) => boolean;
}

function resolveThumbnailUrl(image?: SanityImage): string | undefined {
  if (!image?.asset) return undefined;
  return urlFor(image.asset).url();
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      // Initial state
      items: [],
      isLoading: false,
      error: null,

      fetchCart: async (userId: string) => {
        if (!userId) return;

        set({ isLoading: true, error: null });
        try {
          const response = await fetch(`/api/cart?userId=${userId}`);
          if (!response.ok) throw new Error("Failed to fetch cart");

          const data = await response.json();

          set({ items: data.items ?? [] });
        } catch (error) {
          set({ error: (error as Error).message });
          console.error("Error fetching cart:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      addToCart: async (userId: string | null, course: coursesProps) => {
        if (!userId) {
          window.location.href = "/sign-in?redirect=/courses";
          return;
        }

        if (get().isInCart(course._id)) return;

        set({ isLoading: true, error: null });

        const newItem: CartItemWithDetails = {
          courseId: course._id,
          courseSlug: course.slug?.current ?? "",
          courseTitle: course.title,
          coursePrice: course.price.toString(),
          courseThumbnail: resolveThumbnailUrl(course.thumbnail),
          quantity: "1",
        };

        // Optimistic update
        set((state) => ({ items: [...state.items, newItem] }));

        try {
          const response = await fetch("/api/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              userId,
              courseId: course._id,
              courseSlug: course.slug?.current ?? "",
              courseTitle: course.title,
              coursePrice: course.price.toString(),
              courseThumbnail: resolveThumbnailUrl(course.thumbnail) ?? null,
            }),
          });

          if (!response.ok) {
            // Revert optimistic update on error
            set((state) => ({
              items: state.items.filter((item) => item.courseId !== course._id),
            }));
            throw new Error("Failed to add to cart");
          }

          const data = await response.json();

          // Stamp the real DB id onto the optimistic item
          set((state) => ({
            items: state.items.map((item) =>
              item.courseId === course._id
                ? { ...item, _id: data.item.id }
                : item,
            ),
          }));
        } catch (error) {
          set({ error: (error as Error).message });
          console.error("Error adding to cart:", error);
        } finally {
          set({ isLoading: false });
        }
      },

      removeFromCart: async (userId: string | null, courseId: string) => {
        if (!userId) return;

        const previousItems = get().items;

        // Optimistic update
        set((state) => ({
          items: state.items.filter((item) => item.courseId !== courseId),
        }));

        try {
          const response = await fetch("/api/cart", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId, courseId }),
          });

          if (!response.ok) {
            set({ items: previousItems });
            throw new Error("Failed to remove from cart");
          }
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },

      clearCart: async (userId: string | null) => {
        if (!userId) return;

        // FIX: save previous items so we can revert on API failure
        const previousItems = get().items;
        set({ items: [] });

        try {
          const response = await fetch("/api/cart/clear", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId }),
          });

          if (!response.ok) {
            set({ items: previousItems }); // FIX: revert on failure
            throw new Error("Failed to clear cart");
          }
        } catch (error) {
          set({ error: (error as Error).message });
        }
      },

      // ─── Computed: total item count ───────────────────────────────────────
      getTotalItems: () => {
        return get().items.reduce(
          (total, item) => total + Number(item.quantity),
          0,
        );
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) =>
            total + Number(item.coursePrice) * Number(item.quantity),
          0,
        );
      },

      isInCart: (courseId: string) => {
        return get().items.some((item) => item.courseId === courseId);
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({
        // Persist items without the thumbnail (re-fetched from Sanity when needed)
        // courseThumbnail is omitted intentionally — it can be large and is not
        // needed for correctness; fetchCart re-hydrates from the DB on next load.
        items: state.items.map(({ courseThumbnail, ...rest }) => rest),
      }),
    },
  ),
);
