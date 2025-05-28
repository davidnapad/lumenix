import React, { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function VoiceAgentDemo() {
  const [showVideo, setShowVideo] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '300px 0px',
  });

  // Optimized thumbnail click handler
  const handleThumbnailClick = useCallback(() => {
    setShowVideo(true);
  }, []);

  return (
    <section ref={ref} className="py-16 px-4 bg-white text-center content-visibility-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        className="max-w-7xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-4">Voice Agent Demo</h2>
        <p className="text-gray-600 mb-8 max-w-3xl mx-auto">
          In dieser Demo hörst du, wie unser KI Voice Agent Anfragen automatisch entgegennimmt – zum Beispiel für die Wohnungssuche.
        </p>

        <div className="relative max-w-3xl mx-auto">
          {!showVideo ? (
            // Optimized thumbnail with play button
            <div 
              className="relative cursor-pointer rounded-xl overflow-hidden shadow-lg"
              onClick={handleThumbnailClick}
              role="button"
              aria-label="Play voice agent demo"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  handleThumbnailClick();
                }
              }}
            >
              <img 
                src="https://i.postimg.cc/brr4kQyp/Voice-Agent.png" 
                alt="Voice Agent Demo" 
                className="w-full h-auto object-cover rounded-xl"
                loading="lazy"
                width="640"
                height="360"
                decoding="async"
                fetchpriority="low"
              />
              
              {/* Label overlay - Only shown on thumbnail */}
              <div className="absolute bottom-2 left-2 z-10">
                <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-white/70 backdrop-blur-sm text-gray-800 border border-white/50 shadow-sm">
                  Outbound Call Demo
                </span>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-xl">
                <div className="w-16 h-16 flex items-center justify-center text-white bg-black bg-opacity-50 rounded-full">
                  <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>
            </div>
          ) : (
            // Optimized YouTube iframe for mobile
            <div className="relative z-0 aspect-video">
              <iframe
                src="https://www.youtube.com/embed/tV7xkIRFLc8?rel=0&modestbranding=1&controls=1&autoplay=1&playsinline=1"
                title="KI Voice Agent Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                allowFullScreen
                className="rounded-xl shadow-md w-full h-full absolute inset-0"
                loading="lazy"
                style={{
                  aspectRatio: '16/9',
                  transform: 'translateZ(0)',
                  backfaceVisibility: 'hidden',
                  willChange: 'transform',
                  border: 'none'
                }}
              ></iframe>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}