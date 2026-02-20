"use client";

import { useCartStore } from "@/store/cartStore";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { coursesProps } from "@/types";

const AddToCartButton = ({ course }: { course: coursesProps }) => {
  const { addToCart, isInCart } = useCartStore();
  const { user } = useUser();
  console.log(user?.id)
  const inCart = isInCart(course._id);

  return (
    <Button
      variant="default"
      disabled={inCart}
      onClick={() => addToCart(user?.id ?? null, course)}
    >
      {inCart ? "In Cart" : "Add to Cart"}
    </Button>
  );
};

export default AddToCartButton;