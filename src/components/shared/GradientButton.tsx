import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface GradientButtonProps {
  label: string;
  to: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showArrow?: boolean;
  onClick?: (e: React.MouseEvent) => void;
}

export function GradientButton({ 
  label, 
  to, 
  className = '', 
  size = 'md',
  showArrow = true, 
  onClick 
}: GradientButtonProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isHovering, setIsHovering] = React.useState(false);
  
  // Size-based classes
  const sizeClasses = {
    sm: "text-xs md:text-sm py-2 px-4",
    md: "text-sm md:text-base py-2.5 px-4 md:px-6",
    lg: "text-base md:text-lg py-2.5 md:py-3 px-6"
  };
  
  return (
    <motion.div
      className={`relative inline-block w-full ${className}`}
      whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
      whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Animated glow effect */}
      <motion.div 
        className="absolute -inset-1 rounded-xl bg-gradient-to-r from-[#00dfff] to-[#A855F7] opacity-70"
        animate={{ 
          opacity: [0.5, 0.8, 0.5],
          boxShadow: [
            '0 0 15px 2px rgba(0, 223, 255, 0.4), 0 0 30px 4px rgba(168, 85, 247, 0.3)',
            '0 0 20px 5px rgba(0, 223, 255, 0.6), 0 0 40px 7px rgba(168, 85, 247, 0.5)',
            '0 0 15px 2px rgba(0, 223, 255, 0.4), 0 0 30px 4px rgba(168, 85, 247, 0.3)'
          ]
        }}
        transition={{ 
          duration: 3, 
          repeat: Infinity,
          repeatType: "mirror" 
        }}
      />
      
      {/* Glassmorphism button */}
      <Link to={to} className="block" onClick={onClick}>
        <div 
          className={`relative flex items-center justify-center rounded-xl text-white font-medium bg-white/20 backdrop-blur-md border border-white/30 shadow-lg ${sizeClasses[size]}`}
          style={{ minHeight: '44px', height: '48px' }}
        >
          <span className="flex items-center whitespace-nowrap">
            {label}
            {showArrow && (
              <motion.div
                animate={isHovering && !prefersReducedMotion ? { x: [0, 4, 0] } : {}}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <ArrowRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </motion.div>
            )}
          </span>
          
          {/* Subtle shimmer effect */}
          {!prefersReducedMotion && (
            <motion.div 
              className="absolute inset-0 w-full h-full"
              initial={{ x: '-100%' }}
              animate={{ x: '100%' }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                ease: "linear",
                repeatDelay: 0.5
              }}
              style={{
                background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                zIndex: -1
              }}
            />
          )}
        </div>
      </Link>
    </motion.div>
  );
}