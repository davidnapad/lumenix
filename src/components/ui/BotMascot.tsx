import React from 'react';
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

interface BotMascotProps {
  direction?: 'left' | 'right' | null;
}

export function BotMascot({ direction }: BotMascotProps) {
  const rotationDegrees = direction === 'left' ? -15 : direction === 'right' ? 15 : 0;

  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-4 md:p-6"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="relative w-24 h-24 md:w-36 md:h-36 flex items-center justify-center"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Outer glow and gradient border */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00dfff] to-[#A855F7] p-[2px]">
          {/* Inner white background */}
          <div className="w-full h-full rounded-full bg-white">
            {/* Bot icon with rotation */}
            <motion.div
              animate={{ rotate: rotationDegrees }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="w-full h-full flex items-center justify-center"
            >
              <Bot className="w-14 h-14 md:w-20 md:h-20 text-gray-900" />
            </motion.div>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute -inset-4 rounded-full bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 blur-xl opacity-50" />
        <div className="absolute -inset-8 rounded-full bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10 blur-2xl opacity-30" />
      </motion.div>
      
      {/* Title with gradient text */}
      <motion.div 
        className="mt-4 md:mt-6 text-center"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h3 className="text-sm md:text-lg font-medium bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent">
          KI mit Persönlichkeit
        </h3>
        <p className="text-xs md:text-sm text-gray-600 mt-1">24/7 für dich da</p>
      </motion.div>
    </motion.div>
  );
}