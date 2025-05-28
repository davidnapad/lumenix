import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TeamMemberProps {
  name: string;
  role: string;
  mobileRole?: string;
  image?: string;
  className?: string;
}

export function TeamMember({ 
  name, 
  role,
  mobileRole,
  image,
  className 
}: TeamMemberProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 100);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Preload image
  useEffect(() => {
    if (image) {
      const img = new Image();
      img.src = image;
      img.onload = () => setImageLoaded(true);
    }
  }, [image]);

  return (
    <motion.div 
      className={cn(
        "flex flex-col items-center p-3 md:p-4 rounded-xl bg-white shadow-md border border-gray-100/60 h-full optimize-gpu",
        "overflow-visible", // Ensure content is not cut off
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "100px 0px" }}
      transition={{ duration: prefersReducedMotion || isMobile ? 0.3 : 0.5 }}
    >
      <motion.div 
        className="relative mb-3 group"
        whileHover={prefersReducedMotion || isMobile ? {} : { scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Simplified glow effect */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#00dfff] to-[#A855F7] ${isMobile ? 'blur-sm' : 'blur-md'} opacity-30 group-hover:opacity-50 transition-opacity`} />
        
        {/* Image container with fixed dimensions to prevent layout shift */}
        <div className="relative w-16 h-16 md:w-24 md:h-24 rounded-full overflow-hidden ring-2 ring-[#00dfff]/20">
          {image && (
            <>
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-full"></div>
              )}
              <img
                src={image}
                alt={name}
                className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                width={isMobile ? 64 : 96}
                height={isMobile ? 64 : 96}
                loading="eager"
                decoding="async"
                onLoad={() => setImageLoaded(true)}
                style={{
                  transform: 'translateZ(0)',
                  willChange: 'transform',
                }}
              />
            </>
          )}
        </div>
      </motion.div>

      <div className="text-center flex-1 flex flex-col justify-center">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-xs md:text-sm text-gray-600 font-medium break-words whitespace-normal px-1">
          <span className="hidden md:inline">{role}</span>
          <span className="md:hidden">{mobileRole || role}</span>
        </p>
      </div>
    </motion.div>
  );
}