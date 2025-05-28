"use client";

import React, { useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "../../lib/utils";

interface NavItem {
  name: string;
  url: string;
  icon: React.ComponentType<{ className?: string; size?: number; strokeWidth?: number }>;
}

interface NavBarProps {
  items: NavItem[];
  className?: string;
  activeItem?: string;
  onNavClick?: (item: NavItem) => void;
  ctaButton?: React.ReactNode;
  isMobile?: boolean;
}

export function NavBar({ items, className, activeItem, onNavClick, ctaButton, isMobile }: NavBarProps) {
  // Reference for mobile indicator animation (keeping the ref for compatibility but not using the element)
  const navItemsRef = useRef<(HTMLButtonElement | null)[]>([]);
  
  return (
    <div
      className={cn(
        "flex items-center gap-0 bg-background/5 backdrop-blur-lg py-0.5 px-0.5 md:py-1 md:px-1.5 rounded-full",
        className,
      )}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        willChange: 'transform',
      }}
    >
      <div className="flex items-center">
        {items.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.name;

          return (
            <button
              key={item.name}
              onClick={() => onNavClick?.(item)}
              className={cn(
                "relative cursor-pointer text-sm font-medium px-2 md:px-6 py-1.5 md:py-2 rounded-full transition-colors duration-300 ease-in-out",
                isMobile 
                  ? "text-gray-700 hover:text-gray-900 focus:text-gray-900" 
                  : "text-foreground/80 hover:text-primary",
                isActive && !isMobile && "bg-muted text-primary",
                isActive && isMobile && "text-gray-900 font-semibold",
              )}
              style={{
                minHeight: '44px',
                minWidth: isMobile ? '44px' : 'auto',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
              }}
              aria-label={`Navigate to ${item.name}`}
              ref={(el) => {
                navItemsRef.current[index] = el;
              }}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                {isActive && isMobile && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00dfff]/5 to-[#A855F7]/5 opacity-80 -z-10"></div>
                )}
                <Icon size={20} strokeWidth={2} className={isActive ? "text-gray-900" : "text-gray-700"} />
              </span>
              
              {/* Active indicator - Only show on desktop */}
              {isActive && !isMobile && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10 tubelight-indicator"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                  style={{
                    transform: 'translateZ(0)',
                    backfaceVisibility: 'hidden',
                    willChange: 'transform',
                  }}
                >
                  {/* Glow bar positioned above the button - smaller on mobile */}
                  <div className="absolute -top-1.5 md:-top-2 left-1/2 -translate-x-1/2 w-8 md:w-12 h-1 md:h-1.5 bg-gradient-to-r from-[#00dfff] to-[#A855F7] rounded-full z-10 overflow-visible">
                    {/* Gradient glow effects */}
                    <div className="absolute w-10 md:w-16 h-6 md:h-8 bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 rounded-full blur-xl -top-2 -left-2" />
                    <div className="absolute w-8 md:w-14 h-4 md:h-6 bg-gradient-to-r from-[#00dfff]/15 to-[#A855F7]/15 rounded-full blur-lg -top-1 -left-1" />
                    
                    {/* Animated pulse glow */}
                    <motion.div 
                      className="absolute w-12 md:w-20 h-6 md:h-10 bg-gradient-to-r from-[#00dfff]/10 via-[#A855F7]/10 to-[#00dfff]/10 rounded-full blur-2xl -top-3 -left-4"
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity,
                        repeatType: "loop" 
                      }}
                    />
                  </div>
                </motion.div>
              )}
            </button>
          );
        })}
      </div>

      {/* Mobile indicator is completely removed */}

      {/* CTA button with better mobile spacing */}
      {ctaButton && (
        <div className={`ml-0.5 md:ml-1`}>
          {ctaButton}
        </div>
      )}
    </div>
  );
}