import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface ProcessStepProps {
  title: string;
  description: string;
  icon: LucideIcon;
  stepNumber: number;
  isActive?: boolean;
  index: number;
  totalSteps: number;
}

export const ProcessStep: React.FC<ProcessStepProps> = ({
  title,
  description,
  icon: Icon,
  stepNumber,
  isActive = false,
  index,
  totalSteps,
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div 
      className="flex flex-col items-center relative z-10"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ 
        duration: prefersReducedMotion ? 0.2 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1
      }}
    >
      {/* Step Number with Icon */}
      <motion.div
        className={`
          relative flex items-center justify-center h-16 w-16 rounded-full 
          border-2 transition-all duration-300 will-change-transform
          ${isActive 
            ? 'border-transparent bg-gradient-to-r from-cyan-400 to-purple-500 text-white' 
            : 'border-gray-200 bg-white text-gray-400'}
        `}
        whileHover={prefersReducedMotion ? {} : { 
          scale: 1.1,
          transition: { duration: 0.2 }
        }}
      >
        {/* Background glow effect for active/hover state */}
        <div 
          className={`
            absolute inset-0 rounded-full blur-xl 
            bg-gradient-to-r from-cyan-400/40 to-purple-500/40
            opacity-0 transition-opacity duration-300 -z-10
            group-hover:opacity-100 ${isActive ? 'opacity-70' : ''}
          `}
        />
        
        <Icon className="h-6 w-6" />
        
        {/* Step number indicator */}
        <div className="absolute -top-2 -right-2 bg-white text-xs font-bold h-6 w-6 rounded-full flex items-center justify-center border border-gray-100 shadow-sm">
          {stepNumber}
        </div>
      </motion.div>
      
      {/* Step Title */}
      <h3 className="mt-4 text-lg font-semibold text-gray-900">{title}</h3>
      
      {/* Step Description */}
      <p className="mt-2 text-sm text-center text-gray-600 max-w-[200px]">{description}</p>
      
      {/* Connecting Line (not for the last step) */}
      {index < totalSteps - 1 && (
        <div className="hidden md:block absolute top-8 left-[calc(50%+40px)] w-[calc(100%-80px)] h-[2px]">
          {/* Background Line */}
          <div className="absolute inset-0 bg-gray-200"></div>
          
          {/* Animated Progress Line */}
          <motion.div 
            className="absolute inset-0 origin-left bg-gradient-to-r from-cyan-400 to-purple-500"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: isActive ? 1 : 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        </div>
      )}
      
      {/* Vertical Connecting Line for Mobile */}
      {index < totalSteps - 1 && (
        <div className="md:hidden absolute top-16 left-1/2 w-[2px] h-12 -ml-[1px]">
          <div className="absolute inset-0 bg-gray-200"></div>
          <motion.div 
            className="absolute inset-0 origin-top bg-gradient-to-b from-cyan-400 to-purple-500"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: isActive ? 1 : 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: index * 0.2 }}
          />
        </div>
      )}
    </motion.div>
  );
};