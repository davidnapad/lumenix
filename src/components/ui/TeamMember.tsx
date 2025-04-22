import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface TeamMemberProps {
  name: string;
  role: string;
  mobileRole?: string;
  subtitle?: string;
  image?: string;
  className?: string;
}

export function TeamMember({ 
  name, 
  role,
  mobileRole,
  subtitle,
  image,
  className 
}: TeamMemberProps) {
  const prefersReducedMotion = useReducedMotion();
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div 
      className={cn(
        "flex flex-col items-center p-4 md:p-8 rounded-2xl bg-white shadow-lg border border-gray-100 h-full will-change-transform",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion || isMobile ? 0.3 : 0.5 }}
    >
      <motion.div 
        className="relative mb-4 md:mb-6 group"
        whileHover={prefersReducedMotion || isMobile ? {} : { scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Simplified glow effect for mobile */}
        <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-[#00dfff] to-[#A855F7] ${isMobile ? 'blur-md' : 'blur-xl'} opacity-30 group-hover:opacity-50 transition-opacity`} />
        
        {/* Image with loading optimization */}
        <div className="relative w-20 h-20 md:w-32 md:h-32 rounded-full overflow-hidden ring-2 ring-[#00dfff]/20">
          {image && (
            <img
              src={image}
              alt={name}
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
              fetchpriority="low"
              width={isMobile ? 80 : 128}
              height={isMobile ? 80 : 128}
            />
          )}
        </div>
      </motion.div>

      <div className="text-center flex-1 flex flex-col justify-center">
        <h3 className="text-base md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{name}</h3>
        <p className="text-sm md:text-base text-gray-800 font-medium mb-1">
          <span className="hidden md:inline">{role}</span>
          <span className="md:hidden">{mobileRole || role}</span>
        </p>
      </div>
    </motion.div>
  );
}