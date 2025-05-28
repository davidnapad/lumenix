import React, { useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { VideoCard } from './shared/VideoCard';

interface VideoDemoProps {
  title: string;
  description: string;
  thumbnail: string;
  videoId: string;
  badgeText?: string;
  badgeIcon?: React.ComponentType<{ className?: string }>;
}

export default function VideoDemo({ 
  title,
  description, 
  thumbnail,
  videoId,
  badgeText,
  badgeIcon 
}: VideoDemoProps) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '300px 0px',
  });

  const badge = badgeText ? {
    text: badgeText,
    icon: badgeIcon
  } : undefined;

  return (
    <section ref={ref} className="py-12 md:py-16 px-4 bg-white text-center content-visibility-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        className="max-w-3xl mx-auto"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">{title}</h2>
        <p className="text-sm md:text-base text-gray-600 mb-6 md:mb-8 max-w-3xl mx-auto">
          {description}
        </p>

        <div className="relative max-w-3xl mx-auto">
          <VideoCard
            title={title}
            thumbnailUrl={thumbnail}
            videoId={videoId}
            badge={badge}
          />
        </div>
      </motion.div>
    </section>
  );
}