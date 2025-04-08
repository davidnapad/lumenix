import React, { useEffect } from "react";

export default function CalendlyBooking() {
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
            const namespace = ar[1]; api.q = api.q || [];
            if (typeof namespace === "string") {
              cal.ns[namespace] = cal.ns[namespace] || api;
              p(cal.ns[namespace], ar);
              p(cal, ["initNamespace", namespace]);
            } else p(cal, ar);
            return;
          }
          p(cal, ar);
        };
      })(window, "https://app.cal.com/embed/embed.js", "init");

      Cal("init", "30min", { origin: "https://cal.com" });

      Cal.ns["30min"]("inline", {
        elementOrSelector: "#my-cal-inline-home",
        config: { "layout": "month_view" },
        calLink: "davidnapad/30min"
      });

      Cal.ns["30min"]("ui", {
        cssVarsPerTheme: {
          light: { "cal-brand": "#00CFFF" },
          dark: { "cal-brand": "#A259FF" }
        },
        hideEventTypeDetails: true,
        layout: "month_view"
      });
    `;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section id="calendly" className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">📅 Termin vereinbaren</h2>
        <p className="mb-8 text-gray-700">
          Buche dir direkt einen freien Termin für ein kostenloses Erstgespräch.
        </p>
        
        {/* Calendar container */}
        <div className="relative w-full max-w-[1200px] mx-auto">
          {/* Glow effect */}
          <div 
            className="absolute -inset-[2px] rounded-2xl"
            style={{
              background: 'linear-gradient(to right, rgba(0, 208, 255, 0.3), rgba(162, 89, 255, 0.3))',
              boxShadow: `
                0 0 25px rgba(0, 208, 255, 0.3),
                0 0 50px rgba(162, 89, 255, 0.2)
              `,
            }}
          />
          
          {/* Calendar wrapper */}
          <div 
            className="relative bg-white rounded-2xl overflow-hidden"
            style={{
              height: '750px',
            }}
          >
            <div 
              id="my-cal-inline-home" 
              className="w-full h-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}