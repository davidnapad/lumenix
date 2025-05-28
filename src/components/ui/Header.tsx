import { useState, useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Briefcase, Clock as ClockCountdown, Users, Phone } from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { NavBar } from './tubelight-navbar';
import { AuroraButton } from './aurora-button';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const scrollingRef = useRef(false);
  const isTopRef = useRef(true);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile, { passive: true });
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Set up IntersectionObserver for section detection
    const sectionIds = ['leistungen', 'ablauf', 'ueber-uns'];
    const observers = [];
    
    // Detect if we're at the top of the page
    const checkIfTop = () => {
      const currentScrollY = window.scrollY;
      const wasTop = isTopRef.current;
      isTopRef.current = currentScrollY < 100;
      
      // Update scroll state
      if (currentScrollY > 5 && !isScrolled) {
        setIsScrolled(true);
      } else if (currentScrollY <= 5 && isScrolled) {
        setIsScrolled(false);
      }
      
      // If we just scrolled to the top, reset active section
      if (!wasTop && isTopRef.current) {
        setActiveSection('');
      }
    };
    
    const observerOptions = {
      rootMargin: '-120px 0px -80% 0px', // Adjusted to trigger when section is near the top
      threshold: [0.01, 0.1, 0.2] // Multiple thresholds for better detection
    };
    
    // Handle scroll state with throttling
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const handleScrollState = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        window.requestAnimationFrame(() => {
          checkIfTop();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    // Set up observers for each section
    sectionIds.forEach(sectionId => {
      const section = document.getElementById(sectionId);
      if (section) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            // Only update if we're not manually scrolling to a section and not at the top
            if (entry.isIntersecting && !scrollingRef.current && !isTopRef.current) {
              setActiveSection(sectionId);
            }
          });
        }, observerOptions);
        
        observer.observe(section);
        observers.push(observer);
      }
    });
    
    // Set up scroll listener for header appearance
    window.addEventListener('scroll', handleScrollState, { passive: true });
    
    // Initial check
    handleScrollState();
    
    return () => {
      // Clean up all observers
      observers.forEach(observer => observer.disconnect());
      window.removeEventListener('scroll', handleScrollState);
    };
  }, [isScrolled]);

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.substring(1);
      const element = document.getElementById(targetId);
      
      if (element) {
        scrollingRef.current = true;
        // Delay scrolling slightly to ensure DOM is ready
        setTimeout(() => {
          const headerOffset = 120; // Increased offset to account for header height + padding
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });
          
          // Set active section based on hash
          setActiveSection(targetId);
          
          // Reset scrolling flag after animation completes
          setTimeout(() => {
            scrollingRef.current = false;
          }, prefersReducedMotion ? 100 : 800);
        }, 100);
      }
    }
  }, [location, prefersReducedMotion]);

  const handleScrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    scrollingRef.current = true;
    navigate('/');
    window.scrollTo({ 
      top: 0, 
      behavior: prefersReducedMotion ? 'auto' : 'smooth' 
    });
    setTimeout(() => {
      scrollingRef.current = false;
      setActiveSection('');
    }, prefersReducedMotion ? 100 : 800);
  };

  const handleNavClick = (item: any) => {
    const href = item.url;
    
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
        scrollingRef.current = true;
        setActiveSection(hash);
        
        const headerOffset = 120; // Increased for better scroll positioning
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? 'auto' : 'smooth'
        });
        
        // Reset scrolling flag after animation completes
        setTimeout(() => {
          scrollingRef.current = false;
        }, prefersReducedMotion ? 100 : 800);
      }
    }
  };

  // Navigation items with proper icons
  const navItems = [
    { name: 'Leistungen', url: "/#leistungen", icon: Briefcase },
    { name: 'Ablauf', url: "/#ablauf", icon: ClockCountdown },
    { name: 'Über uns', url: "/#ueber-uns", icon: Users }
  ];

  // Map section IDs to nav item names
  const sectionToNavMap: Record<string, string> = {
    'leistungen': 'Leistungen',
    'ablauf': 'Ablauf',
    'ueber-uns': 'Über uns'
  };

  const transitionConfig = {
    duration: prefersReducedMotion ? 0.1 : 0.3
  };

  return (
    <div className="fixed w-full z-50 top-0 left-0 pointer-events-none will-change-transform translate-z-0">
      {/* Main Navigation Container - Centered */}
      <div className="relative w-full flex items-center justify-center">
        {/* Desktop logo - Always visible on desktop */}
        <motion.div 
          className="hidden md:block absolute left-4 h-20 pointer-events-auto"
          initial={false}
          animate={{ opacity: isScrolled ? 0 : 1 }}
          transition={transitionConfig}
        >
          <button 
            onClick={handleScrollToTop}
            className="flex items-center space-x-2 hover:opacity-80 transition-opacity h-20"
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
        </motion.div>
        
        {/* Navbar with Tubelight Effect - Perfectly Centered */}
        <div className="h-12 md:h-20 pointer-events-none">
          <motion.div 
            className="relative transform-gpu will-change-transform backface-hidden"
            initial={false}
            animate={{
              y: 0
            }}
            style={{ 
              transform: 'translateZ(0)',
              willChange: 'transform',
              backfaceVisibility: 'hidden',
            }}
          >
            {/* Single background capsule with improved gradient and blur */}
            <div className="pointer-events-auto rounded-full shadow-lg">
              <div className="absolute inset-0 rounded-full bg-white/70 backdrop-blur-md"></div>
              
              {/* Only show subtle background on desktop */}
              {!isMobile && (
                <div className="absolute inset-0 bg-gradient-to-r from-[#00dfff]/5 to-[#A855F7]/5 rounded-full blur-lg"></div>
              )}
              
              {/* Animated glow border only on desktop */}
              {!isMobile && (
                <motion.div 
                  className="absolute inset-0 rounded-full overflow-hidden"
                  animate={{ opacity: isScrolled ? 0.3 : 0 }}
                  transition={transitionConfig}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-[#00dfff] via-[#A855F7] to-[#00dfff] bg-[length:400%_100%] rounded-full animate-glow-border opacity-20"></div>
                </motion.div>
              )}
              
              {/* Content Container */}
              <div className="relative px-1 py-1 md:px-1.5 md:py-1.5 flex items-center">
                {/* Logo in Navbar - Smaller on mobile */}
                <button 
                  onClick={handleScrollToTop}
                  className="flex items-center justify-center h-7 w-7 md:h-8 md:w-8 rounded-full overflow-hidden mr-1 md:mr-2 cursor-pointer hover:opacity-80 transition-opacity shadow-sm"
                  aria-label="Zum Seitenanfang"
                >
                  <img
                    src="https://i.postimg.cc/VvGDNZ46/Lumenix-8.png"
                    alt="Lumenix"
                    className="h-full w-full object-contain"
                    loading="eager"
                    width={32}
                    height={32}
                  />
                </button>
                
                <NavBar 
                  items={navItems} 
                  activeItem={sectionToNavMap[activeSection] || ''}
                  onNavClick={handleNavClick}
                  className="overflow-hidden"
                  isMobile={isMobile}
                  ctaButton={
                    <div className="flex items-center h-full scale-[0.85] origin-right md:scale-100">
                      {isMobile ? (
                        <Link 
                          to="/kalender"
                          className="flex items-center justify-center w-8 h-8 rounded-full bg-white text-gray-800 shadow-sm"
                          aria-label="Contact page"
                        >
                          <Phone className="w-4 h-4" />
                        </Link>
                      ) : (
                        <AuroraButton
                          as={Link}
                          href="/kalender"
                          to="/kalender"
                          className="font-semibold text-xs md:text-sm py-1.5 md:py-2 px-2.5 md:px-4 text-gray-900 bg-white/40 backdrop-blur-sm hover:bg-white/60 transition-all flex items-center"
                          glowClassName="from-pink-500 via-purple-500 to-blue-500"
                          glowSize="sm"
                          containerClassName="transition-transform duration-300 hover:scale-[1.03]"
                        >
                          <span className="flex items-center">
                            Lass uns reden
                            <ArrowRight className="ml-1 w-3.5 h-3.5 md:w-4 md:h-4 group-hover:translate-x-0.5 transition-transform" />
                          </span>
                        </AuroraButton>
                      )}
                    </div>
                  }
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}