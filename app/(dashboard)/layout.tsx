// app/(dashboard)/layout.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

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

if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }
  
  return (
    <>
      <main className="">
        {children}
      </main>
    </>
  );
}