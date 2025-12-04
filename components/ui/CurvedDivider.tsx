import React from "react";
import ParticleBackground from "./ParticleBackground";

const CurvedDivider = ({
  fillColor = "#09007d",
  position = "bottom",
  flip = false,
  withParticles = false,
}: {
  fillColor?: string;
  position?: "top" | "bottom";
  flip?: boolean;
  withParticles?: boolean;
}) => {
  const positionStyles: React.CSSProperties = {
    position: "absolute" as const,
    left: 0,
    width: "100%",
    overflow: "hidden",
    lineHeight: 0,
    [position]: 0,
    transform: flip ? "rotate(180deg)" : "none",
  };

  const svgStyles: React.CSSProperties = {
    position: "relative" as const,
    display: "block",
    width: "calc(138% + 1.3px)",
  };

  return (
    <div style={positionStyles}>
      {withParticles && <ParticleBackground />}
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        style={svgStyles}
        className="relative block w-full h-16 sm:h-20 md:h-24 lg:h-28"
      >
        <path
          d="M1200,0H0V120H281.94C572.9,116.24,602.45,3.86,602.45,3.86h0S632,116.24,923,120h277Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
};

export default CurvedDivider;
