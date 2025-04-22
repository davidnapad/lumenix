import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 0);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.hash) {
      const element = document.querySelector(location.hash);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    }
  }, [location, prefersReducedMotion]);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigate('/');
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    e.preventDefault();
    
    if (!href.includes('#')) {
      navigate(href);
      return;
    }
    
    if (location.pathname !== '/') {
      navigate(href);
      return;
    }

    const hash = href.split('#')[1];
    if (hash) {
      const element = document.getElementById(hash);
      if (element) {
        const headerOffset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
      }
    }
  };

  const navItems = [
    { href: "/#leistungen", text: "Leistungen" },
    { href: "/#ablauf", text: "Ablauf" },
    { href: "/#ueber-uns", text: "Über uns" }
  ];

  const transitionConfig = {
    duration: prefersReducedMotion ? 0.1 : 0.3
  };

  return (
    <>
      {/* Desktop Logo and CTA */}
      <motion.div 
        className="hidden md:block fixed w-full bg-white/80 backdrop-blur-sm border-b border-gray-100 z-40 will-change-transform"
        animate={{ 
          y: isScrolled ? -100 : 0,
          opacity: isScrolled ? 0 : 1
        }}
        transition={transitionConfig}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://i.postimg.cc/VvGDNZ46/Lumenix-8.png" 
                alt="Lumenix Media" 
                className="h-12 w-auto"
                loading="eager"
                width={48}
                height={48}
              />
              <span className="text-xl font-bold">Lumenix</span>
            </button>
          </div>
        </div>
      </motion.div>

      {/* Navigation Menu */}
      <div className="fixed w-full z-50">
        <div className="absolute top-0 left-0 w-full">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-center h-16 md:h-20">
              <motion.div 
                className="relative will-change-transform"
                animate={{
                  y: isScrolled ? 20 : 0,
                }}
                transition={transitionConfig}
              >
                <motion.div
                  className="absolute inset-0 -inset-x-4"
                  initial={false}
                  animate={{
                    opacity: isScrolled ? 1 : 0
                  }}
                  transition={transitionConfig}
                >
                  <div className="absolute inset-0 bg-white/40 backdrop-blur-sm rounded-full" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00dfff]/10 to-[#A855F7]/10 rounded-full blur-2xl" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00dfff]/5 to-[#A855F7]/5 rounded-full blur-xl" />
                </motion.div>
                
                <div className="relative flex items-center space-x-6 px-6 py-2">
                  {navItems.map((item) => (
                    <a 
                      key={item.href}
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item.href)}
                      className="text-sm text-gray-800 hover:text-accent-purple transition-colors whitespace-nowrap"
                    >
                      {item.text}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Logo (Below Navigation) */}
      <motion.div 
        className="fixed top-16 left-0 w-full md:hidden z-40 will-change-transform"
        initial={false}
        animate={{ 
          opacity: isScrolled ? 0 : 1,
          y: isScrolled ? -20 : 0
        }}
        transition={transitionConfig}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-center h-16">
            <button 
              onClick={handleLogoClick}
              className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
            >
              <img 
                src="https://i.postimg.cc/VvGDNZ46/Lumenix-8.png" 
                alt="Lumenix Media" 
                className="h-8 w-auto"
                loading="eager"
                width={32}
                height={32}
              />
              <span className="text-base font-bold">Lumenix</span>
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
}