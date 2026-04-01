"use client";

import React, { useState } from "react";
import { Loader2, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import CourseOptionModal from "./CourseOption";
import { coursesProps } from "@/types";
import { useCartStore } from "@/store/cartStore";
import { useUser } from "@clerk/nextjs";

interface AddToCartButtonProps {
  course: coursesProps;
}

const AddToCartButton = ({ course }: AddToCartButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState<
    "self-paced" | "instructor-based" | null
  >(null);

  const { user } = useUser();

  const { addToCart, isInCart, adding } = useCartStore();

  const inCart = isInCart(course._id);
  const isAdding = adding === course._id;

  const handleSelectOption = (method: "self-paced" | "instructor-based") => {
    setSelectedMethod(method);
  };

  const handleAddToCart = async () => {
    if (!selectedMethod) return;

    const courseWithSelectedMethod = {
      ...course,
      deliveryMethod: selectedMethod,
      price:
        selectedMethod === "self-paced"
          ? course.pricing?.selfPacedPrice
          : course.pricing?.instructorPrice,
    };

    await addToCart(user?.id ?? null, courseWithSelectedMethod);

    // Close modal after adding
    setIsModalOpen(false);
    setSelectedMethod(null);
  };

  return (
    <>
      <Button
        onClick={() => setIsModalOpen(true)}
        // disabled={inCart || isAdding}
        disabled
        variant="darkoutline"
        className="min-w-30"
      >
        {isAdding ? (
          <span className="flex items-center justify-center">
            <Loader2 className="h-5 w-5 animate-spin" />
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <ShoppingCart className="w-5 h-5" />
            Add to Cart
          </span>
        )}
      </Button>

      <CourseOptionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedMethod(null);
        }}
        onSelectOption={handleSelectOption}
        onConfirm={handleAddToCart}
        course={course}
        selectedMethod={selectedMethod}
        isAdding={isAdding}
      />
    </>
  );
};

export default AddToCartButton;
