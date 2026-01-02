"use client";
import React from "react";

const Loading = () => {
  return (
    <div className="min-h-screen flex justify-center items-center overflow-hidden relative">
      {/* Loader Container */}
      <div className="text-center z-10">
        {/* Spinning Circles */}
        <div className="relative w-[120px] h-[120px] mx-auto mb-8">
          {/* Outer Circle */}
          <div
            className="absolute inset-0 rounded-full border-4 border-transparent border-t-primary animate-spin"
            style={{
              animationDuration: "1.5s",
              animationTimingFunction: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
            }}
          />

          {/* Middle Circle */}
          <div
            className="absolute top-[10%] left-[10%] w-[80%] h-[80%] rounded-full border-4 border-transparent border-t-primary/70"
            style={{
              animation:
                "spin 1.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) -0.3s infinite",
            }}
          />

          {/* Inner Circle */}
          <div
            className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full border-4 border-transparent border-t-primary/50"
            style={{
              animation:
                "spin 2.1s cubic-bezier(0.68, -0.55, 0.265, 1.55) -0.6s infinite",
            }}
          />

          {/* Center Pulse Dot */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-primary rounded-full animate-pulse" />
        </div>

        {/* Loading Text */}
        <div className="text-primary text-2xl font-semibold tracking-[0.2em]">
          <span className="inline-block animate-pulse">SmartEdge</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        @keyframes float {
          0% {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: 0.5;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Loading;
