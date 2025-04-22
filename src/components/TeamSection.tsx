import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TeamMember } from './ui/TeamMember';
import { BotMascot } from './ui/BotMascot';
import { useInView } from 'react-intersection-observer';

export default function TeamSection() {
  const [botDirection, setBotDirection] = useState<'left' | 'right' | null>(null);
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '200px 0px', // Load earlier when scrolling
  });
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 relative overflow-hidden bg-gray-50 scroll-mt-20"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-white">
        <div className="absolute inset-0 bg-gradient-to-r from-[#00dfff]/5 to-[#A855F7]/5 blur-3xl opacity-30" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-8 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion || isMobile ? 0.3 : 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Über uns
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Experten für KI-Integration und Automatisierung – wir machen dein Business fit für die Zukunft.
          </p>
        </motion.div>

        <div className="relative">
          {/* Team members grid */}
          <div className="grid grid-cols-3 gap-2 md:gap-6">
            <motion.div 
              className="w-full"
              onMouseEnter={() => setBotDirection('left')} 
              onMouseLeave={() => setBotDirection(null)}
            >
              <TeamMember
                name="David"
                role="Kundenbetreuung & KI-Beratung"
                mobileRole="Planung & Entwicklung"
                image="https://i.postimg.cc/V66qXsmP/DSC02935-Photoroom-1.jpg"
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
                role="Systemarchitektur & Automatisierung"
                mobileRole="Entwicklung"
                image="https://i.postimg.cc/TP5mP53F/DSC02935-Photoroom.jpg"
                className="scale-[0.85] md:scale-100 origin-top"
              />
            </motion.div>
          </div>

          {/* Team Description */}
          <motion.div 
            className="mt-16 md:mt-20 max-w-3xl mx-auto text-center px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.2, duration: prefersReducedMotion || isMobile ? 0.3 : 0.5 }}
          >
            <div className="relative">
              {/* Glow effect */}
              <div 
                className="absolute -inset-[2px] rounded-2xl"
                style={{
                  background: 'linear-gradient(to right, rgba(0, 207, 255, 0.3), rgba(162, 89, 255, 0.3))',
                  boxShadow: isMobile ? 
                    '0 0 15px rgba(0, 207, 255, 0.2), 0 0 30px rgba(162, 89, 255, 0.1)' : 
                    '0 0 25px rgba(0, 207, 255, 0.3), 0 0 50px rgba(162, 89, 255, 0.2)',
                }}
              />
              
              {/* Content container */}
              <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-lg border border-white/20">
                <div className="text-gray-700 text-lg md:text-xl leading-[1.8] space-y-8">
                  <p>
                    <strong>Wir sind David und Daniel</strong> – seit über 8 Jahren ein eingespieltes Team.
                  </p>
                  <p>
                    <strong>Daniel</strong> bringt mit seinem Studium tiefes technisches Know-how im Bereich KI und Automatisierung ein.
                  </p>
                  <p>
                    <strong>David</strong> kümmert sich um alles rund um Beratung, Kundenbetreuung, Planung und Umsetzung.
                  </p>
                  <p>
                    <strong>Unsere Stärken ergänzen sich perfekt</strong> – so liefern wir gemeinsam maßgeschneiderte KI-Lösungen, die wirklich wirken.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}