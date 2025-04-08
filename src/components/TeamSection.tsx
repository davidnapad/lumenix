import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TeamMember } from './ui/TeamMember';
import { BotMascot } from './ui/BotMascot';

export default function TeamSection() {
  const [botDirection, setBotDirection] = useState<'left' | 'right' | null>(null);

  return (
    <section id="about" className="py-20 relative overflow-hidden bg-gray-50 scroll-mt-20">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00dfff]/5 to-[#A855F7]/5 blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Unser Team
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Experten für KI-Integration und Automatisierung – wir machen dein Business fit für die Zukunft.
          </p>
        </motion.div>

        <div className="grid grid-cols-3 gap-2 md:gap-6">
          <motion.div 
            className="w-full"
            onMouseEnter={() => setBotDirection('left')} 
            onMouseLeave={() => setBotDirection(null)}
          >
            <TeamMember
              name="David"
              role="Kundenbetreuung & KI-Beratung"
              image="https://i.postimg.cc/V66qXsmP/DSC02935-Photoroom-1.jpg"
              subtitle="Beratung, Support & Prozessautomatisierung"
              className="scale-[0.85] md:scale-100 origin-top"
            />
          </motion.div>
          
          <div className="flex items-center justify-center">
            <BotMascot direction={botDirection} />
          </div>
          
          <motion.div 
            className="w-full"
            onMouseEnter={() => setBotDirection('right')} 
            onMouseLeave={() => setBotDirection(null)}
          >
            <TeamMember
              name="Daniel"
              role="Entwicklung"
              image="https://i.postimg.cc/TP5mP53F/DSC02935-Photoroom.jpg"
              subtitle="Systemarchitektur & Automatisierung"
              className="scale-[0.85] md:scale-100 origin-top"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}