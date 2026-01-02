"use client";

import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

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

  if (!isLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <>
      <main className="w-full mr-0 pr-0">{children}</main>
    </>
  );
}
