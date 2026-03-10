// components/CourseOption.tsx
"use client";

import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { coursesProps } from "@/types";
import { Check, ShoppingCart } from "lucide-react";

interface CourseOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectOption: (method: "self-paced" | "instructor-based") => void;
  onConfirm: () => Promise<void>;
  course: coursesProps;
  selectedMethod: "self-paced" | "instructor-based" | null;
  isAdding: boolean;
}

const CourseOptionModal = ({
  isOpen,
  onClose,
  onSelectOption,
  onConfirm,
  course,
  selectedMethod,
  isAdding,
}: CourseOptionModalProps) => {
  const getAvailableOptions = () => {
    const options = [];
    const { deliveryMethod, selfPacedPrice, instructorPrice, currency } =
      course.pricing || {};

    const currencySymbol =
      currency === "NGN" ? "₦"
        : currency === "EUR" ? "€"
          : currency === "GBP" ? "£"
            : "$";

    if (deliveryMethod === "self-paced" || deliveryMethod === "both") {
      options.push({
        id: "self-paced",
        name: "Self-Paced Learning",
        price: selfPacedPrice || 0,
        formattedPrice: `${currencySymbol}${selfPacedPrice?.toLocaleString() || "0"}`,
        description:
          "Learn at your own pace with lifetime access to all course materials",
        icon: "🎯",
      });
    }

    if (deliveryMethod === "instructor-based" || deliveryMethod === "both") {
      options.push({
        id: "instructor-based",
        name: "Instructor-Led Learning",
        price: instructorPrice || 0,
        formattedPrice: `${currencySymbol}${instructorPrice?.toLocaleString() || "0"}`,
        description:
          "Live sessions, personalized feedback, and direct mentorship",
        icon: "👨‍🏫",
      });
    }

    return options;
  };

  const availableOptions = getAvailableOptions();

  // Get the selected option details for display
  const selectedOptionDetails = availableOptions.find(
    opt => opt.id === selectedMethod
  );

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl">Choose Delivery Method</DialogTitle>
          <DialogDescription className="text-stone-500">
            How would you like to take{" "}
            <span className="font-semibold text-stone-700">{course.title}</span>
            ?
          </DialogDescription>
        </DialogHeader>

        {/* Options */}
        <div className="space-y-3 py-4">
          {availableOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelectOption(option.id as "self-paced" | "instructor-based")}
              className={`
                w-full p-4 border-2 rounded-xl transition-all text-left group
                ${selectedMethod === option.id 
                  ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20' 
                  : 'border-stone-200 hover:border-amber-200 hover:bg-amber-50/30'
                }
              `}
            >
              <div className="flex items-start gap-4">
                <span className="text-2xl">{option.icon}</span>
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <h4 className="font-semibold text-stone-900 group-hover:text-amber-700">
                      {option.name}
                    </h4>
                    <span className="font-bold text-amber-600">
                      {option.formattedPrice}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 mt-1">
                    {option.description}
                  </p>
                </div>
                {selectedMethod === option.id && (
                  <Check className="w-5 h-5 text-amber-500" />
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Selected option summary */}
        {selectedMethod && selectedOptionDetails && (
          <div className="bg-stone-50 p-3 rounded-lg mb-2">
            <p className="text-sm text-stone-600">
              You selected: <span className="font-semibold">{selectedOptionDetails.name}</span>
            </p>
            <p className="text-lg font-bold text-amber-600">
              Price: {selectedOptionDetails.formattedPrice}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button 
            variant="outline" 
            onClick={onClose} 
            className="flex-1"
            disabled={isAdding}
          >
            Cancel
          </Button>
          <Button 
            onClick={onConfirm}
            disabled={!selectedMethod || isAdding}
            className="flex-1 gap-2 bg-amber-500 hover:bg-amber-600"
          >
            <ShoppingCart className="w-4 h-4" />
            {isAdding 
              ? "Adding..." 
              : selectedMethod 
                ? `Add ${selectedMethod === "self-paced" ? "Self-Paced" : "Instructor-Led"}`
                : "Select an Option"
            }
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CourseOptionModal;