import React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface AlternatingProcessStepProps {
  title: string;
  description: string;
  icon: React.ElementType;
  stepNumber: number;
  isActive: boolean;
  side: 'left' | 'right';
  isLast: boolean;
}

export const AlternatingProcessStep: React.FC<AlternatingProcessStepProps> = ({
  title,
  description,
  icon: Icon,
  stepNumber,
  isActive,
  side,
  isLast
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={`relative flex items-center ${side === 'left' ? 'md:flex-row-reverse' : 'md:flex-row'} flex-col pb-10 md:pb-16`}>
      {/* Content card - Reduced padding and size */}
      <motion.div 
        className={`
          relative w-full md:w-[calc(50%-2.5rem)] p-4 rounded-xl 
          bg-white shadow-md border border-gray-100
          ${side === 'left' ? 'md:text-right md:mr-10' : 'md:text-left md:ml-10'}
          z-10
        `}
        initial={{ 
          opacity: 0, 
          x: side === 'left' ? 20 : -20,
          y: 10
        }}
        whileInView={{ 
          opacity: 1, 
          x: 0,
          y: 0
        }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ 
          duration: prefersReducedMotion ? 0.2 : 0.5,
          delay: prefersReducedMotion ? 0 : 0.1
        }}
        whileHover={prefersReducedMotion ? {} : { y: -3 }}
      >
        {/* Card glow effect */}
        <div className={`absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 -z-10 ${
          isActive ? 'opacity-100' : 'group-hover:opacity-50'
        }`}>
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/20 to-purple-500/20 blur-xl" />
        </div>
        
        {/* Card content - More compact */}
        <h3 className={`
          text-lg font-bold mb-2
          ${isActive 
            ? 'bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent'
            : 'text-gray-900'}
        `}>
          {title}
        </h3>
        <p className="text-gray-600 text-sm">{description}</p>
        
        {/* Decorative arrow connecting to timeline */}
        <div 
          className={`
            hidden md:block absolute top-4 h-3 w-3 rotate-45
            bg-white border-t border-l border-gray-100
            ${side === 'left' 
              ? 'left-[-7px] border-r-0 border-b-0' 
              : 'right-[-7px] border-r-0 border-b-0'}
          `}
        ></div>
      </motion.div>
      
      {/* Circle icon in the center - Smaller size */}
      <motion.div 
        className={`
          relative flex items-center justify-center h-12 w-12 rounded-full
          ${side === 'left' ? 'md:mr-5 md:ml-auto' : 'md:ml-5 md:mr-auto'} mb-3 md:mb-0
          ${isActive 
            ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white shadow-lg' 
            : 'bg-white text-gray-400 border-2 border-gray-200'}
          transition-all duration-500 z-30 mx-auto md:mx-0
        `}
        initial={{ scale: 0.8, opacity: 0.5 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: false, amount: 0.8 }}
        whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
        animate={isActive && !prefersReducedMotion ? { 
          boxShadow: [
            '0 0 0 rgba(0,0,0,0)', 
            '0 0 15px rgba(79, 209, 197, 0.5)', 
            '0 0 0 rgba(0,0,0,0)'
          ]
        } : {}}
        transition={{ 
          duration: 2,
          repeat: isActive ? Infinity : 0,
          repeatType: "reverse"
        }}
      >
        {/* Glow effect for active state */}
        {isActive && (
          <div className="absolute inset-0 rounded-full blur-md bg-gradient-to-r from-cyan-400/40 to-purple-500/40 -z-10" />
        )}
        
        <Icon className="h-5 w-5" />
        
        {/* Step number badge - Smaller size */}
        <motion.div 
          className={`
            absolute -top-2 ${side === 'left' ? '-left-2' : '-right-2'} h-5 w-5 rounded-full 
            flex items-center justify-center border shadow-sm
            text-xs font-bold z-30
            ${isActive 
              ? 'bg-white text-purple-500 border-purple-200' 
              : 'bg-gray-50 text-gray-400 border-gray-200'}
          `}
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: false, amount: 0.8 }}
          transition={{ 
            duration: prefersReducedMotion ? 0.1 : 0.4, 
            delay: prefersReducedMotion ? 0 : 0.2,
            type: "spring",
            stiffness: 500
          }}
        >
          {stepNumber}
        </motion.div>
      </motion.div>
    </div>
  );
};