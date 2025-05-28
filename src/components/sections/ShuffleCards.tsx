import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface TestimonialCardProps {
  testimonial: string;
  author: string;
  id: number;
  isMobile: boolean;
  isActive?: boolean;
}

const testimonials = [
  {
    id: 12,
    testimonial: "Mit dem KI-Chatbot von Lumenix konnten wir unseren Umsatz um über 30% steigern und die Supportkosten um fast 80% reduzieren. Kunden erhalten sofortige Antworten, was zu schnelleren Kaufentscheidungen führt und unserem Team viel Zeit spart.",
    author: "Pauline Diel – CEO, Ecoliva Wear (Baby-Produkte)"
  },
  {
    id: 14,
    testimonial: "Ich war wirklich überrascht, wie natürlich unser KI-Assistent am Telefon klingt – fast wie ein echtes Teammitglied. Er beantwortet alle Anrufe, vereinbart selbstständig Termine (auch nach Feierabend) und reduziert die Arbeitsbelastung für unser Personal erheblich. Die Patientenzufriedenheit ist gestiegen, und wir sparen über 5.000 € pro Monat. Unsere täglichen Abläufe sind jetzt viel entspannter.",
    author: "Dr. Murganic – Praxisinhaber, Gesundheitswesen"
  },
  {
    id: 16,
    testimonial: "Der KI-Voice-Agent war für mein Studio ein absoluter Game Changer. Ich bin nicht mehr ständig am Telefon, Termine werden automatisch vergeben – sogar nachts. Dadurch haben wir mehr Buchungen, bessere Planung und weniger Stress.",
    author: "Sarah Kaiser – Inhaberin, Kosmetikstudio"
  },
  {
    id: 18,
    testimonial: "Ich war anfangs echt skeptisch – ein Voice Agent für unsere Mieteranfragen? Heute wüsste ich nicht, wie wir ohne ihn klarkommen. Vorher hatten wir zwei Mitarbeiter im Support. Jetzt übernimmt der Voice Agent fast alles selbstständig – rund um die Uhr erreichbar, sofortige Antworten, klare Weiterleitung. Eine Stelle konnten wir komplett einsparen – und unsere Mieter sind zufriedener denn je.",
    author: "Manuel Rieger – Geschäftsführer, Immobilien"
  }
];

// Testimonial Card Component
function TestimonialCard({ testimonial, author, id, isMobile, isActive = false }: TestimonialCardProps) {
  return (
    <motion.div
      className={`bg-white rounded-xl shadow-md border border-gray-100 p-4 md:p-6 transition-all duration-300 will-change-transform optimize-gpu ${isActive ? 'scale-100 opacity-100 z-20' : 'scale-95 opacity-70 z-10'}`}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: isActive ? 1 : 0.95, opacity: isActive ? 1 : 0.7 }}
      exit={{ scale: 0.9, opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        transform: 'translateZ(0)',
        backfaceVisibility: 'hidden',
        contain: 'layout'
      }}
    >
      {/* Star Rating */}
      <div className="flex mb-3 md:mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} className="w-3.5 h-3.5 md:w-4 md:h-4 fill-yellow-400 text-yellow-400 mr-1" />
        ))}
      </div>

      {/* Avatar and Content */}
      <div className="flex gap-3 md:gap-4">
        <div className="shrink-0">
          <div className="relative">
            {/* Gradient Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00dfff] to-[#A855F7] rounded-full z-0"></div>
            {id === 12 ? (
              <img
                src="https://i.postimg.cc/8k7bLYYJ/Whats-App-Bild-2025-05-26-um-22-42-12-92fbbe9c.jpg"
                alt={`Avatar für ${author}`}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover object-center relative z-10 border border-white"
                loading="lazy"
              />
            ) : id === 14 ? (
              <img
                src="https://i.postimg.cc/J43RB5BB/image.png"
                alt={`Avatar für ${author}`}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover relative z-10 border border-white"
                loading="lazy"
              />
            ) : id === 18 ? (
              <img
                src="https://i.postimg.cc/zf2WWRcT/image.png"
                alt={`Avatar für ${author}`}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover relative z-10 border border-white"
                loading="lazy"
              />
            ) : id === 16 ? (
              <img
                src="https://i.postimg.cc/mkYyQgMR/image.png"
                alt={`Avatar für ${author}`}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover relative z-10 border border-white"
                loading="lazy"
              />
            ) : (
              <img
                src={`https://i.pravatar.cc/128?img=${id}`}
                alt={`Avatar für ${author}`}
                className="h-10 w-10 md:h-12 md:w-12 rounded-full object-cover relative z-10 border border-white"
                loading="lazy"
              />
            )}
          </div>
        </div>

        <div className="flex-1 overflow-hidden">
          {/* Quote - Using text truncation and word break for better text handling */}
          <blockquote className="text-gray-800 text-xs md:text-sm mb-2 md:mb-3 font-medium break-words whitespace-normal overflow-hidden">
            "{testimonial}"
          </blockquote>

          {/* Author */}
          <p className="text-gray-500 text-xs md:text-sm whitespace-normal">— {author}</p>
        </div>
      </div>
    </motion.div>
  );
}

