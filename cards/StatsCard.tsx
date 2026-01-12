import React from "react";
import { Statistics } from "@/types";

interface StatsCardProps {
  stat: Statistics;
}

const StatsCard = ({ stat }: StatsCardProps) => {
  const { label, value, color, icon: Icon, change } = stat;
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-600">
            {label}
          </p>
          <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">
            {Number(value).toLocaleString()}
          </p>
          <p className="text-sm mt-1 flex items-center gap-1">
            {change !== null && (
              <span
                className={
                  isPositive
                    ? "text-green-500"
                    : isNegative
                      ? "text-red-500"
                      : "text-gray-400"
                }
              >
                {isPositive && "+"}
                {change && `${change}%`}
              </span>
            )}
          </p>
        </div>
        <div className={`${color} p-2 sm:p-3 rounded-lg`}>
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
