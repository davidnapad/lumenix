import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function ImpressumPage() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location]);

  return (
    <div className="min-h-screen scroll-mt-20">
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
            Impressum
          </h1>

          {/* Single container with glow effect */}
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00dfff]/20 to-[#A855F7]/20 rounded-3xl blur-2xl" />
            
            {/* Content container */}
            <div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-lg border border-white/20 space-y-8">
              <div className="space-y-8">
                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    Angaben gemäß § 5 TMG
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    David Napadovsky<br />
                    Kastanienallee 20<br />
                    77656 Offenburg<br />
                    Deutschland
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    Kontakt
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Telefon: <a href="tel:+4917627068469" className="text-[#00dfff] hover:text-[#A855F7] transition-colors">+49 176 27068469</a><br />
                    E-Mail: <a href="mailto:kontakt@lumenixmedia.de" className="text-[#00dfff] hover:text-[#A855F7] transition-colors">kontakt@lumenixmedia.de</a>
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    Umsatzsteuer-ID
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Umsatzsteuer-Identifikationsnummer gemäß § 27a Umsatzsteuergesetz:<br />
                    DE368175947<br />
                    Von der Umsatzsteuer befreit gemäß Kleinunternehmerregelung (§ 19 UStG).
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    David Napadovsky<br />
                    Kastanienallee 20<br />
                    77656 Offenburg
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    EU-Streitschlichtung
                  </h2>
                  <div className="text-gray-700 leading-relaxed space-y-4">
                    <p>
                      Plattform der EU-Kommission zur Online-Streitbeilegung:<br />
                      <a 
                        href="https://ec.europa.eu/consumers/odr"
                        className="text-[#00dfff] hover:text-[#A855F7] transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        https://ec.europa.eu/consumers/odr
                      </a>
                    </p>
                    <p>
                      Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    Support
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Für Supportanfragen erreichst du uns unter:<br />
                    <a 
                      href="mailto:support@lumenixmedia.de"
                      className="text-[#00dfff] hover:text-[#A855F7] transition-colors"
                    >
                      support@lumenixmedia.de
                    </a>
                  </p>
                </div>
              </div>

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