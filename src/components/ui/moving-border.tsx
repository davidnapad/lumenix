"use client";
import React from "react";
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "../../lib/utils";

export function Button({
  borderRadius = "1.75rem",
  children,
  as: Component = "button",
  containerClassName,
  borderClassName,
  duration,
  className,
  ...otherProps
}: {
  borderRadius?: string;
  children: React.ReactNode;
  as?: any;
  containerClassName?: string;
  borderClassName?: string;
  duration?: number;
  className?: string;
  [key: string]: any;
}) {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <Component
      className={cn(
        "bg-transparent relative text-xl h-16 w-auto p-[1px] overflow-hidden group",
        containerClassName
      )}
      style={{
        borderRadius: borderRadius,
      }}
      {...otherProps}
    >
      {/* Ambient light effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)",
          filter: "blur(15px)",
        }}
      />

      {/* Moving border container */}
      <div
        className="absolute inset-0"
        style={{ borderRadius: `calc(${borderRadius} * 0.96)` }}
      >
        <MovingBorder duration={duration} rx="30%" ry="30%" prefersReducedMotion={prefersReducedMotion}>
          <div
            className={cn(
              "h-24 w-24 opacity-50 bg-[radial-gradient(circle,var(--accent-blue)_20%,var(--accent-purple)_30%,transparent_70%)] blur-xl group-hover:blur-2xl transition-all duration-500",
              borderClassName
            )}
          />
        </MovingBorder>
      </div>

      {/* Shine effect */}
      {!prefersReducedMotion && (
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: "linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
            transform: "translateX(-100%)",
            animation: "shine 1.5s infinite",
          }}
        />
      )}

      {/* Button content */}
      <div
        className={cn(
          "relative backdrop-blur-xl flex items-center justify-center w-full h-full text-base antialiased z-10 group-hover:backdrop-blur-lg transition-all duration-500",
          className
        )}
        style={{
          borderRadius: `calc(${borderRadius} * 0.96)`,
        }}
      >
        {children}
      </div>

      {/* Sparkle effects */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full animate-sparkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
              }}
            />
          ))}
        </div>
      )}
    </Component>
  );
}

export const MovingBorder = ({
  children,
  duration = 2000,
  rx,
  ry,
  prefersReducedMotion,
  ...otherProps
}: {
  children: React.ReactNode;
  duration?: number;
  rx?: string;
  ry?: string;
  prefersReducedMotion?: boolean;
  [key: string]: any;
}) => {
  const pathRef = useRef<SVGRectElement | null>(null);
  const progress = useMotionValue<number>(0);
  const [isReady, setIsReady] = useState(false);
  const [pathLength, setPathLength] = useState<number>(0);

  useEffect(() => {
    if (pathRef.current) {
      // Wait for next frame to ensure SVG is fully rendered
      requestAnimationFrame(() => {
        if (pathRef.current) {
          const length = pathRef.current.getTotalLength();
          setPathLength(length);
          setIsReady(true);
        }
      });
    }
  }, []);

  useAnimationFrame((time) => {
    if (!isReady || !pathLength || prefersReducedMotion) return;
    
    const pxPerMillisecond = pathLength / duration;
    progress.set((time * pxPerMillisecond) % pathLength);
  });

  const x = useTransform(
    progress,
    (val) => {
      if (!isReady || !pathRef.current) return 0;
      try {
        const point = pathRef.current.getPointAtLength(val);
        return point ? point.x : 0;
      } catch (error) {
        return 0;
      }
    }
  );

  const y = useTransform(
    progress,
    (val) => {
      if (!isReady || !pathRef.current) return 0;
      try {
        const point = pathRef.current.getPointAtLength(val);
        return point ? point.y : 0;
      } catch (error) {
        return 0;
      }
    }
  );

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`;

  // Static border for reduced motion
  if (prefersReducedMotion) {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
          className="absolute h-full w-full"
          width="100%"
          height="100%"
          {...otherProps}
        >
          <rect
            fill="none"
            width="100%"
            height="100%"
            rx={rx}
            ry={ry}
            stroke="url(#gradient)"
            strokeWidth="2"
          />
        </svg>
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          {children}
        </div>
      </>
    );
  }

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
        {...otherProps}
      >
        <rect
          fill="none"
          width="100%"
          height="100%"
          rx={rx}
          ry={ry}
          ref={pathRef}
          pathLength="1"
          stroke="transparent"
        />
      </svg>
      {isReady && pathLength > 0 && (
        <motion.div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "inline-block",
            transform,
          }}
          className="will-change-transform"
        >
          {children}
        </motion.div>
      )}
    </>
  );
};