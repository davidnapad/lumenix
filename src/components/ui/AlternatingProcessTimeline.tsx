import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquare, FileText, Zap, Calendar, CheckCircle } from 'lucide-react';
import { AlternatingProcessStep } from './AlternatingProcessStep';

export const AlternatingProcessTimeline: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  
  // Track if the section is visible - with larger threshold to trigger earlier
  const { ref: sectionRef, inView: sectionInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
    rootMargin: '300px 0px', // Start observing earlier
  });

  // Add state to track if heading has ever been in view
  const [headingHasBeenSeen, setHeadingHasBeenSeen] = useState(false);
  const { ref: headingRef, inView: headingInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // State for mobile detection
  const [isMobile, setIsMobile] = useState(false);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Permanently mark heading as seen once it's viewed
  useEffect(() => {
    if (headingInView) {
      setHeadingHasBeenSeen(true);
    }
  }, [headingInView]);

  // Setup scroll-based animation for the timeline line
  // Changed offset to trigger animation earlier and finish earlier
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 70%", "end 40%"] // Changed from ["start start", "end end"]
  });

  // Individual step visibility tracking
  const [stepsInView, setStepsInView] = useState<boolean[]>(
    Array(5).fill(false)
  );

  // Define the process steps
  const steps = [
    {
      icon: MessageSquare,
      title: 'Beratungsgespräch',
      description: 'Wir analysieren deine Anforderungen und entwickeln eine maßgeschneiderte Lösung für dein Unternehmen.',
    },
    {
      icon: FileText,
      title: 'Konzeption',
      description: 'Wir erstellen ein detailliertes Konzept für deine KI-Lösung basierend auf deinen individuellen Anforderungen.',
    },
    {
      icon: Zap,
      title: 'Entwicklung',
      description: 'Wir entwickeln und trainieren deine KI-Assistenten nach deinen spezifischen Anforderungen und Wünschen.',
    },
    {
      icon: Calendar,
      title: 'Integration',
      description: 'Wir implementieren die Lösung nahtlos in deine bestehenden Systeme und Workflows.',
    },
    {
      icon: CheckCircle,
      title: 'Optimierung',
      description: 'Kontinuierliche Verbesserung und Anpassung deiner KI-Lösung an deine sich ändernden Bedürfnisse.',
    }
  ];

  // Update line length based on scroll
  useEffect(() => {
    if (!lineRef.current || prefersReducedMotion) return;

    const updateLineLength = () => {
      const scrollProgress = scrollYProgress.get();
      if (lineRef.current) {
        lineRef.current.style.height = `${Math.max(0, Math.min(100, scrollProgress * 120))}%`;
      }
    };

    const unsubscribe = scrollYProgress.onChange(updateLineLength);
    
    return () => {
      unsubscribe();
    };
  }, [scrollYProgress, prefersReducedMotion]);

  // Track steps in view for mobile and responsive behavior
  const stepRefs = steps.map((_, index) => {
    const [ref, inView] = useInView({
      threshold: 0.5,
      triggerOnce: false,
    });

    // Update the step visibility state
    useEffect(() => {
      setStepsInView(prev => {
        const newState = [...prev];
        newState[index] = inView;
        return newState;
      });
    }, [inView]);

    return { ref, inView };
  });

  return (
    <section id="ablauf" ref={sectionRef} className="py-16 relative scroll-mt-32 content-visibility-auto">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50" />
      
      {/* Fixed Heading Box - Always visible once in view */}
      <div className="max-w-6xl mx-auto px-4 mb-10">
        <div 
          ref={headingRef}
          className="relative"
        >
          {/* Fixed heading box with soft violet background */}
          <motion.div
            className="text-center bg-[#A855F7]/10 py-4 px-8 rounded-2xl shadow-lg border border-[#A855F7]/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              boxShadow: '0 0 20px rgba(168, 85, 247, 0.2), 0 0 40px rgba(0, 223, 255, 0.1)',
              willChange: 'transform'
            }}
          >
            {/* Decorative glow elements */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 blur-xl rounded-2xl -z-10"></div>
            <div className="absolute -inset-1 bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10 blur-2xl rounded-2xl -z-20"></div>

            {/* Main heading with solid black text */}
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-black">
              Schritt für Schritt zur perfekten Lösung
            </h2>
            
            {/* Optional subheading with muted gray color */}
            <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto">
              Unser bewährter Prozess – transparent, klar und effizient
            </p>
          </motion.div>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="max-w-6xl mx-auto px-4">        
        {/* Main Timeline - More compact layout */}
        <div className="relative" ref={timelineRef}>
          {/* Central vertical timeline line with unified animation - IMPROVED VISIBILITY */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[3px] h-[calc(100%-2rem)] bg-gray-100/70 z-20 hidden md:block">
            <motion.div 
              ref={lineRef}
              className="absolute top-0 left-0 w-full origin-top bg-gradient-to-b from-cyan-400 via-purple-500 to-purple-500 shadow-[0_0_8px_rgba(79,209,197,0.5)]"
              style={{ 
                height: prefersReducedMotion ? '100%' : '0%',
                transition: prefersReducedMotion ? 'height 0.5s ease-out' : 'none',
                willChange: 'height'
              }}
            />
            
            {/* Timeline End Marker */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-30">
              {/* Outer glow ring */}
              <motion.div 
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-500/30 blur-lg"
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              
              {/* Main glowing dot */}
              <motion.div
                className="relative h-5 w-5 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 shadow-[0_0_10px_rgba(79,209,197,0.7),0_0_15px_rgba(168,85,247,0.5)]"
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.5, 
                  delay: 0.2,
                  type: "spring",
                  stiffness: 300,
                  damping: 15
                }}
                animate={!prefersReducedMotion ? {
                  boxShadow: [
                    '0 0 10px rgba(79,209,197,0.7), 0 0 15px rgba(168,85,247,0.5)',
                    '0 0 15px rgba(79,209,197,0.9), 0 0 25px rgba(168,85,247,0.7)',
                    '0 0 10px rgba(79,209,197,0.7), 0 0 15px rgba(168,85,247,0.5)'
                  ]
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: "mirror"
                }}
              />
              
              {/* Inner bright core */}
              <motion.div
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full bg-white z-10"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.4 }}
              />
              
              {/* Completion text label */}
              <motion.div
                className="absolute left-1/2 transform -translate-x-1/2 mt-5 whitespace-nowrap"
                initial={{ opacity: 0, y: -10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-gradient-to-r from-cyan-400/10 to-purple-500/10 text-gray-700">
                  Prozess abgeschlossen
                </span>
              </motion.div>
            </div>
          </div>
          
          {/* Mobile Timeline Line - LEFT ALIGNED, NOT CENTERED */}
          <div className="absolute top-0 left-6 w-[3px] h-[calc(100%-1rem)] bg-gray-100/70 z-20 md:hidden">
            <motion.div 
              className="absolute top-0 left-0 w-full origin-top bg-gradient-to-b from-cyan-400 via-purple-500 to-purple-500 shadow-[0_0_8px_rgba(79,209,197,0.5)]"
              style={{ 
                height: prefersReducedMotion ? '100%' : '0%',
                transition: prefersReducedMotion ? 'height 0.5s ease-out' : 'none',
                willChange: 'height'
              }}
              animate={{ height: "100%" }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
            
            {/* Mobile Timeline End Marker */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-30">
              <motion.div 
                className="absolute -inset-2 rounded-full bg-gradient-to-r from-cyan-400/30 to-purple-500/30 blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              />
              <motion.div
                className="relative h-4 w-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
          
          {/* Desktop Steps Container */}
          <div className="relative hidden md:block">
            {steps.map((step, index) => (
              <div 
                key={index}
                ref={stepRefs[index].ref}
                className="group"
              >
                <AlternatingProcessStep
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  stepNumber={index + 1}
                  isActive={stepsInView[index] || stepRefs[index].inView}
                  side={index % 2 === 0 ? 'left' : 'right'}
                  isLast={index === steps.length - 1}
                />
              </div>
            ))}
          </div>
          
          {/* Mobile Steps Container - COMPLETELY DIFFERENT LAYOUT - FIXED NUMBER DISPLAY */}
          <div className="relative md:hidden space-y-8 pl-12">
            {steps.map((step, index) => (
              <div 
                key={index}
                ref={stepRefs[index].ref}
                className="group"
              >
                <div className="relative">
                  {/* Circle icon on the left */}
                  <div className="absolute top-0 left-[-30px] z-30">
                    <motion.div 
                      className={`
                        w-10 h-10 rounded-full flex items-center justify-center 
                        ${stepsInView[index] ? 'bg-gradient-to-r from-cyan-400 to-purple-500 text-white' : 'bg-white text-gray-400 border border-gray-200'}
                        shadow-sm
                      `}
                      initial={{ scale: 0.8, opacity: 0.5 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: false, amount: 0.8 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      style={{ willChange: 'transform, opacity' }}
                    >
                      {/* Glow effect for active state */}
                      {stepsInView[index] && (
                        <div className="absolute inset-0 rounded-full blur-sm bg-gradient-to-r from-cyan-400/40 to-purple-500/40 -z-10" />
                      )}
                      
                      <step.icon className="h-5 w-5" />
                      
                      {/* Step number badge - ENSURING NUMBER IS VISIBLE */}
                      <div className="absolute -top-1 -right-1 bg-white text-xs font-bold h-5 w-5 rounded-full flex items-center justify-center border border-gray-100 shadow-sm">
                        {index + 1}
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Content card - Now offset to the right */}
                  <motion.div 
                    className="bg-white p-4 rounded-xl shadow-md border border-gray-100 w-full"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    style={{ willChange: 'transform, opacity' }}
                  >
                    <h3 className={`text-base font-semibold mb-2 ${stepsInView[index] ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500' : 'text-gray-900'}`}>
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-600">
                      {step.description}
                    </p>
                  </motion.div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Floating decorative elements */}
          <motion.div
            className="absolute -right-8 top-1/4 w-24 h-24 rounded-full bg-gradient-to-r from-cyan-400/10 to-purple-500/10 blur-xl opacity-70 hidden md:block"
            animate={prefersReducedMotion ? {} : { y: [0, -30, 0] }}
            transition={{ 
              duration: 15, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <motion.div
            className="absolute -left-12 bottom-1/4 w-32 h-32 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-400/10 blur-xl opacity-60 hidden md:block animate-float"
          />
        </div>
      </div>
    </section>
  );
};