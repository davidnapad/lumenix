import React, { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MessageSquare, FileText, Calendar, CheckCircle, Zap } from 'lucide-react';
import { ProcessStep } from './ProcessStep';

export const ProcessTimeline: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  
  // Track if the section is visible
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: false,
  });

  // Automatically progress through steps when in view
  useEffect(() => {
    if (!inView || prefersReducedMotion) return;
    
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev === 4 ? 0 : prev + 1));
    }, 2000);
    
    return () => clearInterval(interval);
  }, [inView, prefersReducedMotion]);
  
  // Reset to step 0 when not in view
  useEffect(() => {
    if (!inView) {
      setActiveStep(0);
    }
  }, [inView]);

  // Define the steps
  const steps = [
    {
      icon: MessageSquare,
      title: 'Beratungsgespräch',
      description: 'Wir analysieren deine Anforderungen und entwickeln eine maßgeschneiderte Lösung',
    },
    {
      icon: FileText,
      title: 'Konzeption',
      description: 'Wir erstellen ein detailliertes Konzept für deine KI-Lösung',
    },
    {
      icon: Zap,
      title: 'Entwicklung',
      description: 'Wir entwickeln und trainieren deine KI-Assistenten nach deinen Anforderungen',
    },
    {
      icon: Calendar,
      title: 'Integration',
      description: 'Wir implementieren die Lösung nahtlos in deine bestehenden Systeme',
    },
    {
      icon: CheckCircle,
      title: 'Optimierung',
      description: 'Kontinuierliche Verbesserung und Anpassung an deine Bedürfnisse',
    }
  ];

  return (
    <section id="ablauf" ref={ref} className="py-20 relative scroll-mt-32">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-white to-gray-50/50" />
      
      {/* Content Container */}
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Title */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-4">So läuft die Zusammenarbeit ab</h2>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Von der ersten Idee bis zur fertigen KI-Lösung – so einfach ist der Weg mit Lumenix.
          </p>
        </motion.div>
        
        {/* Process Timeline Container */}
        <div className="relative">
          {/* Border Glow Effect */}
          <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-cyan-400/10 to-purple-500/10 blur-2xl" />
          
          {/* Main Container */}
          <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/60 shadow-lg p-8">
            {/* Desktop Timeline */}
            <div className="hidden md:grid grid-cols-5 gap-4">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="group" 
                  onMouseEnter={() => setActiveStep(index)}
                >
                  <ProcessStep
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    stepNumber={index + 1}
                    isActive={index <= activeStep}
                    index={index}
                    totalSteps={steps.length}
                  />
                </div>
              ))}
            </div>
            
            {/* Mobile Timeline */}
            <div className="md:hidden space-y-12">
              {steps.map((step, index) => (
                <div 
                  key={index}
                  className="group"
                >
                  <ProcessStep
                    title={step.title}
                    description={step.description}
                    icon={step.icon}
                    stepNumber={index + 1}
                    isActive={index <= activeStep}
                    index={index}
                    totalSteps={steps.length}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};