import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import AnimatedWordCycle from '../ui/animated-text-cycle';
import { GradientButton } from '../shared/GradientButton';

export default function AnimatedCtaBottom() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.section 
      className="w-full py-16 md:py-20 bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2 
          className="text-2xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Mehr Fokus. Weniger Stress.
          <div className="flex items-center justify-center mt-2 gap-3">
            <span className="text-gray-900 font-semibold">Bessere</span>
            <AnimatedWordCycle 
              words={[
                "Struktur",
                "Abläufe",
                "Prozesse",
                "Ergebnisse",
                "Effizienz"
              ]}
              interval={prefersReducedMotion ? 3000 : 2000}
              className="bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent font-semibold"
            />
          </div>
        </motion.h2>
        
        <motion.p 
          className="mt-4 md:mt-6 text-base md:text-lg text-gray-600 text-center mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0.1 : 0.2 }}
        >
          Lass uns gemeinsam deine Geschäftsprozesse optimieren und in die Zukunft führen.
        </motion.p>

        <div className="relative mt-6 md:mt-8 flex flex-col items-center justify-center">
          {/* Using the shared GradientButton component with vertical alignment fix */}
          <div className="mx-auto block w-full max-w-xs md:max-w-md">
            <GradientButton 
              label="Kostenloses Erstgespräch buchen" 
              to="/kalender" 
              size="lg"
            />
          </div>
          <motion.p
            className="mt-3 text-sm text-gray-500 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0.2 : 0.4 }}
          >
            100% Kostenlos
          </motion.p>
        </div>
      </div>
    </motion.section>
  );
}