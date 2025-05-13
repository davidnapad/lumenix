import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Magnet, MessageSquare, Clock, Plug, MessageCircle, TrendingUp } from 'lucide-react';
import { GradientIcon } from './ui/GradientIcon';
import { useInView } from 'react-intersection-observer';

interface Feature {
  icon: typeof Magnet;
  title: string;
  description: string;
  hasNumbers?: boolean;
}

const features: Feature[] = [
  {
    icon: Magnet,
    title: "🧲 +63% Conversionrate",
    description: "Führt mehr Besucher zur Aktion – automatisch.",
    hasNumbers: true
  },
  {
    icon: MessageCircle,
    title: "🗣️ Spricht wie ein Mensch",
    description: "Natürlich, sympathisch – kein Bot-Feeling."
  },
  {
    icon: Plug,
    title: "🔌 Nahtlos integrierbar",
    description: "Funktioniert mit deinen Tools – direkt startklar."
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
    description: "Wird smarter durch echte Kundengespräche."
  }
];

export default function ChatbotDemo() {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
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
    <section ref={ref} className="py-20 bg-gray-50 overflow-hidden content-visibility-auto">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-16">🤖 Erlebe KI-Chatbots in Aktion</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Chatbot Demo Box */}
          <div className="relative">
            <motion.div 
              className="relative bg-white rounded-2xl h-[600px] overflow-hidden optimize-gpu prevent-reflow"
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
                `
              }}
            >
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#00dfff]/5 to-[#A855F7]/5 pointer-events-none" />
              
              {/* TIXAE Chatbot container */}
              <div className="absolute inset-0 flex items-center justify-center">
                {isLoading && inView && (
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600">Loading chat widget...</p>
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
              className="text-2xl font-bold mb-6 bg-gradient-to-r from-accent-blue to-accent-purple bg-clip-text text-transparent"
              initial={{ opacity: 0, y: isReducedMotion || isMobile ? 0 : -20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: isReducedMotion || isMobile ? 0 : -20 }}
              transition={{ duration: isReducedMotion || isMobile ? 0.3 : 0.6 }}
            >
              Was kann der KI-Chatbot für dich tun?
            </motion.h3>

            {/* Feature Description Modal */}
            <AnimatePresence>
              {selectedFeature && (
                <motion.div
                  initial={{ opacity: 0, scale: isReducedMotion || isMobile ? 0.95 : 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: isReducedMotion || isMobile ? 0.95 : 0.9 }}
                  transition={{ duration: isReducedMotion || isMobile ? 0.2 : 0.3 }}
                  className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
                  onClick={() => setSelectedFeature(null)}
                >
                  <motion.div
                    className="bg-white rounded-2xl p-8 max-w-lg w-full relative overflow-hidden optimize-gpu"
                    onClick={e => e.stopPropagation()}
                    layoutId={isReducedMotion || isMobile ? undefined : `feature-${selectedFeature.title}`}
                  >
                    {/* Decorative elements */}
                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-blue rounded-full blur-3xl opacity-10"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-accent-purple rounded-full blur-3xl opacity-10"></div>
                    
                    <div className="relative">
                      <motion.div className="flex items-center gap-4 mb-6">
                        <div className="p-3 bg-gradient-to-r from-accent-blue to-accent-purple rounded-xl">
                          <GradientIcon icon={selectedFeature.icon} className="h-8 w-8 text-white" />
                        </div>
                        <h4 className="text-2xl font-bold">{selectedFeature.title}</h4>
                      </motion.div>
                      
                      <motion.p 
                        className="text-lg text-gray-700 leading-relaxed"
                        initial={{ opacity: 0, y: isReducedMotion || isMobile ? 10 : 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: isReducedMotion || isMobile ? 0.2 : 0.3 }}
                      >
                        {selectedFeature.description}
                      </motion.p>
                      
                      <motion.button
                        className="mt-8 text-sm text-gray-500 hover:text-gray-700 transition-colors"
                        onClick={() => setSelectedFeature(null)}
                      >
                        ← Zurück zur Übersicht
                      </motion.button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <motion.button
                  key={index}
                  layoutId={isReducedMotion || isMobile ? undefined : `feature-${feature.title}`}
                  onClick={() => setSelectedFeature(feature)}
                  className={`bg-white p-6 rounded-xl text-center transition-all flex flex-col items-center relative overflow-hidden hover:shadow-lg optimize-gpu ${
                    feature.hasNumbers ? 'bg-gradient-to-r from-[#00dfff]/5 to-[#A855F7]/5' : ''
                  }`}
                  initial={{ opacity: 0, y: isReducedMotion || isMobile ? 10 : 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: isReducedMotion || isMobile ? 10 : 20 }}
                  transition={{ 
                    delay: isReducedMotion || isMobile ? 0.1 : index * 0.05,
                    duration: isReducedMotion || isMobile ? 0.2 : 0.5
                  }}
                  whileHover={isReducedMotion || isMobile ? {} : { y: -5 }}
                  style={{
                    transform: 'translateZ(0)', // Force GPU acceleration
                    backfaceVisibility: 'hidden'
                  }}
                >
                  <div className="p-3 bg-gradient-to-r from-accent-blue/10 to-accent-purple/10 rounded-xl mb-4">
                    <GradientIcon icon={feature.icon} className="h-6 w-6" />
                  </div>
                  <h4 className="font-medium text-lg">{feature.title}</h4>
                </motion.button>
              ))}
            </div>

            {!selectedFeature && (
              <motion.p 
                className="text-center text-gray-600 mt-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: isReducedMotion || isMobile ? 0.2 : 0.3 }}
              >
                ℹ️ Klicke auf eine Funktion für mehr Details
              </motion.p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}