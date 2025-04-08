import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Footer() {
  const handleScrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of the fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {/* Column 1: Branding */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img 
                src="https://i.postimg.cc/VvGDNZ46/Lumenix-8.png" 
                alt="Lumenix Media" 
                className="h-12 w-auto" 
              />
              <span className="text-xl font-bold">Lumenix</span>
            </Link>
            
            <p className="text-gray-600">
              Lumenix macht deine Geschäftsprozesse intelligenter – mit KI-Chatbots, Voice Agents & Automatisierung.
            </p>

            <Link 
              to="/kontakt"
              className="inline-flex items-center px-6 py-3 rounded-xl text-white font-medium transition-all active:scale-95 bg-gradient-to-r from-[#00dfff] to-[#A855F7] hover:shadow-lg hover:-translate-y-0.5"
            >
              Kostenloses Erstgespräch
              <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li>
                <button 
                  onClick={() => handleScrollToSection('leistungen')}
                  className="text-gray-600 hover:text-[#A855F7] transition-colors"
                >
                  Leistungen
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollToSection('ablauf')}
                  className="text-gray-600 hover:text-[#A855F7] transition-colors"
                >
                  Ablauf
                </button>
              </li>
              <li>
                <button 
                  onClick={() => handleScrollToSection('ueber-uns')}
                  className="text-gray-600 hover:text-[#A855F7] transition-colors"
                >
                  Über uns
                </button>
              </li>
              <li>
                <Link 
                  to="/kontakt"
                  className="text-gray-600 hover:text-[#A855F7] transition-colors"
                >
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact */}
          <div>
            <h3 className="text-lg font-bold mb-6">Kontakt</h3>
            <ul className="space-y-4">
              <li>
                <a 
                  href="mailto:info@lumenixmedia.de"
                  className="flex items-center text-gray-600 hover:text-[#A855F7] transition-colors"
                >
                  <Mail className="w-5 h-5 mr-2" />
                  info@lumenixmedia.de
                </a>
              </li>
              <li>
                <a 
                  href="tel:+4917627068469"
                  className="flex items-center text-gray-600 hover:text-[#A855F7] transition-colors"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  +49 176 27068469
                </a>
              </li>
              <li>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-5 h-5 mr-2" />
                  Offenburg, Deutschland
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar with Legal Links */}
      <div className="border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col items-center space-y-4">
            <p className="text-sm text-gray-600">
              © 2024 Lumenix Media. Alle Rechte vorbehalten.
            </p>
            <div className="flex space-x-6">
              <Link 
                to="/impressum"
                className="text-sm text-gray-600 hover:text-[#A855F7] transition-colors"
              >
                Impressum
              </Link>
              <span className="text-gray-300">|</span>
              <Link 
                to="/datenschutz"
                className="text-sm text-gray-600 hover:text-[#A855F7] transition-colors"
              >
                Datenschutz
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}