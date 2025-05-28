import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown, Headphones, MessageSquare, Settings } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { ProblemCta } from './ui/ProblemCta';

interface ProblemCardProps {
  title: string;
  subtitle: string;
  solution: string;
  icon: React.ElementType;
  color: string;
  index: number;
}

const ProblemCard: React.FC<ProblemCardProps> = ({ 
  title, 
  subtitle, 
  solution, 
  icon: Icon,
  color,
  index 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
  
  return (
    <motion.div 
      className="flex flex-col h-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-visible"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "50px" }}
      transition={{ 
        duration: prefersReducedMotion ? 0.3 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1
      }}
    >
      {/* Card Header */}
      <div className="p-4 md:p-6 flex flex-col gap-3 md:gap-4">
        <div className="flex items-start gap-3 md:gap-4">
          <div className={`p-2 md:p-3 bg-gradient-to-r ${color}/10 rounded-xl shrink-0`}>
            <Icon className={`h-5 w-5 md:h-6 md:w-6 ${color}`} />
          </div>
          <div className="flex-1">
            <h3 className="text-base md:text-xl font-bold mb-1 md:mb-2 break-words">{title}</h3>
            <p className="text-gray-600 text-xs md:text-sm break-words">{subtitle}</p>
          </div>
        </div>
        
        {/* Toggle Button */}
        <button
          onClick={toggleExpanded}
          className="flex items-center justify-between w-full mt-1 md:mt-2 text-left group"
          style={{ minHeight: '44px' }}
        >
          <span className="text-xs md:text-sm font-medium bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent">
            {isExpanded ? "Weniger anzeigen" : "Lösung anzeigen"}
          </span>
          <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
            className={`p-1 rounded-full bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10 group-hover:from-[#00dfff]/20 group-hover:to-[#A855F7]/20 transition-colors`}
          >
            <ChevronDown className="w-4 h-4 text-gray-600" />
          </motion.div>
        </button>
      </div>
      
      {/* Collapsible Solution */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-6 pb-4 md:pb-6 border-t border-gray-100 pt-3 md:pt-4 bg-gradient-to-r from-[#00dfff]/5 to-[#A855F7]/5">
              <p className="text-gray-700 text-xs md:text-sm break-words whitespace-normal">{solution}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default function BusinessProblemsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const prefersReducedMotion = useReducedMotion();
  
  const problems = [
    {
      title: "Verpasste Anrufe überfordern Ihr Team",
      subtitle: "Viele Unternehmen verpassen eingehende Anrufe oder stellen Extrapersonal ein – was zu verlorenen Leads und hohen Kosten führt.",
      solution: "Unser VoiceAgent beantwortet, qualifiziert und bearbeitet Anrufe automatisch – sogar außerhalb der Geschäftszeiten.",
      icon: Headphones,
      color: "from-[#A855F7] to-[#A855F7]",
    },
    {
      title: "Ihr Support ertrinkt in wiederkehrenden Fragen",
      subtitle: "Teams verbringen Stunden damit, dieselben Dinge per E-Mail oder WhatsApp zu beantworten – was die Abläufe verlangsamt.",
      solution: "Unser KI-Chatbot beantwortet gängige Kundenanfragen sofort – rund um die Uhr über alle Kanäle.",
      icon: MessageSquare,
      color: "from-[#00dfff] to-[#00dfff]",
    },
    {
      title: "Manuelle Aufgaben töten Ihre Effizienz",
      subtitle: "Daten eingeben, E-Mails senden, CRMs verwalten – alles summiert sich zu enormem Zeitaufwand.",
      solution: "Mit intelligenter Automatisierung verbinden wir Ihre Tools und eliminieren repetitive Arbeit.",
      icon: Settings,
      color: "from-[#22c55e] to-[#22c55e]",
    }
  ];
  
  return (
    <section ref={ref} id="probleme" className="py-12 md:py-16 pb-0 bg-gray-50 scroll-mt-32 content-visibility-auto">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-8 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Herausforderungen in Deinem Business</h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-sm md:text-base px-2">
            Erkenne typische Probleme in modernen Unternehmen und wie KI-Lösungen diese effektiv beheben können.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mb-6 md:mb-8">
          {problems.map((problem, index) => (
            <ProblemCard
              key={index}
              title={problem.title}
              subtitle={problem.subtitle}
              solution={problem.solution}
              icon={problem.icon}
              color={problem.color}
              index={index}
            />
          ))}
        </div>
        
        {/* Integrated CTA - The ProblemCta is now part of this section */}
        <div className="mt-2 md:mt-4">
          <ProblemCta />
        </div>
      </div>
    </section>
  );
}