import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MessageSquare, Settings, Clock, TrendingUp, Smile, RefreshCw } from 'lucide-react';
import { AuroraBackground } from '../components/ui/aurora-background';
import { GradientIcon } from '../components/ui/GradientIcon';
import { motion, useReducedMotion } from 'framer-motion';
import ChatbotDemo from '../components/ChatbotDemo';
import TeamSection from '../components/TeamSection';
import CurvedTimeline from '../components/sections/CurvedTimeline';
import { Accordion } from '../components/ui/Accordion';
import AnimatedCtaBottom from '../components/sections/animated-cta-bottom';

export default function HomePage() {
  const prefersReducedMotion = useReducedMotion();
  
  const faqItems = [
    {
      question: "Was kostet ein KI-Chatbot?",
      answer: "Das hängt vom Umfang und Einsatzbereich ab – wir erstellen dir ein individuelles Angebot."
    },
    {
      question: "Wie lange dauert die Umsetzung?",
      answer: "Je nach Projektumfang dauert es in der Regel zwischen 1 und 3 Wochen."
    },
    {
      question: "Muss ich etwas programmieren oder vorbereiten?",
      answer: "Nein. Wir übernehmen Setup, Training und Integration – komplett ohne Aufwand für dich."
    },
    {
      question: "Kann der Bot mit meinem System verbunden werden?",
      answer: "Ja. Wir integrieren ihn z. B. in CRM, Webseiten, Support-Systeme oder Tools deiner Wahl."
    }
  ];

  const scrollToDemo = () => {
    const demoSection = document.getElementById('chatbot-demo');
    if (demoSection) {
      const headerOffset = 80;
      const elementPosition = demoSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: prefersReducedMotion ? 'auto' : 'smooth'
      });
    }
  };

  return (
    <>
      {/* Hero Section with Aurora Background */}
      <AuroraBackground className="pt-24 md:pt-28 pb-20">
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
            <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-8 text-gray-900">
              Bring dein Business aufs{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7] mt-2 block">
                nächste Level mit KI.
              </span>
            </h1>

            <p className="mt-2 md:mt-6 text-lg md:text-xl text-gray-800 max-w-3xl mx-auto">
              Voice Agents, Chatbots & Automatisierungen – individuell für dein Business.
            </p>

            <div className="mt-8 md:mt-10 flex flex-col md:flex-row justify-center gap-4 md:gap-6">
              <Link 
                to="/kalender"
                className="glass-button inline-flex items-center px-8 py-4 rounded-xl text-white transition-all active:scale-95 w-full md:w-auto justify-center will-change-transform"
                style={{
                  background: 'linear-gradient(to right, #00dfff, #A855F7)',
                }}
              >
                <motion.span
                  className="flex items-center"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  Kostenlose Erstberatung
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </Link>
              <button 
                onClick={scrollToDemo}
                className="glass-button inline-flex items-center px-8 py-4 rounded-xl text-white transition-all active:scale-95 w-full md:w-auto justify-center will-change-transform"
                style={{
                  background: 'linear-gradient(to right, #00dfff, #A855F7)',
                }}
              >
                <motion.span
                  className="flex items-center"
                  whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                >
                  Demo ansehen
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </motion.span>
              </button>
            </div>
          </div>
        </motion.div>
      </AuroraBackground>

      {/* Services Section */}
      <motion.section 
        id="leistungen" 
        className="py-20 bg-gray-50 scroll-mt-32"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">🔧 Das machen wir für dich</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              className="hover-card bg-white p-8 rounded-xl text-center will-change-transform"
              whileHover={prefersReducedMotion ? {} : { y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GradientIcon icon={Phone} className="h-12 w-12 mb-6 mx-auto" />
              <h3 className="text-xl font-bold mb-4">KI Voice Agents</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Automatisierte Telefongespräche</li>
                <li>Terminvereinbarung & Anfragen beantworten</li>
                <li>Ideal für Support & Hotlines</li>
              </ul>
            </motion.div>
            <motion.div 
              className="hover-card bg-white p-8 rounded-xl text-center will-change-transform"
              whileHover={prefersReducedMotion ? {} : { y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GradientIcon icon={MessageSquare} className="h-12 w-12 mb-6 mx-auto" />
              <h3 className="text-xl font-bold mb-4">KI Chatbots</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Auf Website, WhatsApp oder Messenger</li>
                <li>24/7 für deine Kunden erreichbar</li>
                <li>Qualifiziert Leads & beantwortet Fragen</li>
              </ul>
            </motion.div>
            <motion.div 
              className="hover-card bg-white p-8 rounded-xl text-center will-change-transform"
              whileHover={prefersReducedMotion ? {} : { y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GradientIcon icon={Settings} className="h-12 w-12 mb-6 mx-auto" />
              <h3 className="text-xl font-bold mb-4">KI-Automatisierungen</h3>
              <ul className="space-y-2 text-gray-600">
                <li>CRM-Verknüpfung, Aufgaben automatisieren</li>
                <li>Follow-ups, Formulare, Workflows</li>
                <li>Spart Zeit & sorgt für bessere Abläufe</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Team Section - Moved here */}
      <section id="ueber-uns">
        <TeamSection />
      </section>

      {/* Chatbot Demo */}
      <section id="chatbot-demo">
        <ChatbotDemo />
      </section>

      {/* Benefits */}
      <motion.section 
        className="py-20 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
      >
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">🚀 Mit KI effizienter arbeiten – und entspannter wachsen</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <motion.div 
              className="text-center will-change-transform"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GradientIcon icon={Clock} className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold">Mehr Fokus auf<br />das Wesentliche</h3>
            </motion.div>
            <motion.div 
              className="text-center will-change-transform"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GradientIcon icon={TrendingUp} className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold">Mehr Anfragen mit<br />weniger Aufwand</h3>
            </motion.div>
            <motion.div 
              className="text-center will-change-transform"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GradientIcon icon={Smile} className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold">Besserer<br />Kundenservice</h3>
            </motion.div>
            <motion.div 
              className="text-center will-change-transform"
              whileHover={prefersReducedMotion ? {} : { scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <GradientIcon icon={RefreshCw} className="h-12 w-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold">Routine minimieren,<br />Effizienz steigern</h3>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Process Timeline */}
      <CurvedTimeline />

      {/* FAQ */}
      <motion.section 
        className="py-20 bg-gray-50"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">❓ Häufig gestellte Fragen</h2>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <Accordion items={faqItems} />
          </div>
        </div>
      </motion.section>

      {/* Animated CTA Bottom */}
      <AnimatedCtaBottom />
    </>
  );
}