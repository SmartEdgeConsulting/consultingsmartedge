import Image from "next/image";
import React from "react";

const HeroImage = ({imageUrl, alt}: {imageUrl: string, alt: string}) => {
  return (
    <div className="relative flex items-center justify-center lg:h-112.5">
      {/* Main morphing blob background */}
      <div className="blob-shape absolute inset-x-0 top-0 flex h-full justify-center">
        <div
          className="h-[80%] w-[80%] opacity-20"
          style={{
            background:
              "linear-gradient(135deg, #09007d10 0%, #09007d20 50%, #09007d30 100%)",
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            transform: "translateY(-5%)",
          }}
        ></div>
      </div>

      {/* Soft glow effect */}
      <div className="absolute inset-x-0 top-0 flex h-full justify-center">
        <div
          className="h-[65%] w-[65%] blur-3xl opacity-30"
          style={{
            background: "radial-gradient(circle, #09007d, transparent)",
            transform: "translateY(-5%)",
          }}
        ></div>
      </div>

      {/* Main Image*/}
      <div className="relative z-10 h-full w-full max-w-112.5 transition-all duration-500 hover:scale-[1.02]">
        <div
          className="relative h-full w-full"
          style={{
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            overflow: "hidden",
            boxShadow: "0 25px 80px #09007d10, 0 0 0 1px #09007d20",
            transform: "translateY(-8%)",
          }}
        >
          <Image
            src={imageUrl}
            fill
            alt={alt}
            className="object-cover"
            priority
            quality={90}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          {/* Gradient overlay for depth */}
          <div className="absolute inset-0 bg-linear-to-tr from-primary/10 via-transparent to-primary/400"></div>
        </div>
      </div>
    </div>
  );
};

export default HeroImage;
