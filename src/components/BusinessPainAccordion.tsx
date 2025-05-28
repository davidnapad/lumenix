import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface Item {
  id: string;
  title: string;
  subtitle: string;
  content: string;
}

const items: Item[] = [
  {
    id: "calls",
    title: "Verpasste Anrufe überfordern Ihr Team",
    subtitle: "Viele Unternehmen verpassen eingehende Anrufe oder stellen Extrapersonal ein – was zu verlorenen Leads und hohen Kosten führt.",
    content: "Unser VoiceAgent beantwortet, qualifiziert und bearbeitet Anrufe automatisch – sogar außerhalb der Geschäftszeiten."
  },
  {
    id: "support",
    title: "Ihr Support ertrinkt in wiederkehrenden Fragen",
    subtitle: "Teams verbringen Stunden damit, dieselben Dinge per E-Mail oder WhatsApp zu beantworten – was die Abläufe verlangsamt.",
    content: "Unser KI-Chatbot beantwortet gängige Kundenanfragen sofort – rund um die Uhr über alle Kanäle."
  },
  {
    id: "tasks",
    title: "Manuelle Aufgaben töten Ihre Effizienz",
    subtitle: "Daten eingeben, E-Mails senden, CRMs verwalten – alles summiert sich zu enormem Zeitaufwand.",
    content: "Mit intelligenter Automatisierung verbinden wir Ihre Tools und eliminieren repetitive Arbeit."
  }
];

export default function BusinessPainAccordion() {
  const [openId, setOpenId] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const toggle = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">Herausforderungen in Deinem Business</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Erkenne typische Probleme in modernen Unternehmen und wie KI-Lösungen diese effektiv beheben können.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.map((item) => (
            <motion.div
              key={item.id}
              className="rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                duration: prefersReducedMotion ? 0.3 : 0.5,
                delay: prefersReducedMotion ? 0 : items.findIndex(i => i.id === item.id) * 0.1 
              }}
            >
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm text-gray-600">{item.subtitle}</p>
                
                <button
                  onClick={() => toggle(item.id)}
                  className="mt-4 flex items-center justify-between w-full group"
                  aria-expanded={openId === item.id}
                  aria-controls={`content-${item.id}`}
                >
                  <span className="text-sm font-medium bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent">
                    {openId === item.id ? "Weniger anzeigen" : "Lösung anzeigen"}
                  </span>
                  <motion.div
                    animate={{ rotate: openId === item.id ? 180 : 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 0.2 }}
                    className="p-1 rounded-full bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10 group-hover:from-[#00dfff]/20 group-hover:to-[#A855F7]/20 transition-colors"
                  >
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </motion.div>
                </button>
              </div>
              
              <AnimatePresence initial={false}>
                {openId === item.id && (
                  <motion.div
                    id={`content-${item.id}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: prefersReducedMotion ? 0.1 : 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-gray-100 pt-4 bg-gradient-to-r from-[#00dfff]/5 to-[#A855F7]/5">
                      <p className="text-gray-700">{item.content}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}