import { Loader2 } from "lucide-react";
import React from "react";

const AdminLoader = ({ title }: { title: string }) => {
  return (
    <div className="flex justify-center items-center h-64">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
        <p className="text-lg font-medium text-gray-700">Loading {title}...</p>
        <p className="text-sm text-gray-500 mt-1">
          Please wait while we fetch your data
        </p>
      </div>
    </div>
  );
};

export default AdminLoader;
