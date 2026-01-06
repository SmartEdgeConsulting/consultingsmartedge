import { FileText } from "lucide-react";
import React from "react";

const NoList = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-linear-to-br from-gray-50 to-slate-50 rounded-2xl border border-gray-200 p-12 text-center">
      <div className="max-w-md mx-auto">
        <div className="bg-gray-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <FileText className="h-8 w-8 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No {title} yet
        </h3>
        <p className="text-gray-600 mb-6">{description}</p>
      </div>
    </div>
  );
};

export default NoList;
