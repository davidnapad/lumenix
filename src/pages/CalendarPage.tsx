import React, { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function CalendarPage() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  }, [location, prefersReducedMotion]);

  useEffect(() => {
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
        elementOrSelector:"#my-cal-inline",
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

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen scroll-mt-20">
      {/* Background with subtle gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white -z-10" />
      
      <div className="pt-32 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: prefersReducedMotion ? 0.3 : 0.6 }}
          className="max-w-[1000px] mx-auto px-4 flex flex-col items-center"
        >
          {/* Back Navigation */}
          <div className="w-full max-w-[720px]">
            <Link 
              to="/"
              className="inline-flex items-center text-gray-600 hover:text-[#00dfff] transition-colors mb-8 group"
            >
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Zurück zur Startseite
            </Link>

            <h1 className="text-4xl font-bold mb-12 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
              Termin vereinbaren
            </h1>

            <p className="text-lg text-gray-700 mb-8">
              Buche dir direkt einen freien Termin für ein kostenloses Erstgespräch.
            </p>
          </div>

          {/* Calendar container */}
          <div className="relative w-full mx-auto">
            {/* Glow effect */}
            <div 
              className="absolute -inset-[1px] md:-inset-[2px] rounded-xl md:rounded-2xl"
              style={{
                background: 'linear-gradient(to right, rgba(0, 208, 255, 0.3), rgba(162, 89, 255, 0.3))',
                boxShadow: `
                  0 0 15px rgba(0, 208, 255, 0.2),
                  0 0 30px rgba(162, 89, 255, 0.1)
                `,
              }}
            />
            
            {/* Calendar wrapper */}
            <div 
              className="relative bg-white rounded-xl md:rounded-2xl overflow-hidden will-change-transform"
              style={{
                height: '750px'
              }}
            >
              <div 
                id="my-cal-inline" 
                className="w-full h-full"
                style={{ width: '100%', height: '100%', overflow: 'scroll', willChange: 'transform' }}
              />
            </div>
          </div>

          {/* Back to top button */}
          <div className="w-full max-w-[720px] text-center mt-8">
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' })}
              className="inline-flex items-center text-gray-600 hover:text-[#00dfff] transition-colors"
            >
              Nach oben scrollen
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}