import React, { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { AuroraBackground } from '../components/ui/aurora-background';
import { motion, useReducedMotion } from 'framer-motion';
import ChatbotDemo from '../components/ChatbotDemo';
import TeamSection from '../components/TeamSection';
import { Accordion } from '../components/ui/Accordion';
import AnimatedCtaBottom from '../components/sections/animated-cta-bottom';
import { SurveyPopup } from '../components/ui/SurveyPopup';
import { SparklesCore } from '../components/ui/sparkles';
import KiSolutionsSection from '../components/KiSolutionsSection';
import BusinessProblemsSection from '../components/BusinessProblemsSection';
import { AlternatingProcessTimeline } from '../components/ui/AlternatingProcessTimeline';
import ShuffleCards from '../components/sections/ShuffleCards';
import { GradientButton } from '../components/shared/GradientButton';

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  const [surveyOpen, setSurveyOpen] = useState(false);
  
  // Ensure section IDs are properly set up
  useEffect(() => {
    // Check if section elements exist with the correct IDs
    const sectionIds = ['leistungen', 'ablauf', 'ueber-uns'];
    const missingSections = [];
    
    for (const id of sectionIds) {
      const section = document.getElementById(id);
      if (!section) {
        missingSections.push(id);
        console.warn(`Section with id "${id}" not found in the document.`);
      }
    }
    
    // Verify scroll-margin-top is properly applied
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      const computedStyle = window.getComputedStyle(section);
      const scrollMarginTop = computedStyle.scrollMarginTop;
      
      // If scroll-margin-top is not set or too small, apply it directly
      if (scrollMarginTop === '0px' || parseInt(scrollMarginTop) < 100) {
        section.style.scrollMarginTop = '120px';
      }
    });
  }, []);
  
  const faqItems = [
    {
      question: "Was unterscheidet Lumenix von anderen Agenturen?",
      answer: "Wir kombinieren Spitzentechnologie mit maßgeschneiderten Strategien zur KI-Automatisierung. Unser Fokus liegt auf maximaler Prozesseffizienz und messbarem Wachstum für dein Business."
    },
    {
      question: "Braucht mein Unternehmen überhaupt eine KI-Lösung?",
      answer: "Unternehmen, die KI nutzen, überholen bereits ihre Konkurrenz durch Automatisierung und Kostenersparnis. Wer technologische Entwicklungen ignoriert, riskiert den Anschluss zu verlieren."
    },
    {
      question: "Wie lange dauert die Umsetzung?",
      answer: "Je nach Projektumfang zwischen 2 und 6 Wochen. Einfache Chatbots sind oft in 2 Wochen einsatzbereit, komplexere Integrationen benötigen etwas mehr Zeit."
    },
    {
      question: "Muss ich etwas programmieren oder vorbereiten?",
      answer: "Nein, wir übernehmen den kompletten technischen Prozess. Du brauchst keine Vorkenntnisse – wir benötigen lediglich dein Fachwissen über dein Unternehmen."
    },
    {
      question: "Kann der Bot mit meinem System verbunden werden?",
      answer: "Ja, wir integrieren KI-Lösungen nahtlos in deine bestehenden Systeme wie CRM, Website und Support-Tools. Wir unterstützen alle gängigen Plattformen sowie individuelle Systeme."
    }
  ];

  const openSurvey = (e: React.MouseEvent) => {
    e.preventDefault();
    setSurveyOpen(true);
  };
  
  // Add event listener for the custom event
  React.useEffect(() => {
    const handleOpenSurvey = () => {
      setSurveyOpen(true);
    };
    
    window.addEventListener('openSurvey', handleOpenSurvey);
    
    return () => {
      window.removeEventListener('openSurvey', handleOpenSurvey);
    };
  }, []);

  return (
    <>
      {/* Survey Popup */}
      <SurveyPopup isOpen={surveyOpen} onClose={() => setSurveyOpen(false)} />

      {/* Hero Section with Aurora Background */}
      <AuroraBackground className="pt-2 md:pt-20 pb-2 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: prefersReducedMotion ? 0.1 : 0.3,
            duration: prefersReducedMotion ? 0.3 : 0.8,
            ease: "easeInOut",
          }}
          className="max-w-7xl mx-auto px-4 text-center relative z-10"
        >
          <div className="flex flex-col items-center">
            {/* Decorative elements hidden on mobile */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "80px", maxWidth: "25%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="h-[2px] bg-gradient-to-r from-transparent via-[#00dfff] to-transparent mb-1 md:mb-6 hidden md:block"
            />
            
            <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-1 md:mb-1 text-gray-900 mt-28 md:mt-0">
              Bring dein Business aufs{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7] mt-0 md:mt-2 block">
                nächste Level mit KI.
              </span>
            </h1>

            {/* SparklesCore component - Hidden on mobile */}
            <div className="relative w-full md:w-[40rem] h-0 md:h-16 mx-auto -mt-0 md:-mt-2 mb-0">
              <SparklesCore
                background="transparent"
                minSize={0.4}
                maxSize={1}
                particleDensity={400}
                className="w-full h-full hidden md:block"
                particleColor="#FFFFFF"
              />
              <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)] hidden md:block"></div>
            </div>

            <p className="mt-1 md:mt-2 text-sm md:text-lg lg:text-xl text-gray-900 max-w-3xl mx-auto mb-3 md:mb-6">
              Revolutioniere dein Unternehmen mit KI-gestützter Automatisierung – mehr Effizienz, weniger Aufwand.
            </p>

            <div className="mt-1 md:mt-2 flex flex-col md:flex-row justify-center gap-2 md:gap-6">
              {/* First CTA Button */}
              <div className="w-full max-w-xs md:max-w-md">
                <GradientButton 
                  label="Kostenlose Erstberatung" 
                  to="/kalender" 
                  size="md" 
                />
              </div>
              
              {/* Glassmorphism Demo Button */}
              <div className="w-full max-w-xs md:max-w-md mt-2 md:mt-0">
                <button 
                  onClick={openSurvey}
                  className="w-full inline-flex items-center justify-center px-6 py-3 rounded-xl text-gray-900 text-sm md:text-base font-semibold transition-all active:scale-95 relative group"
                  style={{ 
                    minHeight: '48px', 
                    height: '48px',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: '1.5px solid transparent',
                    backgroundImage: `
                      linear-gradient(to right, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.8)), 
                      linear-gradient(to right, #00dfff, #A855F7)
                    `,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)'
                  }}
                >
                  <span className="flex items-center whitespace-nowrap">
                    Demo anfragen
                    <ChevronDown className="ml-2 w-4 h-4 md:w-5 md:h-5" />
                  </span>
                </button>
                
                <p className="mt-1 text-xs text-center text-gray-900 font-medium">
                  Deine individuelle KI-Demo in 48h – kostenlos!
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </AuroraBackground>

      {/* Solutions and Demos Section */}
      <KiSolutionsSection />
      
      {/* Business Problems Section */}
      <BusinessProblemsSection />

      {/* Process Timeline */}
      <AlternatingProcessTimeline />

      {/* Team Section */}
      <section id="ueber-uns">
        <TeamSection />
      </section>

      {/* Chatbot Demo */}
      <section id="chatbot-demo">
        <ChatbotDemo />
      </section>

      {/* Testimonials Section */}
      <ShuffleCards />

      {/* FAQ Section */}
      <motion.section 
        className="py-12 md:py-20 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 md:mb-12">Häufig gestellte Fragen</h2>
          <div className="rounded-xl md:rounded-2xl overflow-hidden shadow-lg">
            <Accordion items={faqItems} />
          </div>
        </div>
      </motion.section>

      {/* Animated CTA Bottom */}
      <AnimatedCtaBottom />
    </>
  );
}