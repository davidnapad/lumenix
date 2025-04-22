import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnimatedWordCycle from '../ui/animated-text-cycle';
import { Button as MovingBorderButton } from '../ui/moving-border';

export default function AnimatedCtaBottom() {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.section 
      className="w-full py-20 bg-white"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
    >
      <div className="max-w-4xl mx-auto px-4 text-center">
        <motion.h2 
          className="text-3xl md:text-5xl font-light text-gray-900 leading-tight"
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
          className="mt-6 text-lg text-gray-600"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0.1 : 0.2 }}
        >
          Lass uns gemeinsam deine Geschäftsprozesse optimieren und in die Zukunft führen.
        </motion.p>

        <div className="relative mt-8 flex flex-col items-center">
          <MovingBorderButton
            borderRadius="1rem"
            className="bg-gradient-to-r from-[#00dfff] to-[#A855F7] text-white font-medium hover:shadow-xl transition-all duration-500 will-change-transform"
            as={Link}
            to="/kalender"
            containerClassName="w-auto hover:scale-[1.02] active:scale-[0.98] transition-transform duration-500"
            borderClassName="bg-[radial-gradient(circle,var(--accent-blue)_20%,var(--accent-purple)_30%,transparent_70%)] opacity-70"
            duration={prefersReducedMotion ? 6000 : 4000}
          >
            <span className="flex items-center px-8 py-4">
              Kostenloses Erstgespräch buchen
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
            </span>
          </MovingBorderButton>
          <motion.p
            className="mt-3 text-sm text-gray-500"
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