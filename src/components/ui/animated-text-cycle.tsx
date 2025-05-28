import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

interface AnimatedWordCycleProps {
  words: string[];
  interval?: number;
  className?: string;
}

export default function AnimatedWordCycle({ 
  words, 
  interval = 2500, 
  className = "" 
}: AnimatedWordCycleProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const prefersReducedMotion = useReducedMotion();
  
  // Find the longest word to set minimum width
  const longestWord = words.reduce((a, b) => a.length > b.length ? a : b);
  const minWidth = `${longestWord.length}ch`;

  useEffect(() => {
    // Use a longer interval and simpler animation if reduced motion is preferred
    const finalInterval = prefersReducedMotion ? interval * 1.5 : interval;
    
    const intervalId = setInterval(() => {
      if (prefersReducedMotion) {
        // Simple transition for reduced motion
        setCurrentIndex((current) => (current + 1) % words.length);
      } else {
        // Fade out and in for normal animation
        setIsVisible(false);
        setTimeout(() => {
          setCurrentIndex((current) => (current + 1) % words.length);
          setIsVisible(true);
        }, 200);
      }
    }, finalInterval);

    return () => clearInterval(intervalId);
  }, [interval, words.length, prefersReducedMotion]);

  return (
    <div 
      className="inline-block relative will-change-contents optimize-gpu" 
      style={{ 
        minWidth,
        width: 'auto',
        height: '1.5em',
        lineHeight: '1.5em',
        transform: 'translateZ(0)',
        overflow: 'hidden'
      }}
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentIndex}
            initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
            animate={prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: -10 }}
            transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.2 }}
            className={`absolute inset-0 whitespace-nowrap ${className}`}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              height: '100%',
              transform: 'translateZ(0)',
            }}
          >
            {words[currentIndex]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}