export default function ShuffleCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const cardsRef = useRef<HTMLDivElement | null>(null);
  
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });
  
  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Handle navigation
  const navigateTestimonial = (direction: 'next' | 'prev') => {
    setCurrentIndex(prev => {
      if (direction === 'next') {
        return (prev + 1) % testimonials.length;
      } else {
        return (prev - 1 + testimonials.length) % testimonials.length;
      }
    });
  };
  
  // Touch event handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isMobile) return;
    setIsDragging(true);
    setStartX(e.touches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !isMobile) return;
  };
  
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!isDragging || !isMobile) return;
    
    const endX = e.changedTouches[0].clientX;
    const diffX = endX - startX;
    
    if (Math.abs(diffX) > 50) {
      if (diffX > 0) {
        navigateTestimonial('prev');
      } else {
        navigateTestimonial('next');
      }
    }
    
    setIsDragging(false);
  };
  
  return (
    <section 
      ref={ref} 
      className="py-12 md:py-20 bg-gray-50 relative overflow-hidden"
      id="testimonials"
    >
      {/* Gradient Decorative Elements */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-gradient-to-r from-[#00dfff]/30 to-[#A855F7]/30 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-gradient-to-r from-[#A855F7]/30 to-[#00dfff]/30 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Das sagen unsere Kunden</h2>
          <p className="text-gray-600 font-medium">4,9 / 5 ⭐</p>
          <p className="text-sm text-gray-500 mt-1 px-4 mx-auto max-w-xl">Basierend auf Kundenbewertungen aus E-Commerce, Immobilien und Gesundheitsbranche ...</p>
        </div>
        
        <div 
          ref={cardsRef}
          className="relative max-w-2xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Desktop Navigation Arrows - Fixed positioning */}
          {!isMobile && (
            <>
              <button 
                onClick={() => navigateTestimonial('prev')}
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 lg:-translate-x-16 z-30 p-3 rounded-full bg-white shadow-lg border border-gray-100 text-gray-700 hover:text-[#00dfff] transition-colors"
                aria-label="Previous testimonial"
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => navigateTestimonial('next')}
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 lg:translate-x-16 z-30 p-3 rounded-full bg-white shadow-lg border border-gray-100 text-gray-700 hover:text-[#00dfff] transition-colors"
                aria-label="Next testimonial"
                style={{ minHeight: '44px', minWidth: '44px' }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          
          {/* Testimonial Cards - Adjusted height and containment */}
          <div className="relative h-[280px] sm:h-[260px] md:h-[230px] lg:h-[210px] overflow-visible">
            <AnimatePresence mode="wait">
              <TestimonialCard 
                key={`${testimonials[currentIndex].id}-current`}
                testimonial={testimonials[currentIndex].testimonial}
                author={testimonials[currentIndex].author}
                id={testimonials[currentIndex].id}
                isMobile={isMobile}
                isActive={true}
              />
            </AnimatePresence>
          </div>
          
          {/* Navigation Dots - Smaller and centered above instruction text */}
          <div className="flex justify-center mt-4 md:mt-6 mb-2 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-gradient-to-r from-[#00dfff] to-[#A855F7] w-5'
                    : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                style={{ minHeight: '8px', minWidth: '8px' }}
              />
            ))}
          </div>
          
          {/* Instruction Text - Always below pagination with proper spacing */}
          <div className="text-center mt-2">
            <p className="text-xs sm:text-sm text-gray-500">
              {isMobile 
                ? "Wische nach links oder rechts, um weitere Bewertungen zu sehen" 
                : "Klicke auf die Pfeile, um weitere Bewertungen zu sehen"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}