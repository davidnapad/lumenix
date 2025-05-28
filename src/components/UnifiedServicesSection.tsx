import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone, MessageSquare, Settings, Play, ArrowRight } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
import { GradientIcon } from './ui/GradientIcon';

interface ServiceCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
  videos?: Array<{
    label: string;
    thumbnailUrl: string;
    videoId: string;
  }>;
  hasAnimation?: boolean;
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  videos = [], 
  hasAnimation = false, 
  index 
}) => {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null);
  const prefersReducedMotion = useReducedMotion();
  
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  return (
    <motion.div 
      ref={ref}
      className="flex flex-col h-full bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ 
        duration: prefersReducedMotion ? 0.3 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.1
      }}
    >
      {/* Header with Icon and Title */}
      <div className="p-6 border-b border-gray-100 flex items-center space-x-4">
        <div className="p-3 bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10 rounded-xl">
          <GradientIcon icon={Icon} className="h-6 w-6" />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      
      {/* Description */}
      <div className="p-6 pb-4">
        <p className="text-gray-700">{description}</p>
      </div>
      
      {/* Videos Section */}
      {videos.length > 0 && (
        <div className="px-6 pb-6 space-y-4 flex-1">
          {videos.map((video, idx) => (
            <div key={idx} className="space-y-2">
              {/* Video Label */}
              <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10 text-gray-800">
                {video.label}
              </div>
              
              {/* Video Player */}
              <div className="relative rounded-xl overflow-hidden aspect-video">
                {/* Border Glow Effect */}
                <div className="absolute -inset-[1px] bg-gradient-to-r from-[#00dfff] to-[#A855F7] rounded-xl z-0"></div>
                
                {activeVideoIndex !== idx ? (
                  // Thumbnail with play button
                  <div 
                    className="relative bg-white p-[1px] rounded-xl overflow-hidden cursor-pointer group"
                    onClick={() => setActiveVideoIndex(idx)}
                  >
                    <img 
                      src={video.thumbnailUrl} 
                      alt={video.label}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    
                    {/* Label overlay - Only visible on thumbnail */}
                    <div className="absolute bottom-2 left-2 z-10">
                      <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-white/70 backdrop-blur-sm text-gray-800 border border-white/50 shadow-sm">
                        {video.label}
                      </span>
                    </div>
                    
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
                      <div className="w-12 h-12 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full border border-white/30 group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                ) : (
                  // YouTube iframe (only loads after clicking the thumbnail)
                  <div className="relative bg-white p-[1px] rounded-xl overflow-hidden w-full h-full">
                    <iframe
                      width="100%" 
                      height="100%"
                      src={`https://www.youtube.com/embed/${video.videoId}?rel=0&modestbranding=1&controls=1&autoplay=1`}
                      title={video.label}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-xl w-full aspect-video"
                      loading="lazy"
                    ></iframe>
                    
                    {/* No label when video is playing */}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Automation Animation (for the third card) */}
      {hasAnimation && (
        <div className="px-6 pb-6 flex-1 flex flex-col items-center justify-center">
          {/* Animation Container */}
          <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-gradient-to-r from-[#00dfff]/5 to-[#A855F7]/5 border border-gray-200">
            {/* Glow Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 blur-xl rounded-xl"></div>
            
            {/* Gear Animation */}
            <div className="relative flex items-center justify-center h-full w-full">
              <motion.div
                className="absolute w-16 h-16 border-4 border-[#00dfff]/30 rounded-full flex items-center justify-center"
                animate={{ rotate: 360 }}
                transition={{ 
                  duration: 10, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatType: "loop"
                }}
              >
                <Settings className="w-8 h-8 text-[#00dfff]" />
              </motion.div>
              
              <motion.div
                className="absolute w-28 h-28 border-4 border-[#A855F7]/30 rounded-full flex items-center justify-center"
                animate={{ rotate: -360 }}
                transition={{ 
                  duration: 15, 
                  repeat: Infinity, 
                  ease: "linear",
                  repeatType: "loop"
                }}
              >
                <Settings className="w-10 h-10 text-[#A855F7]" />
              </motion.div>
              
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-center text-sm font-medium border border-white/50 shadow-md">
                Live-Demo auf Anfrage
              </div>
            </div>
          </div>
          
          {/* Demo Request Button */}
          <motion.button
            className="mt-4 flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10 text-gray-800 font-medium hover:from-[#00dfff]/20 hover:to-[#A855F7]/20 transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Demo anfragen</span>
            <ArrowRight className="ml-1 w-4 h-4" />
          </motion.button>
        </div>
      )}
    </motion.div>
  );
};

export default function UnifiedServicesSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const prefersReducedMotion = useReducedMotion();
  
  // Services data
  const services = [
    {
      icon: Phone,
      title: "KI Voice Agents",
      description: "Automated phone calls for qualification, appointment booking & support.",
      videos: [
        {
          label: "Outbound call example",
          thumbnailUrl: "https://i.postimg.cc/HxvFY7Fj/Voice-Agent.png",
          videoId: "tV7xkIRFLc8"
        },
        {
          label: "Inbound Zahnarzt call",
          thumbnailUrl: "https://i.postimg.cc/8zZKB7YC/Voice-Agent-2.png",
          videoId: "_ilf6F600c8"
        }
      ]
    },
    {
      icon: MessageSquare,
      title: "KI Chatbots",
      description: "24/7 support on websites & messengers – qualify leads, answer questions.",
      videos: [
        {
          label: "E-Commerce bot",
          thumbnailUrl: "https://i.postimg.cc/bwwLJzvf/Chatbot.png",
          videoId: "ha3DVlQRUdY"
        }
      ]
    },
    {
      icon: Settings,
      title: "KI-Automatisierungen",
      description: "Link CRMs, automate workflows & reduce manual tasks.",
      hasAnimation: true
    }
  ];
  
  return (
    <section ref={ref} id="leistungen" className="py-20 bg-gray-50 scroll-mt-32">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">🔧 Das machen wir für dich</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Entdecke unsere KI-Lösungen in Aktion und sieh, wie sie in der Praxis funktionieren.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={index}
              icon={service.icon}
              title={service.title}
              description={service.description}
              videos={service.videos}
              hasAnimation={service.hasAnimation}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}