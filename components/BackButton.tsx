"use client";

import { ArrowLeft } from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";

const BackButton = () => {
  const router = useRouter();

  return (
    <div className="mt-20">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 hover:text-stone-800 transition-colors tracking-wide font-sans"
      >
        <ArrowLeft /> All Articles
      </button>
    </div>
  );
};

export default BackButton;
