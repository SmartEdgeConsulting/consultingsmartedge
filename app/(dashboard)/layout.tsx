// app/(dashboard)/layout.tsx
"use client";

import DashboardNav from "@/sections/DashboardNav";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, isSignedIn } = useUser();

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      redirect("/login");
    }
  }, [isLoaded, isSignedIn]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <DashboardNav /> {/* Dashboard navbar */}
      <main className="min-h-screen bg-gray-50 pt-16">
        {children}
      </main>
    </>
  );
}