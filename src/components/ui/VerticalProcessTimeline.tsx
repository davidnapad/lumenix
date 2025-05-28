import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquare, FileText, Zap, Calendar, CheckCircle } from 'lucide-react';
import { VerticalProcessStep } from './VerticalProcessStep';

export const VerticalProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  
  // Track if the section is visible
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  // Automatically progress through steps when in view
  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    
    // Auto-advance steps with a delay
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= steps.length - 1) return 0;
        return prev + 1;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [inView, prefersReducedMotion]);
  
  // Reset to step 0 when not in view
  useEffect(() => {
    if (!inView) {
      setActiveStep(0);
    }
  }, [inView]);

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

  return (
    <section id="ablauf" ref={ref} className="py-20 relative scroll-mt-32">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white" />
      
      {/* Content Container */}
      <div className="max-w-3xl mx-auto px-4">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">So läuft die Zusammenarbeit ab</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Von der ersten Idee bis zur fertigen KI-Lösung – so einfach ist der Weg mit Lumenix.
          </p>
        </motion.div>
        
        {/* Process Timeline Container */}
        <div className="relative">
          {/* Border Glow Effect */}
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-cyan-400/10 to-purple-500/10 blur-2xl" />
          
          {/* Main Container */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/60 shadow-lg p-8">
            {/* Timeline Steps */}
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="group" 
                  onMouseEnter={() => setActiveStep(index)}
                >
                  <VerticalProcessStep
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    stepNumber={index + 1}
                    isActive={index <= activeStep}
                    delay={index * 0.15}
                    isLast={index === steps.length - 1}
                  />
                </div>
              ))}
            </div>
            
            {/* Mobile Navigation Indicators */}
            <div className="mt-8 flex justify-center gap-2 md:hidden">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveStep(index)}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    index <= activeStep 
                      ? 'bg-gradient-to-r from-cyan-400 to-purple-500 w-4' 
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to step ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};