import React, { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { MessageSquare, Clock, Plug, MessageCircle, TrendingUp } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { GradientIcon } from './ui/GradientIcon';

interface Feature {
  icon: React.ElementType;
  title: string;
  description: string;
  hasNumbers?: boolean;
}

const features: Feature[] = [
  {
    icon: Clock,
    title: "🧲 +63% Conversionrate",
    description: "Führt mehr Besucher zur Aktion – automatisch.",
    hasNumbers: true
  },
  {
    icon: MessageCircle,
    title: "🗣️ Spricht wie ein Mensch",
    description: "Natürlich, sympathisch – kein Bot-Feeling.",
  },
  {
    icon: Plug,
    title: "🔌 Nahtlos integrierbar",
    description: "Funktioniert mit deinen Tools – direkt startklar.",
  },
  {
    icon: Clock,
    title: "⏱️ −76% Zeitaufwand",
    description: "Automatisiert deine Abläufe – spart wertvolle Zeit.",
    hasNumbers: true
  },
  {
    icon: MessageSquare,
    title: "💬 −71% Supportkosten",
    description: "Reduziert repetitive Anfragen rund um die Uhr.",
    hasNumbers: true
  },
  {
    icon: TrendingUp,
    title: "📈 Lernt mit jeder Anfrage",
    description: "Wird smarter durch echte Kundengespräche.",
  }
];

export default function ChatbotDemo() {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [chatLoaded, setChatLoaded] = useState(false);
  const scriptLoaded = useRef(false);
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '200px 0px', // Load earlier when scrolling
  });

  // Only load the chat widget when the component is in view
  useEffect(() => {
    if (!inView || scriptLoaded.current || chatLoaded) return;
    
    const loadChat = () => {
      if (!window.VG_CONFIG) {
        window.VG_CONFIG = {
          ID: "sb24t3UQEoFWjVBgv0Hf",
          region: 'eu',
          render: 'full-width',
          stylesheets: [
            "https://vg-bunny-cdn.b-cdn.net/vg_live_build/styles.css"
          ]
        };
  
        const VG_SCRIPT = document.createElement("script");
        VG_SCRIPT.src = "https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js";
        VG_SCRIPT.defer = true;
        VG_SCRIPT.onload = () => {
          setIsLoading(false);
          setChatLoaded(true);
        };
        VG_SCRIPT.onerror = () => {
          setError('Failed to load chat widget');
          setIsLoading(false);
        };
        document.body.appendChild(VG_SCRIPT);
        scriptLoaded.current = true;
      }
    };

    // Delay loading the chat widget
    const timer = setTimeout(loadChat, 2000);
    
    return () => {
      clearTimeout(timer);
      if (scriptLoaded.current) {
        const script = document.querySelector('script[src="https://vg-bunny-cdn.b-cdn.net/vg_live_build/vg_bundle.js"]');
        if (script) {
          document.body.removeChild(script);
        }
      }
    };
  }, [inView, chatLoaded]);

  // Check for reduced motion and mobile devices
  const isReducedMotion = typeof window !== 'undefined' && 
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  
  return (
    <section ref={ref} className="py-16 md:py-20 bg-gray-50 overflow-hidden content-visibility-auto">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10 md:mb-16">Erlebe KI-Chatbots in Aktion</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Chatbot Demo Box */}
          <div className="relative">
            <motion.div 
              className="relative bg-white rounded-2xl h-[500px] md:h-[600px] overflow-hidden optimize-gpu prevent-reflow"
              initial={{ opacity: 0, y: isReducedMotion || isMobile ? 0 : 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: isReducedMotion || isMobile ? 0 : 20 }}
              transition={{ duration: isReducedMotion || isMobile ? 0.3 : 0.6 }}
              style={{
                boxShadow: `
                  0 0 0 1px rgba(255, 255, 255, 0.1),
                  inset 0 0 40px 0 rgba(0, 223, 255, 0.1),
                  inset 0 0 80px 0 rgba(168, 85, 247, 0.1),
                  0 0 20px 0 rgba(0, 223, 255, 0.2),
                  0 0 40px 0 rgba(168, 85, 247, 0.2)
                `,
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00dfff]/5 to-[#A855F7]/5 pointer-events-none" />
              
              {/* TIXAE Chatbot container */}
              <div className="absolute inset-0 flex items-center justify-center">
                {isLoading && inView && (
                  <div className="flex flex-col items-center justify-center w-full h-full p-6">
                    {/* Branded chatbot placeholder */}
                    <div className="relative mb-6">
                      {/* Glow effect behind logo */}
                      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00dfff]/30 to-[#A855F7]/30 blur-xl"></div>
                      
                      {/* Logo */}
                      <img 
                        src="https://i.postimg.cc/VvGDNZ46/Lumenix-8.png" 
                        alt="Lumenix Chatbot" 
                        className="relative w-16 md:w-20 h-16 md:h-20 object-contain"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Branded title */}
                    <h3 className="text-xl font-bold mb-2 bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent">
                      Lumenix Chatbot
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-4 text-center max-w-xs">
                      Dein KI-Assistent für schnelle und effiziente Kommunikation.
                    </p>
                    
                    {/* Message bubbles to simulate conversation */}
                    <div className="w-full max-w-sm space-y-3">
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10 px-4 py-2 rounded-xl rounded-tr-none text-gray-700 text-sm">
                          Wie kann ein Chatbot mein Business unterstützen?
                        </div>
                      </div>
                      
                      <motion.div 
                        className="flex justify-start"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <div className="bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 px-4 py-2 rounded-xl rounded-tl-none text-gray-700 text-sm">
                          Chatbots können dein Team entlasten, 24/7 Support bieten und Leads qualifizieren.
                        </div>
                      </motion.div>
                    </div>
                    
                    {/* Subtle loading indicator */}
                    <div className="mt-8 flex items-center">
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-[#00dfff] mx-1"
                        animate={{ 
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 1.5,
                        }}
                      />
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-[#00dfff] to-[#A855F7] mx-1"
                        animate={{ 
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 1.5,
                          delay: 0.5
                        }}
                      />
                      <motion.div 
                        className="w-2 h-2 rounded-full bg-[#A855F7] mx-1"
                        animate={{ 
                          opacity: [0.3, 1, 0.3],
                          scale: [0.8, 1, 0.8]
                        }}
                        transition={{ 
                          repeat: Infinity,
                          duration: 1.5,
                          delay: 1
                        }}
                      />
                    </div>
                  </div>
                )}
                
                {error && (
                  <div className="text-center p-8">
                    <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Chat Widget Unavailable</h3>
                    <p className="text-gray-600 mb-4">We're having trouble loading the chat widget.</p>
                    <p className="text-sm text-gray-500">Please try again later or contact support if the issue persists.</p>
                  </div>
                )}
                
                <div 
                  id="VG_OVERLAY_CONTAINER"
                  className="absolute inset-0 w-full h-full"
                  style={{
                    borderRadius: '16px',
                    overflow: 'hidden'
                  }}
                ></div>
              </div>
            </motion.div>
          </div>

          {/* Features */}
          <div className="relative">
            <motion.h3 
              className="text-xl md:text-2xl font-bold mb-6 bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent"
              initial={{ opacity: 0, y: isReducedMotion || isMobile ? 0 : -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: isReducedMotion || isMobile ? 0 : -20 }}
              transition={{ duration: isReducedMotion || isMobile ? 0.3 : 0.6 }}
            >
              Was kann der KI-Chatbot für dich tun?
            </motion.h3>
            
            <div className="grid grid-cols-2 gap-3 md:gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className={`bg-white p-4 md:p-6 rounded-xl text-center transition-all flex flex-col items-center relative overflow-visible ${
                    feature.hasNumbers ? 'bg-gradient-to-r from-[#00dfff]/5 to-[#A855F7]/5' : ''
                  }`}
                  initial={{ opacity: 0, y: isReducedMotion || isMobile ? 10 : 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: isReducedMotion || isMobile ? 10 : 20 }}
                  transition={{ 
                    delay: isReducedMotion || isMobile ? 0.1 : index * 0.05,
                    duration: isReducedMotion || isMobile ? 0.2 : 0.5
                  }}
                  style={{
                    transform: 'translateZ(0)', 
                    backfaceVisibility: 'hidden',
                    cursor: 'default'
                  }}
                >
                  <div className="p-3 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 rounded-xl mb-3 md:mb-4">
                    <GradientIcon icon={feature.icon} className="h-5 w-5 md:h-6 md:w-6" />
                  </div>
                  <h4 className="font-medium text-sm md:text-base mb-1 md:mb-2">{feature.title}</h4>
                  <p className="text-xs md:text-sm text-gray-600 break-words whitespace-normal">{feature.description}</p>
                </motion.div>
              ))}
            </div>

            <motion.p 
              className="text-center text-gray-600 mt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: isReducedMotion || isMobile ? 0.2 : 0.3 }}
            >
              ℹ️ Alle Funktionen auf einen Blick
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}