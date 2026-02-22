import { CartItemWithDetails } from "@/store/cartStore";
import { BookOpen, Clock, Loader2, Trash2, Users } from "lucide-react";
import Image from "next/image";
import React from "react";

const CartCard = ({
  item,
  i,
  removing,
  removeFromCart,
  userId,
}: {
  item: CartItemWithDetails;
  i: number;
  removing: string | null;
  removeFromCart: (userId: string | null, courseId: string) => Promise<void>;
  userId: string | null;
}) => {
  return (
    <div
      key={item.courseId}
      className="relative bg-white border border-white/6 rounded-2xl p-5 flex gap-4 items-center"
    >
      {/* Number badge */}
      <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary border border-white/10 flex items-center justify-center text-[10px] text-white font-semibold">
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
          <BookOpen className="w-5 h-5 text-primary opacity-50" />
        )}
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-black/90 mb-1.5">
          {item.courseTitle}
        </h3>
        <div className="flex items-center gap-3 text-[11px]">
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
        <span className="font-bold text-base text-gradient-primary" >
          {item.coursePrice}
        </span>
        <button
          onClick={() => removeFromCart(userId, item.courseId)}
          className="p-1.5 rounded-lg"
          aria-label="Remove course"
        >
          {removing === item.courseId ? (
            <span className="flex items-center justify-center">
              <Loader2 className="h-5 w-5 animate-spin text-red-500" />
            </span>
          ) : (
            <Trash2 className="w-3.5 h-3.5  text-red-500 transition-colors hover:text-[#f87171]" />
          )}
        </button>
      </div>
    </div>
  );
};

export default CartCard;
