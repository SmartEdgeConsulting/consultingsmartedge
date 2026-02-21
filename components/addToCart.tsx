"use client";

import { useCartStore } from "@/store/cartStore";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { coursesProps } from "@/types";
import { Loader2 } from "lucide-react";

const AddToCartButton = ({ course }: { course: coursesProps }) => {
  const { addToCart, isInCart, adding } = useCartStore();
  const { user } = useUser();
  console.log(user?.id);
  const inCart = isInCart(course._id);

  return (
    <Button
      variant="default"
      disabled={inCart || adding === course._id}
      onClick={() => addToCart(user?.id ?? null, course)}
      className="min-w-30" 
    >
      {adding === course._id ? (
        <span className="flex items-center justify-center">
          <Loader2 className="h-5 w-5 animate-spin" />
        </span>
      ) : (
        "Add to Cart"
      )}
    </Button>
  );
};

export default AddToCartButton;
