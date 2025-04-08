import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ContactForm from '../components/ContactForm';

export default function ContactPage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className="min-h-screen scroll-mt-20" id="kontakt">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white -z-10" />
      
      <div className="pt-32 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-[720px] mx-auto px-4"
        >
          {/* Back Navigation */}
          <Link 
            to="/"
            className="inline-flex items-center text-gray-600 hover:text-[#00dfff] transition-colors mb-8 group"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Zurück zur Startseite
          </Link>

          <h1 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
            Kontaktiere mich
          </h1>

          {/* Single container with glow effect */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 rounded-3xl blur-2xl" />
            
            {/* Content container */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-white/20">
              <p className="text-lg text-gray-700 mb-8">
                Sag mir, was du brauchst – ich melde mich in der Regel innerhalb von 24 Stunden.
              </p>
              
              <ContactForm />

              {/* Back to top button */}
              <div className="text-center pt-8">
                <button
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                  className="inline-flex items-center text-gray-600 hover:text-[#00dfff] transition-colors"
                >
                  Nach oben scrollen
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}