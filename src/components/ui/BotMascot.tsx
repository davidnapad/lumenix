import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface BotMascotProps {
  direction?: 'left' | 'right' | null;
}

export function BotMascot({ direction }: BotMascotProps) {
  const prefersReducedMotion = useReducedMotion();
  const rotationDegrees = direction === 'left' ? -15 : direction === 'right' ? 15 : 0;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <motion.div 
      className="flex flex-col items-center justify-center optimize-gpu"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "100px 0px" }}
      transition={{ duration: prefersReducedMotion || isMobile ? 0.3 : 0.5 }}
    >
      <motion.div 
        className="relative w-16 h-16 md:w-28 md:h-28 flex items-center justify-center will-change-transform"
        whileHover={prefersReducedMotion || isMobile ? {} : { scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Outer glow and gradient border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00dfff] to-[#A855F7] p-[2px]">
          {/* Inner white background */}
          <div className="w-full h-full rounded-full bg-white">
            {/* Bot icon with rotation */}
            <motion.div
              animate={prefersReducedMotion || isMobile ? {} : { rotate: rotationDegrees }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full h-full flex items-center justify-center"
            >
              <Bot className="w-10 h-10 md:w-16 md:h-16 text-gray-900" />
            </motion.div>
          </div>
        </div>

        {/* Simplified glow effect */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 blur-xl opacity-50" />
      </motion.div>
      
      {/* Title with gradient text */}
      <motion.div 
        className="mt-3 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <h3 className="text-xs md:text-base font-medium bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent">
          KI mit Persönlichkeit
        </h3>
        <p className="text-xs text-gray-600">24/7 für dich da</p>
      </motion.div>
    </motion.div>
  );
}