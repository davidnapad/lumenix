import React from 'react';
import { motion } from 'framer-motion';
import { Search, ClipboardList, FlaskConical, Rocket, Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    title: "Erstgespräch & Analyse",
    description: "Wir besprechen deine Anforderungen und analysieren deine Prozesse.",
    icon: Search,
    position: 'left'
  },
  {
    title: "Lösungsvorschlag",
    description: "Du erhältst einen konkreten Plan für deine individuelle KI-Lösung.",
    icon: ClipboardList,
    position: 'right'
  },
  {
    title: "Umsetzung & Test",
    description: "Wir entwickeln und testen deine Lösung bis zur Perfektion.",
    icon: FlaskConical,
    position: 'left'
  },
  {
    title: "Go Live",
    description: "Deine KI-Lösung geht in den Produktivbetrieb.",
    icon: Rocket,
    position: 'right'
  },
  {
    title: "Support & Optimierung",
    description: "Kontinuierliche Betreuung und Verbesserung deiner Lösung.",
    icon: Wrench,
    position: 'left'
  }
];

export default function CurvedTimeline() {
  return (
    <section id="ablauf" className="min-h-[600px] relative overflow-hidden bg-white py-12 scroll-mt-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#00dfff]/5 to-[#A855F7]/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-2">
            In 5 Schritten zur smarten KI-Lösung
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Unser bewährter Prozess für deine erfolgreiche KI-Integration
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* The curved flow line with more dynamic path */}
          <svg 
            className="absolute left-1/2 -translate-x-1/2 h-full w-full"
            viewBox="0 0 1000 800"
            preserveAspectRatio="none"
            style={{ top: '30px' }}
          >
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#00dfff" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>

            {/* Background glow for the path */}
            <motion.path
              d="M500,0 
                 C800,160 200,320 500,400 
                 C800,480 200,640 500,800"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="8"
              strokeLinecap="round"
              className="opacity-20 blur-md"
            />

            {/* Main animated path */}
            <motion.path
              d="M500,0 
                 C800,160 200,320 500,400 
                 C800,480 200,640 500,800"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2, ease: "easeInOut" }}
            />
          </svg>

          {/* Steps */}
          <div className="relative">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                className={`flex items-center mb-16 last:mb-0 ${
                  step.position === 'left' ? 'justify-start' : 'justify-end'
                }`}
                initial={{ opacity: 0, x: step.position === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <motion.div 
                  className={`flex items-center gap-4 max-w-md relative group ${
                    step.position === 'left' ? 'flex-row' : 'flex-row-reverse'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                >
                  {/* Glowing background */}
                  <div className="absolute inset-0 -m-2 bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Glass background */}
                  <div className="absolute inset-0 -m-2 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20" />

                  {/* Content container */}
                  <div className={`relative flex items-center gap-4 p-4 ${
                    step.position === 'left' ? 'flex-row' : 'flex-row-reverse'
                  }`}>
                    {/* Icon with connecting line */}
                    <motion.div 
                      className="w-10 h-10 rounded-full bg-gradient-to-r from-[#00dfff] to-[#A855F7] p-[2px] relative z-10 group"
                      whileHover={{ scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    >
                      <div className="w-full h-full rounded-full bg-white flex items-center justify-center group-hover:bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10 transition-colors duration-300">
                        <step.icon className="w-5 h-5 text-gray-800 group-hover:text-gray-900 transition-colors duration-300" />
                      </div>
                      {/* Enhanced glow effect */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>

                    {/* Text content */}
                    <div className="flex-1">
                      <h3 className="text-base font-bold mb-1 bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent">
                        {step.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div 
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <Link 
            to="/kalender"
            className="inline-flex items-center px-6 py-3 rounded-xl text-white font-medium transition-all duration-300 bg-gradient-to-r from-[#00dfff] to-[#A855F7] hover:shadow-lg hover:shadow-purple-500/20 hover:-translate-y-1 text-sm"
          >
            Jetzt Erstgespräch buchen
            <Rocket className="ml-2 w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}