import React from "react";

const HeroBackground = () => {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute left-10 top-20 h-72 w-72 rounded-full bg-blue-400/10 blur-3xl"
        style={{ animation: "pulse-glow 8s ease-in-out infinite" }}
      ></div>
      <div
        className="absolute bottom-20 right-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        style={{ animation: "pulse-glow 10s ease-in-out infinite 2s" }}
      ></div>

      {/* Decorative grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(#0066FF 1px, transparent 1px), linear-gradient(90deg, #0066FF 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      ></div>
    </div>
  );
};

export default HeroBackground;
