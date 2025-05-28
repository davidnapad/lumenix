import React from 'react';
import { cn } from '../../lib/utils';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

interface AuroraButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  glowClassName?: string;
  containerClassName?: string;
  glowSize?: 'sm' | 'md' | 'lg';
  as?: React.ElementType;
  href?: string;
  to?: string;
}

export const AuroraButton = React.forwardRef<HTMLButtonElement, AuroraButtonProps>(
  ({ 
    children, 
    className, 
    glowClassName = "from-blue-500 via-purple-500 to-pink-500", 
    containerClassName,
    glowSize = 'md',
    as: Component = 'button',
    href,
    to,
    ...props 
  }, ref) => {
    const prefersReducedMotion = useReducedMotion();
    
    // Calculate blur amount based on size
    const blurAmount = {
      sm: 'blur-sm',
      md: 'blur',
      lg: 'blur-xl',
    }[glowSize];

    // Calculate spread amount based on size
    const spreadAmount = {
      sm: '-inset-0.5',
      md: '-inset-1',
      lg: '-inset-1.5',
    }[glowSize];
    
    // Prepare props for the underlying element
    const elementProps = {
      ref,
      className: cn(
        "relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-full",
        "transition-all duration-300 will-change-transform",
        className
      ),
      ...props
    };
    
    if (href && Component === 'a') {
      // @ts-ignore - href is valid for anchor elements
      elementProps.href = href;
    }
    
    if (to && (Component === Link || Component === 'a')) {
      // @ts-ignore - to is valid for Link components
      elementProps.to = to;
    }

    return (
      <div className={cn("relative group", containerClassName)}>
        {/* Aurora glow effect - stationary for reduced motion, animated otherwise */}
        <div 
          className={cn(
            "absolute",
            spreadAmount,
            blurAmount,
            "rounded-full opacity-70 group-hover:opacity-100 transition-opacity",
            "bg-gradient-to-r",
            glowClassName,
          )}
        >
          {/* Animated aurora effect */}
          {!prefersReducedMotion && (
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full"
              animate={{ x: ['100%', '-100%'] }}
              transition={{ 
                repeat: Infinity, 
                duration: 1.5, 
                ease: "linear",
                repeatDelay: 0.5
              }}
            />
          )}
        </div>
        
        {/* Button/link content */}
        <Component {...elementProps}>
          {children}
        </Component>
      </div>
    );
  }
);

AuroraButton.displayName = "AuroraButton";