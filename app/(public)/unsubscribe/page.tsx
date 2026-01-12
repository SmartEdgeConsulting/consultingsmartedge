"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [isUnsubscribed, setIsUnsubscribed] = useState(false);

  useEffect(() => {
    if (!email) {
      toast.error("No email address provided.");
    }
  }, [email]);

  const handleUnsubscribe = async () => {
    if (!email) return;

    setStatus("loading");

    try {
      const response = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        toast.success("You've been successfully unsubscribed.");
        setIsUnsubscribed(true);
      } else {
        setStatus("error");
        toast.error(data.error || "Failed to unsubscribe. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      toast.error("An error occurred. Please try again later.");
      console.error("Unsubscribe error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
        <div className="text-center">
          {/* Icon */}
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg
              className="h-6 w-6 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Unsubscribe from Newsletter
          </h2>

          {/* Content based on status */}
          {!isUnsubscribed ? (
            <>
              <p className="text-gray-600 mb-6">
                {email ? (
                  <>
                    Are you sure you want to unsubscribe{" "}
                    <span className="font-semibold">{email}</span> from our
                    newsletter?
                  </>
                ) : (
                  "No email address provided."
                )}
              </p>

              {email && (
                <div className="flex flex-col gap-3">
                  <button
                    onClick={handleUnsubscribe}
                    disabled={status === "loading"}
                    className="w-full bg-red-600 text-white px-6 py-3 rounded-md font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    {status === "loading"
                      ? "Unsubscribing..."
                      : "Yes, Unsubscribe"}
                  </button>
                  <Link
                    href="/"
                    className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-md font-medium hover:bg-gray-200 transition-colors text-center"
                  >
                    Cancel
                  </Link>
                </div>
              )}
            </>
          ) : (
            <>
              {/* Success state */}
              <div className="mb-6">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <svg
                    className="h-6 w-6 text-green-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500">
                  We&apos;re sorry to see you go. You can resubscribe anytime.
                </p>
              </div>
              <Link
                href="/"
                className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-md font-medium hover:bg-indigo-700 transition-colors"
              >
                Return to Homepage
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-gray-600">Loading...</div>
        </div>
      }
    >
      <UnsubscribeContent />
    </Suspense>
  );
}
