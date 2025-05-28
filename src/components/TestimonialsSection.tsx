import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Star } from 'lucide-react';

interface TestimonialProps {
  stars: number;
  feedback: string;
  name: string;
  index: number;
}

const testimonials = [
  {
    stars: 5,
    feedback: "Dank des Voice Agents verpassen wir keinen Kundenanruf mehr. Es ist wie ein zusätzlicher Mitarbeiter.",
    name: "Max M., Geschäftsführer, Pilates Studio Hamburg",
  },
  {
    stars: 5,
    feedback: "Unser Support-Aufwand wurde halbiert. Die KI beantwortet FAQs sofort und entlastet unser Team enorm.",
    name: "Sophie K., Co-Founder, Tennis-Shop Berlin",
  },
  {
    stars: 5,
    feedback: "Lumenix hat uns bei der Automatisierung mit Make und Twilio geholfen – spart uns täglich Stunden.",
    name: "Lukas R., Inhaber, E-Commerce Store München",
  },
];

const TestimonialCard: React.FC<TestimonialProps> = ({ stars, feedback, name, index }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      className="bg-white rounded-xl shadow-md p-6 border border-gray-100 h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: prefersReducedMotion ? 0.3 : 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.1
      }}
      whileHover={prefersReducedMotion ? {} : { y: -5, transition: { duration: 0.3 } }}
    >
      {/* Star Rating */}
      <div className="flex space-x-1 mb-4">
        {Array.from({ length: stars }).map((_, i) => (
          <Star 
            key={i} 
            size={20} 
            className="fill-yellow-400 text-yellow-400" 
          />
        ))}
      </div>
      
      {/* Feedback */}
      <p className="text-gray-700 mb-4 flex-grow">"{feedback}"</p>
      
      {/* Client Info */}
      <p className="text-sm text-gray-500 mt-auto">{name}</p>
    </motion.div>
  );
};

export default function TestimonialsSection() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });
  
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <section ref={ref} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
        >
          <h2 className="text-3xl font-bold mb-2">Was unsere Kunden sagen</h2>
          <p className="text-gray-600">4.9 ⭐️ Durchschnittsbewertung</p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard 
              key={index}
              stars={testimonial.stars}
              feedback={testimonial.feedback}
              name={testimonial.name}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}