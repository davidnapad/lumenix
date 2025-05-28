import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface GradientHeadingProps {
  title: string;
  subtitle?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  subtitleClassName?: string;
  alignment?: 'left' | 'center' | 'right';
  animateOnView?: boolean;
}

export function GradientHeading({
  title,
  subtitle,
  level = 2,
  className = '',
  subtitleClassName = '',
  alignment = 'center',
  animateOnView = true
}: GradientHeadingProps) {
  const prefersReducedMotion = useReducedMotion();
  
  // Calculate alignment classes
  const alignClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };
  
  // Default level-based classes
  const headingClasses = {
    1: 'text-3xl md:text-4xl lg:text-5xl',
    2: 'text-2xl md:text-3xl',
    3: 'text-xl md:text-2xl',
    4: 'text-lg md:text-xl',
    5: 'text-base md:text-lg',
    6: 'text-sm md:text-base'
  };
  
  const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const headingContent = (
    <div className={cn(alignClasses[alignment])}>
      <HeadingTag 
        className={cn(
          headingClasses[level],
          "font-bold bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent mb-3 md:mb-4", 
          className
        )}
      >
        {title}
      </HeadingTag>
      
      {subtitle && (
        <p className={cn("text-sm md:text-base text-gray-600 max-w-3xl mx-auto", subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
  
  // If no animation, return the heading directly
  if (!animateOnView || prefersReducedMotion) {
    return headingContent;
  }
  
  // With animation
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {headingContent}
    </motion.div>
  );
}