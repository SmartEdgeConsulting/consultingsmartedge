"use client";

import { useEffect } from "react";
import { ShoppingCart, ArrowRight, Lock, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import CartCard from "@/cards/CartCard";

export default function CartPage() {
  const {
    items,
    fetchCart,
    removeFromCart,
    removing,
    getTotalPrice,
    clearCart,
  } = useCartStore();
  const { user } = useUser();
  const userId = user?.id ?? null;

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId, fetchCart]);

  return (
    <main className="min-h-screen">
      {/* Nav */}
      <div className="">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="mb-5">
            <h1 className="text-4xl font-bold tracking-tighter mb-2 text-primary">
              {items.length === 0 ? "Cart is empty" : "Your Cart"}
            </h1>
            {items.length > 0 && (
              <p className="text-slate-800 text-sm">
                {items.length} course{items.length !== 1 ? "s" : ""} ready for
                checkout
              </p>
            )}
          </div>
          <Link
            href="/courses"
            className="text-sm text-primary hover:underline transition-colors"
          >
            Back to courses
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-10">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <ShoppingCart className="w-8 h-8 text-white/20" />
            </div>
            <h2 className="syne text-2xl font-bold mb-3">Nothing here yet</h2>
            <p className="text-slate-800 text-sm mb-8 max-w-xs leading-relaxed">
              You haven&apos;t added any courses. Head back to the catalog and
              find something worth learning.
            </p>
            <Link
              href="/courses"
              className="checkout-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all active:scale-95"
            >
              Browse Courses <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            {/* Course list */}
            <div className="space-y-3">
              {items.map((item, i) => (
                <CartCard
                  key={item.courseId}
                  item={item}
                  i={i}
                  removing={removing}
                  removeFromCart={removeFromCart}
                  userId={userId}
                />
              ))}

              <button
                onClick={() => clearCart(userId)}
                className="w-full py-3.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 transition-all
    text-gray-400 hover:text-red-400 group"
              >
                <Trash2 className="w-4 h-4 text-gray-400 group-hover:text-red-400 transition-colors" />
                Clear Cart
              </button>
            </div>

            {/* Order summary */}
            <div className="rounded-2xl p-6 sticky top-24 border border-white/6 bg-white">
              <h2 className="syne text-lg font-bold mb-5">Order Summary</h2>

              {/* Item breakdown */}
              <div className="space-y-2.5 mb-5 pb-5 border-b border-white/5">
                {items.map((item) => (
                  <div
                    key={item.courseId}
                    className="flex justify-between gap-3 text-xs text-primary"
                  >
                    <span className="line-clamp-1 flex-1">
                      {item.courseTitle}
                    </span>
                    <span className="shrink-0">{item.coursePrice}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="flex justify-between items-center mb-6">
                <span className="syne font-bold text-base">Total</span>
                <span className="syne text-xl font-extrabold text-gradient-primary">
                  ₦{getTotalPrice().toLocaleString("en-NG")}
                </span>
              </div>

              {/* CTA */}
              <button className="w-full py-3.5 rounded-xl bg-primary text-white text-sm font-semibold flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
                Checkout Now <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-white/20">
                <Lock className="w-3 h-3" />
                256-bit SSL · Secure checkout
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
