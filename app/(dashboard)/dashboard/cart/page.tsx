"use client";

import { useEffect } from "react";
import {
  Trash2,
  ShoppingCart,
  ArrowRight,
  BookOpen,
  Clock,
  Users,
  Lock,
  Loader2,
} from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cartStore";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";

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
      <style>{`
        .card-glow { transition: box-shadow 0.2s ease, border-color 0.2s ease; }
        .card-glow:hover { box-shadow: 0 0 0 1px rgba(255,255,255,0.08), 0 8px 40px rgba(0,0,0,0.4); border-color: rgba(255,255,255,0.1) !important; }
        @keyframes tpulse { 0%,100%{opacity:1} 50%{opacity:0.65} }
      `}</style>

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
            className="text-sm text-white/40 hover:text-white/70 transition-colors"
          >
            ← Back to courses
          </Link>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-14">

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
              <ShoppingCart className="w-8 h-8 text-white/20" />
            </div>
            <h2 className="syne text-2xl font-bold mb-3">Nothing here yet</h2>
            <p className="text-white/40 text-sm mb-8 max-w-xs leading-relaxed">
              You haven&apos;t added any courses. Head back to the catalog and
              find something worth learning.
            </p>
            <button className="checkout-btn inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium transition-all active:scale-95">
              Browse Courses <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-8 items-start">
            {/* Course list */}
            <div className="space-y-3">
              {items.map((item, i) => (
                <div
                  key={item.courseId}
                  className="card-glow relative bg-white border border-white/6 rounded-2xl p-5 flex gap-4 items-center"
                >
                  {/* Number badge */}
                  <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0f0f0f] border border-white/10 flex items-center justify-center text-[10px] text-white/25 syne font-semibold">
                    {i + 1}
                  </span>

                  {/* Thumbnail */}
                  <div className="w-18 h-13 rounded-xl overflow-hidden bg-white/5 border border-white/5 shrink-0 flex items-center justify-center">
                    {item.courseThumbnail ? (
                      <Image
                        src={item.courseThumbnail}
                        alt={item.courseTitle}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <BookOpen className="w-5 h-5 text-white/20" />
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-black/90 mb-1.5">
                      {item.courseTitle}
                    </h3>
                    <div className="flex items-center gap-3 text-[11px] text-white/30">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3" />
                      </span>
                    </div>
                  </div>

                  {/* Price + Remove */}
                  <div className="flex flex-col items-end gap-3 shrink-0">
                    <span className="syne font-bold text-base text-white">
                      {item.coursePrice}
                    </span>
                    <button
                      onClick={() => removeFromCart(userId, item.courseId)}
                      className="remove-btn p-1.5 rounded-lg bg-white/5 hover:bg-red-500/10 transition-colors"
                      aria-label="Remove course"
                    >
                      {removing === item.courseId ? (
                        <span className="flex items-center justify-center">
                          <Loader2 className="h-5 w-5 animate-spin" />
                        </span>
                      ) : (
                        <Trash2 className="w-3.5 h-3.5 text-white/30 transition-colors hover:text-[#f87171]" />
                      )}
                    </button>
                  </div>
                </div>
              ))}

              <button
                onClick={() => clearCart(userId)}
                className="w-full py-3.5 rounded-xl text-sm font-semibold syne flex items-center justify-center gap-2 transition-all active:scale-[0.98] bg-white/5 hover:bg-white/10"
              >
                Clear Cart
              </button>
            </div>

            {/* Order summary */}
            <div
              className="rounded-2xl p-6 sticky top-24 border border-white/6"
              style={{
                background: "linear-gradient(145deg, #1a1a1a 0%, #141414 100%)",
              }}
            >
              <h2 className="syne text-lg font-bold mb-5">Order Summary</h2>

              {/* Item breakdown */}
              <div className="space-y-2.5 mb-5 pb-5 border-b border-white/5">
                {items.map((item) => (
                  <div
                    key={item.courseId}
                    className="flex justify-between gap-3 text-xs text-white/35"
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
                <span className="syne text-xl font-extrabold bg-linear-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  ₦{getTotalPrice().toLocaleString("en-NG")}
                </span>
              </div>

              {/* CTA */}
              <button className="checkout-btn w-full py-3.5 rounded-xl text-sm font-semibold syne flex items-center justify-center gap-2 transition-all active:scale-[0.98]">
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
