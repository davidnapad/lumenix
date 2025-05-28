import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

interface VideoCardProps {
  title: string;
  description: string;
  thumbnailUrl: string;
  videoId: string;
  index: number;
}

const VideoCard = ({ title, description, thumbnailUrl, videoId, index }: VideoCardProps) => {
  const [showVideo, setShowVideo] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div 
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: prefersReducedMotion ? 0.3 : 0.6,
        delay: prefersReducedMotion ? 0 : index * 0.1
      }}
    >
      {/* Video Container with Border Effect */}
      <div className="relative rounded-xl overflow-hidden shadow-lg mb-4 aspect-video">
        {/* Gradient Border */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#00dfff] to-[#A855F7] rounded-xl z-0"></div>
        
        {!showVideo ? (
          // Thumbnail with play button
          <div 
            className="relative bg-white p-[1px] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setShowVideo(true)}
          >
            <img 
              src={thumbnailUrl} 
              alt={title}
              className="w-full h-full object-cover rounded-xl group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
            
            {/* Video Label - Only visible on thumbnail */}
            <div className="absolute bottom-2 left-2 z-10">
              <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-white/70 backdrop-blur-sm text-gray-800 border border-white/50 shadow-sm">
                {index === 0 ? "Outbound Calls" : index === 1 ? "Web Chatbot" : "Inbound Calls"}
              </span>
            </div>
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
              <div className="w-16 h-16 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full border border-white/30 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-white fill-white" />
              </div>
            </div>
          </div>
        ) : (
          // YouTube iframe (only loads after clicking the thumbnail)
          <div className="relative bg-white p-[1px] rounded-xl overflow-hidden w-full h-full">
            <iframe
              width="100%" 
              height="100%"
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&autoplay=1`}
              title={title}
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

      {/* Title and Description */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-xl font-bold mb-2 text-gray-900 bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent">
          {title}
        </h3>
        <p className="text-gray-700 text-sm md:text-base">
          {description}
        </p>
      </div>
    </motion.div>
  );
};

export default function VideoShowcaseSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '100px 0px',
  });
  
  const prefersReducedMotion = useReducedMotion();
  
  const videos = [
    {
      title: "Outbound-Anruf zur Immobilien-Qualifizierung",
      description: "Ein KI-Agent ruft automatisch potenzielle Interessenten an, die sich vor einigen Wochen bei einem Immobilienbüro gemeldet haben – mit dem Ziel, deren Suchprofil zu erfassen und Leads direkt vorzuqualifizieren.",
      thumbnailUrl: "https://i.postimg.cc/HxvFY7Fj/Voice-Agent.png",
      videoId: "tV7xkIRFLc8"
    },
    {
      title: "Support-Chatbot im E-Commerce",
      description: "Der KI-Chatbot beantwortet automatisiert Kundenanfragen – 24/7. In diesem Beispiel geht es um eine Bestellung von Laufschuhen. Der Bot liefert sofortige Antworten, reduziert den Supportaufwand drastisch und steigert die Conversion.",
      thumbnailUrl: "https://i.postimg.cc/bwwLJzvf/Chatbot.png",
      videoId: "ha3DVlQRUdY"
    },
    {
      title: "Beispiel für Empfangsmitarbeiter",
      description: "Ein KI-Agent nimmt eingehende Anrufe in einer Zahnarztpraxis entgegen, fragt automatisiert nach dem Anliegen und bucht passende Termine – ganz ohne menschliches Eingreifen.",
      thumbnailUrl: "https://i.postimg.cc/8zZKB7YC/Voice-Agent-2.png",
      videoId: "_ilf6F600c8"
    }
  ];
  
  return (
    <section ref={ref} className="py-20 bg-white content-visibility-auto">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-[#A855F7]">
            KI-Agenten in Aktion
          </h2>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <VideoCard
              key={index}
              title={video.title}
              description={video.description}
              thumbnailUrl={video.thumbnailUrl}
              videoId={video.videoId}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}