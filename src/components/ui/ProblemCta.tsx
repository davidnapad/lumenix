import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { GradientButton } from '../shared/GradientButton';

export function ProblemCta() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="w-full px-4 md:px-6 py-8 md:py-10 flex justify-center">
      <motion.div 
        className="w-full max-w-4xl text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
      >
        <h3 className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent mb-4 md:mb-6">
          Erkennst du dich hier wieder?
        </h3>
        
        <p className="text-gray-600 mb-6 md:mb-8 max-w-xl mx-auto text-sm md:text-base">
          Dann lass uns gemeinsam herausfinden, welche KI-Lösungen zu deinem Unternehmen passen.
        </p>
        
        {/* Using the shared GradientButton component */}
        <div className="mx-auto max-w-xs md:max-w-md">
          <GradientButton 
            label="Kostenloses Analysegespräch vereinbaren" 
            to="/kalender" 
            size="md"
          />
        </div>
      </motion.div>
    </div>
  );
}