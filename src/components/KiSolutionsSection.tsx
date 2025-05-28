import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone, MessageSquare, Settings, ArrowUpRight, ShoppingCart, Headphones, MessageCircle } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { GradientIcon } from './ui/GradientIcon';
import { VideoCard } from './shared/VideoCard';
import { GradientHeading } from './ui/GradientHeading';

// Animation process step component
interface ProcessStepProps {
  icon: React.ElementType;
  text: string;
  delay: number;
  isLast?: boolean;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ icon: Icon, text, delay, isLast }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="relative">
      <motion.div 
        className="flex items-center gap-3 relative z-10"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ 
          duration: prefersReducedMotion ? 0.2 : 0.5,
          delay: prefersReducedMotion ? 0 : delay
        }}
        whileHover={prefersReducedMotion ? {} : { x: 5 }}
      >
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isLast ? 'bg-green-100' : 'bg-[#00dfff]/10'}`}>
          <Icon className={`w-5 h-5 ${isLast ? 'text-green-600' : 'text-[#00dfff]'}`} />
        </div>
        <span className={`text-sm md:text-base ${isLast ? 'font-semibold text-green-600' : 'text-gray-700'}`}>
          {text}
        </span>
      </motion.div>
      
      {/* Connector line (except for last item) */}
      {!isLast && (
        <motion.div 
          className="absolute top-10 left-5 w-[1px] h-10 bg-gradient-to-b from-[#00dfff] to-[#A855F7]/50 z-0"
          initial={{ height: 0, opacity: 0 }}
          whileInView={{ height: 40, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: prefersReducedMotion ? 0.2 : 0.8,
            delay: prefersReducedMotion ? 0 : delay + 0.2
          }}
        >
          <div className="absolute inset-0 blur-sm bg-[#00dfff]/30"></div>
        </motion.div>
      )}
    </div>
  );
};

export default function KiSolutionsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const prefersReducedMotion = useReducedMotion();
  
  // Video data - Reordered with the chatbot in the center
  const videos = [
    {
      title: "KI Voice Agent – Wohnungssuche",
      badgeText: "Outbound Call",
      badgeIcon: ArrowUpRight,
      thumbnailUrl: "https://i.postimg.cc/HxvFY7Fj/Voice-Agent.png",
      videoId: "tV7xkIRFLc8"
    },
    {
      title: "KI Chatbot – Schuhe kaufen",
      badgeText: "E-Commerce Bot",
      badgeIcon: ShoppingCart,
      thumbnailUrl: "https://i.postimg.cc/bwwLJzvf/Chatbot.png",
      videoId: "ha3DVlQRUdY"
    },
    {
      title: "KI Voice Agent – Zahnarzttermin",
      badgeText: "Inbound Call",
      badgeIcon: ArrowUpRight,
      thumbnailUrl: "https://i.postimg.cc/8zZKB7YC/Voice-Agent-2.png",
      videoId: "_ilf6F600c8"
    }
  ];
  
  return (
    <section ref={ref} id="leistungen" className="py-16 md:py-20 bg-gray-50 scroll-mt-32 mt-4 md:mt-0">
      <div className="max-w-7xl mx-auto px-4">
        <GradientHeading
          title="Das machen wir für dich"
          level={2}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {/* Voice Agent Main Card */}
          <motion.div 
            className="relative overflow-hidden rounded-xl h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
            whileHover={prefersReducedMotion ? {} : { y: -5 }}
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00dfff]/40 to-[#A855F7]/40 blur-xl rounded-xl"></div>
            
            {/* Content container with glassmorphism */}
            <div className="relative bg-white/80 backdrop-blur-sm p-6 border border-white/50 shadow-lg rounded-xl h-full">
              {/* Decorative icon in background */}
              <div className="absolute -top-4 -right-4 opacity-[0.15] pointer-events-none">
                <Phone className="h-48 w-48" stroke-width={1} />
              </div>
              
              <div className="flex items-start gap-3 relative z-10">
                <div className="p-3 bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 rounded-xl shrink-0 shadow-sm">
                  <Headphones className="h-6 w-6 text-[#A855F7]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent">
                    KI Voice Agents
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    Unsere Voice Agents übernehmen automatisierte Telefongespräche – sowohl eingehend (Inbound) als auch ausgehend (Outbound).
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Chatbot Card */}
          <motion.div 
            className="relative overflow-hidden rounded-xl h-full"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: prefersReducedMotion ? 0.3 : 0.6, delay: 0.1 }}
            whileHover={prefersReducedMotion ? {} : { y: -5 }}
          >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#00dfff]/40 to-[#A855F7]/40 blur-xl rounded-xl"></div>
            
            {/* Content container with glassmorphism */}
            <div className="relative bg-white/80 backdrop-blur-sm p-6 border border-white/50 shadow-lg rounded-xl h-full">
              {/* Decorative icon in background */}
              <div className="absolute -top-4 -right-4 opacity-[0.15] pointer-events-none">
                <MessageCircle className="h-48 w-48" stroke-width={1} />
              </div>
              
              <div className="flex items-start gap-3 relative z-10">
                <div className="p-3 bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 rounded-xl shrink-0 shadow-sm">
                  <MessageSquare className="h-6 w-6 text-[#A855F7]" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent">
                    KI Chatbots
                  </h3>
                  <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                    Unsere KI-Chatbots beantworten Kundenanfragen rund um die Uhr – auf Webseiten oder im Messenger.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Videos Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              title={video.title}
              thumbnailUrl={video.thumbnailUrl}
              videoId={video.videoId}
              index={index}
              badge={{
                text: video.badgeText,
                icon: video.badgeIcon
              }}
            />
          ))}
        </div>
        
        {/* Enhanced Automation section with animation */}
        <motion.div 
          className="relative rounded-xl overflow-hidden max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ 
            duration: prefersReducedMotion ? 0.3 : 0.6,
            delay: prefersReducedMotion ? 0 : 0.4
          }}
          whileHover={prefersReducedMotion ? {} : { scale: 1.01, brightness: 1.03 }}
        >
          {/* Glassmorphism effect with glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10"></div>
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00dfff]/40 to-[#A855F7]/40 blur-xl"></div>
          
          {/* Content container with glassmorphism */}
          <div className="relative bg-white/80 backdrop-blur-sm p-6 md:p-8 border border-white/50 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
              {/* Left side: KI-Automatisierung text content */}
              <div className="md:col-span-2">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 rounded-xl shrink-0">
                    <Settings className="h-7 w-7 text-[#A855F7]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-3 bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent">
                      KI-Automatisierung im Hintergrund
                    </h3>
                    <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                      Wir verknüpfen deine Tools, automatisieren Prozesse und sorgen dafür, dass im Hintergrund alles läuft – ganz ohne manuellen Aufwand.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Right side: Animation process steps */}
              <div className="md:col-span-3 flex flex-col justify-center space-y-8 p-4 bg-white/50 rounded-xl backdrop-blur-sm border border-white/30">
                <h4 className="text-base md:text-lg font-semibold text-center text-gray-900 mb-2">
                  Automatisierter Prozess-Ablauf
                </h4>
                
                <div className="space-y-8 md:space-y-10 pl-4">
                  <ProcessStep 
                    icon={MessageSquare} 
                    text="Neue Anfrage empfangen" 
                    delay={0.1} 
                  />
                  <ProcessStep 
                    icon={Settings} 
                    text="Lead ins CRM eintragen" 
                    delay={0.3} 
                  />
                  <ProcessStep 
                    icon={Mail} 
                    text="Bestätigungsmail versenden" 
                    delay={0.5} 
                  />
                  <ProcessStep 
                    icon={CheckCircle} 
                    text="Automatisierung abgeschlossen!" 
                    delay={0.7}
                    isLast={true}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Importing necessary icons that weren't declared
import { Mail, CheckCircle } from 'lucide-react';