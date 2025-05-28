import React, { useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";

export default function CalendlyBooking() {
  const scriptLoaded = useRef(false);
  const calendarLoaded = useRef(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '300px 0px', // Increased to load even earlier
  });

  useEffect(() => {
    if (!inView || scriptLoaded.current || calendarLoaded.current) return;

    const loadCalendar = () => {
      const script = document.createElement('script');
      script.innerHTML = `
        (function (C, A, L) {
          let p = function (a, ar) { a.q.push(ar); };
          let d = C.document;
          C.Cal = C.Cal || function () {
            let cal = C.Cal; let ar = arguments;
            if (!cal.loaded) {
              cal.ns = {}; cal.q = cal.q || [];
              d.head.appendChild(d.createElement("script")).src = A;
              cal.loaded = true;
            }
            if (ar[0] === L) {
              const api = function () { p(api, arguments); };
              const namespace = ar[1];
              api.q = api.q || [];
              if(typeof namespace === "string"){
                cal.ns[namespace] = cal.ns[namespace] || api;
                p(cal.ns[namespace], ar);
                p(cal, ["initNamespace", namespace]);
              } else p(cal, ar);
              return;
            }
            p(cal, ar);
          };
        })(window, "https://app.cal.com/embed/embed.js", "init");

        Cal("init", "30min", {origin:"https://cal.com"});

        Cal.ns["30min"]("inline", {
          elementOrSelector:"#my-cal-inline-home",
          config: {"layout":"month_view","theme":"light"},
          calLink: "davidnapad/30min",
        });

        Cal.ns["30min"]("ui", {
          "theme":"light",
          "cssVarsPerTheme":{
            "light":{"cal-brand":"#00CFFF"}
          },
          "hideEventTypeDetails":true,
          "layout":"month_view"
        });
      `;
      document.body.appendChild(script);
      scriptLoaded.current = true;
      calendarLoaded.current = true;
    };

    // Strategic delay - don't compete with other resource loading
    const timer = setTimeout(loadCalendar, 2500);
    
    return () => {
      clearTimeout(timer);
      if (scriptLoaded.current) {
        const scripts = document.querySelectorAll('script');
        scripts.forEach(script => {
          if (script.innerHTML.includes('Cal("init", "30min"')) {
            document.body.removeChild(script);
          }
        });
      }
    };
  }, [inView]);

  return (
    <section ref={ref} id="calendly" className="py-12 md:py-16 px-4 md:px-6 bg-gray-50 content-visibility-auto">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">📅 Termin vereinbaren</h2>
        <p className="mb-6 md:mb-8 text-gray-700 text-sm md:text-base">
          Buche dir direkt einen freien Termin für ein kostenloses Erstgespräch.
        </p>
        
        {/* Calendar container - Added mobile responsive fixes */}
        <div className="relative w-full max-w-[1200px] mx-auto">
          {/* Glow effect */}
          <div 
            className="absolute -inset-[2px] rounded-xl md:rounded-2xl"
            style={{
              background: 'linear-gradient(to right, rgba(0, 208, 255, 0.3), rgba(162, 89, 255, 0.3))',
              boxShadow: `
                0 0 25px rgba(0, 208, 255, 0.3),
                0 0 50px rgba(162, 89, 255, 0.2)
              `,
            }}
          />
          
          {/* Calendar wrapper with responsive height adjustment */}
          <div 
            className="relative bg-white rounded-xl md:rounded-2xl overflow-hidden will-change-transform optimize-gpu"
            style={{
              height: isMobile ? '85vh' : '750px',
              maxHeight: isMobile ? '85vh' : '750px',
              transform: 'translateZ(0)',
              backfaceVisibility: 'hidden'
            }}
          >
            {!inView && (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <div className="text-center">
                  <div className="w-12 h-12 border-4 border-accent-blue border-t-transparent rounded-full animate-spin mb-4"></div>
                  <p className="text-gray-600">Kalender wird geladen...</p>
                </div>
              </div>
            )}
            <div 
              id="my-cal-inline-home" 
              className={`w-full h-full ${!inView ? 'invisible' : 'visible'}`}
              style={{ 
                width: '100%', 
                height: '100%', 
                overflow: 'auto', 
                willChange: 'transform',
                transform: 'translateZ(0)',
                backfaceVisibility: 'hidden',
                WebkitOverflowScrolling: 'touch', // Better mobile scrolling
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}