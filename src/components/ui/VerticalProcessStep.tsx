import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface VerticalProcessStepProps {
  title: string;
  description: string;
  icon: typeof LucideIcon;
  stepNumber: number;
  isActive: boolean;
  delay: number;
  isLast: boolean;
}

export const VerticalProcessStep: React.FC<VerticalProcessStepProps> = ({
  title,
  description,
  icon: Icon,
  stepNumber,
  isActive,
  delay,
  isLast
}) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="relative">
      {/* Connecting line */}
      {!isLast && (
        <div className="absolute left-6 top-12 h-full w-[2px] bg-gray-100">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 to-purple-500"
            initial={{ height: 0 }}
            whileInView={{ height: isActive ? '100%' : '0%' }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: prefersReducedMotion ? 0.2 : 1, delay: delay + 0.3 }}
            style={{ willChange: 'height' }}
          />
        </div>
      )}
      
      <motion.div 
        className="relative flex items-start gap-4 group"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ 
          duration: prefersReducedMotion ? 0.2 : 0.6,
          delay: prefersReducedMotion ? 0 : delay
        }}
        style={{ willChange: 'transform, opacity' }}
      >
        {/* Icon Circle */}
        <motion.div 
          className={`
            relative flex items-center justify-center h-12 w-12 rounded-full z-10
            ${isActive 
              ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white' 
              : 'bg-white text-gray-400 border-2 border-gray-200'}
            transition-colors duration-300
          `}
          whileHover={prefersReducedMotion ? {} : { scale: 1.1 }}
          animate={isActive && !prefersReducedMotion ? { 
            boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 0 15px rgba(79, 209, 197, 0.5)', '0 0 0 rgba(0,0,0,0)']
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
          
          {/* Step number badge - Ensuring the number is visible */}
          <motion.div 
            className={`
              absolute -top-2 -right-2 bg-white text-xs font-bold h-6 w-6 rounded-full 
              flex items-center justify-center border border-gray-100 shadow-sm
              ${isActive 
                ? 'text-purple-500 border-purple-200' 
                : 'text-gray-400 border-gray-200'}
            `}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ 
              duration: prefersReducedMotion ? 0.1 : 0.3, 
              delay: prefersReducedMotion ? 0 : delay + 0.2,
              type: "spring",
              stiffness: 500
            }}
          >
            {stepNumber}
          </motion.div>
        </motion.div>
        
        {/* Content */}
        <div className="pt-1">
          <h3 className={`
            text-lg font-semibold mb-2 
            ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500' : 'text-gray-900'}
          `}>
            {title}
          </h3>
          <p className="text-gray-600 leading-relaxed">{description}</p>
        </div>
      </motion.div>
    </div>
  );
};