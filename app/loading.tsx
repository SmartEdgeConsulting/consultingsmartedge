import { Loader2 } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <main className="min-h-screen flex justify-center items-center px-4 h-64">
      <Loader2 className="h-8 w-8 animate-spin" />
    </main>
  );
};

export default loading;
