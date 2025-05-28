import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Play } from 'lucide-react';

interface VideoCardProps {
  title: string;
  description?: string;
  thumbnailUrl: string;
  videoId: string;
  index?: number;
  badge?: {
    text: string;
    icon?: React.ComponentType<{ className?: string }>;
  };
}

export function VideoCard({ 
  title, 
  description, 
  thumbnailUrl, 
  videoId, 
  index = 0,
  badge
}: VideoCardProps) {
  const [showVideo, setShowVideo] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  
  // Handle video loading
  const handleVideoLoad = () => {
    // Set a small timeout to ensure the DOM has updated
    setTimeout(() => {
      // Add focus to iframe for better mobile interaction
      const iframe = document.querySelector(`iframe[data-video-id="${videoId}"]`);
      if (iframe) {
        iframe.setAttribute('tabindex', '0');
      }
    }, 100);
  };
  
  return (
    <motion.div 
      className="flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: prefersReducedMotion ? 0.3 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1
      }}
    >
      {/* Video Container with Border Effect */}
      <div className="relative rounded-xl overflow-hidden shadow-lg mb-3 aspect-video">
        {/* Gradient Border */}
        <div className="absolute -inset-[1px] bg-gradient-to-r from-[#00dfff] to-[#A855F7] rounded-xl z-0"></div>
        
        {!showVideo ? (
          // Thumbnail with play button
          <div 
            className="relative bg-white p-[1px] rounded-xl overflow-hidden cursor-pointer group"
            onClick={() => setShowVideo(true)}
            role="button"
            aria-label={`Play video: ${title}`}
            tabIndex={0}
            onKeyPress={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setShowVideo(true);
              }
            }}
          >
            {/* Preloaded image for faster display */}
            <img 
              src={thumbnailUrl} 
              alt={title}
              className="w-full h-full object-cover rounded-xl group-hover:scale-[1.02] transition-transform duration-300"
              loading="lazy"
              width="640"
              height="360"
              decoding="async"
              fetchpriority="low"
            />
            
            {/* Badge - Only shown on thumbnail */}
            {badge && (
              <div className="absolute bottom-2 left-2 z-10">
                <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-white/70 backdrop-blur-sm text-gray-800 border border-white/50 shadow-sm">
                  {badge.icon && <badge.icon className="w-3.5 h-3.5 mr-1.5" />}
                  {badge.text}
                </span>
              </div>
            )}
            
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/40 transition-colors">
              <div className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full border border-white/30 group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
              </div>
            </div>
          </div>
        ) : (
          // YouTube iframe (only loads after clicking the thumbnail)
          <div className="relative bg-white p-[1px] rounded-xl overflow-hidden w-full h-full">
            <div className="aspect-video w-full h-full relative">
              <iframe
                width="100%" 
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&controls=1&autoplay=1&playsinline=1`}
                title={title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="rounded-xl w-full h-full absolute inset-0"
                loading="lazy"
                onLoad={handleVideoLoad}
                data-video-id={videoId}
                style={{
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform'
                }}
              ></iframe>
            </div>
          </div>
        )}
      </div>

      {/* Video Title and Description */}
      <div className="flex-1 flex flex-col">
        <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-900 mb-1 break-words">
          {title}
        </h3>
        {description && (
          <p className="text-xs md:text-sm text-gray-700 break-words whitespace-normal">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );
}