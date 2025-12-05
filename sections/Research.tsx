import { offers } from "@/lib/data";
import React from "react";
import * as Icons from "lucide-react";

const Research = () => {
  return (
    <header className="py-8 sm:py-12 lg:py-16 ">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-primary mb-8 max-w-5xl mx-auto text-center">What We Deliver</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {offers.map((offer) => {
            const Icon = Icons[
              offer.icon as keyof typeof Icons
            ] as React.ComponentType<{
              size?: number;
              strokeWidth?: number;
              className?: string;
            }>;

            return (
              <div key={offer.id} className="flex items-center my-4 gap-4">
                <div className="shrink-0 mr-4 bg-secondary/20 rounded-md p-2">
                  {Icon && (
                    <Icon
                      size={30}
                      className="text-secondary"
                      strokeWidth={2}
                    />
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-medium text-primary">
                    {offer.title}
                  </h4>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Research;
