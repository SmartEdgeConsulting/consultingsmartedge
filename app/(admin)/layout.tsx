// app/(admin)/layout.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import AdminNav from "@/sections/AdminNav";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoaded, user } = useUser();

  useEffect(() => {
    if (isLoaded && (!user || user.publicMetadata?.role !== "admin")) {
      redirect("/");
    }
  }, [isLoaded, user]);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <>
      <AdminNav /> {/* Admin navbar */}
      <main className="min-h-screen bg-gray-50 pt-16">
        {children}
      </main>
      {/* No footer here */}
    </>
  );
}