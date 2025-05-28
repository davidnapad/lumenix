import React, { lazy, Suspense, useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from "../../lib/utils";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const reducedAnimationStyle = prefersReducedMotion ? {
    animationDuration: '30s',
    animationIterationCount: '1',
  } : {};
  
  return (
    <main>
      <div
        className={cn(
          "relative flex flex-col items-center justify-center bg-white text-gray-900 transition-bg",
          // Adjusted padding for mobile to prevent headline from being cut off by nav
          isMobile ? "min-h-[auto] pt-16 pb-4" : "min-h-[100vh]", 
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden isolate">
          {/* FIXED: Reduced the opacity of the background gradient even more */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 animate-gradient blur-3xl opacity-15 -z-10" />
          
          {/* FIXED: Added additional isolation and reduced opacity */}
          <div
            className={cn(
              `
            isolation-auto
            [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)]
            [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)]
            [--aurora:repeating-linear-gradient(100deg,var(--accent-blue)_10%,var(--accent-purple)_15%,var(--accent-blue)_20%,var(--accent-purple)_25%,var(--accent-blue)_30%)]
            [background-image:var(--white-gradient),var(--aurora)]
            [background-size:300%,_200%]
            [background-position:50%_50%,50%_50%]
            filter blur-[10px]
            after:content-[""] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora)] 
            after:[background-size:200%,_100%] 
            after:animate-aurora after:[background-attachment:fixed] after:mix-blend-soft-light
            pointer-events-none
            absolute -inset-[10px] opacity-15 will-change-transform`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`
            )}
            style={mounted && prefersReducedMotion ? reducedAnimationStyle : {}}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};