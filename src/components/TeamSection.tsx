import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { TeamMember } from './ui/TeamMember';
import { BotMascot } from './ui/BotMascot';
import { useInView } from 'react-intersection-observer';
import { Clock, Award, Cpu, BarChart } from 'lucide-react';

export default function TeamSection() {
  const [botDirection, setBotDirection] = useState<'left' | 'right' | null>(null);
  const { ref: sectionRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '300px 0px', // Load earlier when scrolling
  });
  const prefersReducedMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    // Debounce resize event for better performance
    let resizeTimer: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkMobile, 150);
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    
    return () => {
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Auto-alternate bot direction when not being hovered
  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    if (botDirection !== null) return;
    
    const interval = setInterval(() => {
      setBotDirection(prev => prev === 'left' ? 'right' : 'left');
      setTimeout(() => setBotDirection(null), 1000);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [inView, prefersReducedMotion, botDirection]);

  // Optimized video loading handler
  const handleVideoShow = useCallback(() => {
    setShowVideo(true);
  }, []);

  // Highlight boxes data with icons - Memoized to prevent unnecessary recreations
  const highlights = useMemo(() => [
    {
      icon: Clock,
      text: "8+ Jahre gemeinsame Erfahrung"
    },
    {
      icon: Cpu,
      text: "KI- & Automatisierungs-Expertise"
    },
    {
      icon: Award,
      text: "Technische & Beratungskompetenz"
    },
    {
      icon: BarChart,
      text: "Verständnis für Geschäftsprozesse"
    }
  ], []);

  return (
    <section 
      id="ueber-uns" 
      ref={sectionRef}
      className="py-16 relative overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-50 scroll-mt-20 content-visibility-auto"
    >
      {/* Unified background with floating elements */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute -top-24 -right-24 w-48 h-48 rounded-full bg-gradient-to-r from-[#00dfff]/5 to-[#A855F7]/5 blur-3xl"
          animate={prefersReducedMotion ? {} : { y: [0, -30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div 
          className="absolute -bottom-32 -left-32 w-64 h-64 rounded-full bg-gradient-to-r from-[#A855F7]/5 to-[#00dfff]/5 blur-3xl"
          animate={prefersReducedMotion ? {} : { y: [0, 30, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Add more subtle floating elements */}
        <motion.div
          className="absolute top-1/3 right-[10%] w-16 h-16 rounded-full bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10 blur-xl hidden md:block"
          animate={prefersReducedMotion ? {} : { y: [0, -15, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        
        <motion.div
          className="absolute bottom-1/4 left-[15%] w-20 h-20 rounded-full bg-gradient-to-r from-[#A855F7]/10 to-[#00dfff]/10 blur-xl hidden md:block"
          animate={prefersReducedMotion ? {} : { y: [0, 20, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        <motion.div 
          className="text-center mb-6 md:mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion || isMobile ? 0.3 : 0.5 }}
          style={{ willChange: 'transform, opacity' }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Über uns
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Experten für KI-Integration und Automatisierung – wir machen dein Business fit für die Zukunft.
          </p>
        </motion.div>

        {/* Unified content card with glassmorphism effect */}
        <motion.div 
          className="relative bg-white/80 backdrop-blur-sm rounded-3xl border border-white/60 shadow-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion || isMobile ? 0.3 : 0.5, delay: 0.1 }}
          style={{ willChange: 'transform, opacity' }}
        >
          {/* Background glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 blur-xl opacity-50 -z-10" />
          
          {/* Main Content */}
          <div className="relative z-10 p-5 md:p-8">
            {/* Team members grid */}
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <motion.div 
                className="w-full"
                onMouseEnter={() => setBotDirection('left')} 
                onMouseLeave={() => setBotDirection(null)}
              >
                <TeamMember
                  name="David"
                  role="Kundenbetreuung & KI-Beratung"
                  mobileRole="Planung & Entwicklung"
                  image="https://i.postimg.cc/4xVYmn8Y/2.png"
                  className="scale-[0.85] md:scale-100 origin-top"
                />
              </motion.div>
              
              <div className="flex items-center justify-center">
                <BotMascot direction={botDirection} />
              </div>
              
              <motion.div 
                className="w-full"
                onMouseEnter={() => setBotDirection('right')} 
                onMouseLeave={() => setBotDirection(null)}
              >
                <TeamMember
                  name="Daniel"
                  role="Systemarchitektur & Automatisierung"
                  mobileRole="Entwicklung"
                  image="https://i.postimg.cc/Qdt6DGSY/1.png"
                  className="scale-[0.85] md:scale-100 origin-top"
                />
              </motion.div>
            </div>
            
            {/* Enhanced highlight badges in a grid - UPDATED FOR MOBILE */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mt-6 md:mt-8">
              {highlights.map((highlight, index) => {
                const Icon = highlight.icon;
                return (
                  <motion.div 
                    key={index}
                    className="relative overflow-hidden rounded-xl border border-gray-100/70 shadow-md hover:shadow-lg transition-shadow group"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      delay: prefersReducedMotion ? 0 : index * 0.1,
                      duration: prefersReducedMotion ? 0.2 : 0.4
                    }}
                    whileHover={prefersReducedMotion ? {} : { y: -3 }}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    {/* Gradient background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10 opacity-70 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Subtle animated shine effect */}
                    {!prefersReducedMotion && (
                      <motion.div 
                        className="absolute inset-0 bg-white/20 skew-x-12 -translate-x-full"
                        animate={{ translateX: ['100%', '-100%'] }}
                        transition={{ 
                          repeat: Infinity, 
                          repeatType: "mirror", 
                          duration: 5,
                          ease: "easeInOut"
                        }}
                        style={{
                          backgroundImage: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                          willChange: 'transform'
                        }}
                      />
                    )}
                    
                    {/* Content - Vertical layout for mobile, horizontal for desktop */}
                    <div className={`
                      flex md:items-center gap-3 p-4 relative z-10
                      ${isMobile ? 'flex-col items-center text-center' : 'flex-row items-start text-left'}
                    `}>
                      {/* Icon container with subtle gradient */}
                      <div className={`
                        shrink-0 p-2 rounded-lg bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20
                        ${isMobile ? 'mb-2' : ''}
                      `}>
                        <Icon className="w-5 h-5 text-[#00dfff]" />
                      </div>
                      
                      <p className="text-xs md:text-sm text-gray-700 font-medium">{highlight.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
            
            {/* Team Description */}
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              style={{ willChange: 'transform, opacity' }}
            >
              <p className="text-gray-700 text-sm md:text-base">
                <strong>Wir sind David & Daniel</strong> – dein KI-Duo für smarte Automatisierungslösungen.<br className="hidden md:inline" />
                Beratung & Technik aus einer Hand – modern, pragmatisch, effektiv.
              </p>
            </motion.div>
            
            {/* Video Section - Optimized for mobile */}
            <motion.div 
              className="mt-6 md:mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              style={{ willChange: 'transform, opacity' }}
            >
              {!showVideo ? (
                <div 
                  className="relative cursor-pointer rounded-xl overflow-hidden shadow-lg mx-auto max-w-3xl"
                  onClick={handleVideoShow}
                  role="button"
                  aria-label="Play team introduction video"
                  tabIndex={0}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleVideoShow();
                    }
                  }}
                >
                  {/* Browser-style frame */}
                  <div className="bg-gray-100 px-4 py-2 flex items-center border-b border-gray-200">
                    {/* Browser dots */}
                    <div className="flex space-x-2">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                    </div>
                    {/* URL bar */}
                    <div className="ml-3 flex-1 bg-white/80 px-3 py-1 rounded text-xs text-gray-500 truncate">
                      lumenixmedia.de/ueber-uns
                    </div>
                  </div>
                  
                  {/* Thumbnail image - Optimized for quick loading */}
                  <div className="relative aspect-video">
                    <img 
                      src="https://i.postimg.cc/pyMjy8tL/Vorstellung.png" 
                      alt="Lumenix Vorstellung" 
                      className="w-full h-full object-cover absolute inset-0"
                      loading="lazy"
                      width="640"
                      height="360"
                      decoding="async"
                      fetchpriority="low"
                    />
                    
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                      <div className="w-14 h-14 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full border border-white/30">
                        <svg className="w-8 h-8 text-white fill-white" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                    
                    {/* Duration badge */}
                    <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-0.5 rounded">
                      1:30
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mx-auto max-w-3xl aspect-video relative">
                  <iframe
                    src="https://www.youtube.com/embed/EaxNBqC3NKk?rel=0&modestbranding=1&controls=1&autoplay=1&playsinline=1&loading=lazy"
                    title="Lumenix Media Vorstellung"
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
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}