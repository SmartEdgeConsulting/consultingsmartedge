"use client";
import React, { useEffect, useRef, useCallback, useMemo, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

interface Mouse {
  x: number | null;
  y: number | null;
  radius: number;
}

interface AnimatedBackgroundProps {
  children?: React.ReactNode;
  particleCount?: number;
  connectionDistance?: number;
  primaryColor?: string;
  backgroundColor?: string;
  className?: string;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({
  children,
  particleCount = 80,
  connectionDistance = 150,
  primaryColor = "59, 130, 246",
  backgroundColor = "#0b1d3a",
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<Mouse>({ x: null, y: null, radius: 150 });
  const animationFrameRef = useRef<number>(0);
  const lastFrameTimeRef = useRef<number>(0);
  const isReducedMotionRef = useRef<boolean>(false);
  
  // THIS IS CRITICAL: Prevents hydration mismatch
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particleColor = useMemo(() => `rgba(${primaryColor}, 0.8)`, [primaryColor]);
  const gridColor = useMemo(() => `rgba(${primaryColor}, 0.05)`, [primaryColor]);
  const gradientEnd = useMemo(() => "#0f2744", []);

  useEffect(() => {
    if (!isMounted) return;
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    isReducedMotionRef.current = mediaQuery.matches;

    const handleChange = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, [isMounted]);

  const createParticle = useCallback(
    (width: number, height: number): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      radius: Math.random() * 2 + 1,
    }),
    []
  );

  const initParticles = useCallback(
    (width: number, height: number) => {
      const effectiveParticleCount = width < 768 ? Math.floor(particleCount * 0.5) : particleCount;
      particlesRef.current = Array.from({ length: effectiveParticleCount }, () =>
        createParticle(width, height)
      );
    },
    [particleCount, createParticle]
  );

  const updateParticle = useCallback(
    (particle: Particle, width: number, height: number) => {
      particle.x += particle.vx;
      particle.y += particle.vy;

      if (particle.x < 0 || particle.x > width) particle.vx *= -1;
      if (particle.y < 0 || particle.y > height) particle.vy *= -1;

      const mouse = mouseRef.current;
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const distanceSquared = dx * dx + dy * dy;
        const radiusSquared = mouse.radius * mouse.radius;

        if (distanceSquared < radiusSquared) {
          const distance = Math.sqrt(distanceSquared);
          const force = (mouse.radius - distance) / mouse.radius;
          particle.x -= dx * force * 0.02;
          particle.y -= dy * force * 0.02;
        }
      }
    },
    []
  );

  const drawParticle = useCallback(
    (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = particleColor;
      ctx.fill();
    },
    [particleColor]
  );

  const connectParticles = useCallback(
    (ctx: CanvasRenderingContext2D) => {
      const particles = particlesRef.current;
      const maxDistance = connectionDistance;
      const maxDistanceSquared = maxDistance * maxDistance;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distanceSquared = dx * dx + dy * dy;

          if (distanceSquared < maxDistanceSquared) {
            const distance = Math.sqrt(distanceSquared);
            const opacity = (1 - distance / maxDistance) * 0.5;
            ctx.strokeStyle = `rgba(${primaryColor}, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
    },
    [connectionDistance, primaryColor]
  );

  const drawGrid = useCallback(
    (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const gridSize = 50;
      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;

      ctx.beginPath();
      for (let x = 0; x < width; x += gridSize) {
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
      }
      ctx.stroke();
    },
    [gridColor]
  );

  const animationLoop = useCallback(
    (timestamp: number) => {
      const targetFPS = 30;
      const frameDelay = 1000 / targetFPS;

      if (timestamp - lastFrameTimeRef.current < frameDelay) {
        animationFrameRef.current = requestAnimationFrame(animationLoop);
        return;
      }

      lastFrameTimeRef.current = timestamp;

      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext("2d", { alpha: false });
      if (!ctx) return;

      const { width, height } = canvas;

      const gradient = ctx.createLinearGradient(0, 0, width, height);
      gradient.addColorStop(0, backgroundColor);
      gradient.addColorStop(1, gradientEnd);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      if (!isReducedMotionRef.current) {
        drawGrid(ctx, width, height);

        const particles = particlesRef.current;
        for (let i = 0; i < particles.length; i++) {
          updateParticle(particles[i], width, height);
          drawParticle(ctx, particles[i]);
        }

        connectParticles(ctx);
      }

      animationFrameRef.current = requestAnimationFrame(animationLoop);
    },
    [backgroundColor, gradientEnd, drawGrid, updateParticle, drawParticle, connectParticles]
  );

  const startAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    lastFrameTimeRef.current = performance.now();
    animationFrameRef.current = requestAnimationFrame(animationLoop);
  }, [animationLoop]);

  const stopAnimation = useCallback(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = 0;
    }
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles(canvas.width, canvas.height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    const passiveOptions = { passive: true } as AddEventListenerOptions;

    handleResize();
    window.addEventListener("resize", handleResize);
    canvas.addEventListener("mousemove", handleMouseMove, passiveOptions);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const startTimer = setTimeout(() => {
      startAnimation();
    }, 100);

    return () => {
      clearTimeout(startTimer);
      window.removeEventListener("resize", handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      stopAnimation();
    };
  }, [isMounted, startAnimation, stopAnimation, initParticles]);

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{ backgroundColor }}
    >
      {isMounted && (
        <canvas 
          ref={canvasRef} 
          className="absolute top-0 left-0 w-full h-full"
          aria-hidden="true"
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default AnimatedBackground;