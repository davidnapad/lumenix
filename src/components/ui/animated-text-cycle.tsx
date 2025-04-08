import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
  
  // Find the longest word to set minimum width
  const longestWord = words.reduce((a, b) => a.length > b.length ? a : b);
  const minWidth = `${longestWord.length}ch`;

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((current) => (current + 1) % words.length);
        setIsVisible(true);
      }, 200);
    }, interval);

    return () => clearInterval(intervalId);
  }, [interval, words.length]);

  return (
    <div 
      className="inline-block relative" 
      style={{ 
        minWidth,
        width: 'auto',
        height: '1.5em',
        lineHeight: '1.5em'
      }}
    >
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute inset-0 whitespace-nowrap ${className}`}
            style={{ 
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-start',
              width: '100%',
              height: '100%'
            }}
          >
            {words[currentIndex]}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}