import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function PrivacyPage() {
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
            Datenschutzerklärung
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
                    1. Allgemeine Hinweise und Pflichtinformationen
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
                    Lumenix Media<br />
                    David Napadovsky<br />
                    Kastanienallee 20<br />
                    77656 Offenburg<br />
                    Deutschland<br /><br />
                    Telefon: <a href="tel:+4917627068469" className="text-[#00dfff] hover:text-[#A855F7] transition-colors">+49 176 27068469</a><br />
                    E-Mail: <a href="mailto:support@lumenixmedia.de" className="text-[#00dfff] hover:text-[#A855F7] transition-colors">support@lumenixmedia.de</a>
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    Datenschutzbeauftragter
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Wir haben für unser Unternehmen einen Datenschutzbeauftragten benannt:<br /><br />
                    David Napadovsky<br />
                    E-Mail: <a href="mailto:support@lumenixmedia.de" className="text-[#00dfff] hover:text-[#A855F7] transition-colors">support@lumenixmedia.de</a>
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    2. Erhebung und Speicherung personenbezogener Daten
                  </h2>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">2.1 Aufruf unserer Website</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Beim Aufrufen unserer Website werden durch den auf deinem Endgerät zum Einsatz kommenden Browser automatisch Informationen an den Server unserer Website übermittelt. Diese Informationen werden temporär in einem sog. Logfile gespeichert. Folgende Informationen werden dabei ohne dein Zutun erfasst und bis zur automatisierten Löschung gespeichert:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-2">
                      <li>IP-Adresse des anfragenden Rechners</li>
                      <li>Datum und Uhrzeit des Zugriffs</li>
                      <li>Name und URL der abgerufenen Datei</li>
                      <li>Website, von der aus der Zugriff erfolgt (Referrer-URL)</li>
                      <li>Verwendeter Browser und ggf. das Betriebssystem deines Rechners sowie der Name deines Access-Providers</li>
                    </ul>
                  </div>

                  <div className="mt-6">
                    <h3 className="text-lg font-semibold mb-4">2.2 Kontaktformular und Newsletter-Anmeldung</h3>
                    <p className="text-gray-700 leading-relaxed">
                      Wenn du uns per Kontaktformular Anfragen zukommen lässt, werden deine Angaben aus dem Anfrageformular inklusive der von dir dort angegebenen Kontaktdaten zum Zweck der Bearbeitung der Anfrage und für mögliche Anschlussfragen bei uns gespeichert.
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    3. Analysetools und Tools von Drittanbietern
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Aktuell setzen wir keine Webanalysedienste wie Google Analytics oder Tracking-Tools wie das Meta (Facebook)-Pixel ein.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    4. Hosting
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Unsere Website wird bei Netlify (Netlify, Inc.) gehostet. Netlify verarbeitet ggf. deine IP-Adresse und weitere Metadaten beim Besuch der Website. Hierbei kann es auch zu Datenübermittlungen in die USA kommen.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    5. Externe Dienstleister
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Projektmanagement-Tool „awork"<br />
                    Wir nutzen awork (awork GmbH) zur gemeinsamen Projektplanung und -durchführung mit unseren Kund:innen.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    6. Speicherdauer
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Wir speichern deine personenbezogenen Daten nur so lange, wie dies zur Erreichung der jeweiligen Zwecke erforderlich ist oder wie es die gesetzlich vorgeschriebenen Aufbewahrungsfristen verlangen.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    7. Deine Rechte als betroffene Person
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Du hast das Recht:
                  </p>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2 mt-4">
                    <li>Auskunft über deine von uns verarbeiteten personenbezogenen Daten zu verlangen</li>
                    <li>Berichtigung unrichtiger oder Vervollständigung unvollständiger Daten zu verlangen</li>
                    <li>Löschung deiner bei uns gespeicherten personenbezogenen Daten zu verlangen</li>
                    <li>Einschränkung der Verarbeitung deiner Daten zu verlangen</li>
                    <li>Widerspruch gegen die Verarbeitung deiner Daten einzulegen</li>
                    <li>Datenübertragbarkeit zu verlangen</li>
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    8. Datensicherheit
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Wir verwenden innerhalb des Website-Besuchs das verbreitete SSL-Verfahren (Secure Socket Layer) in Verbindung mit der jeweils höchsten Verschlüsselungsstufe, die von deinem Browser unterstützt wird.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    9. Aktualität und Änderung dieser Datenschutzerklärung
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    Diese Datenschutzerklärung ist aktuell gültig und hat den Stand: April 2025. Durch die Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher bzw. behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern.
                  </p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#00dfff] to-[#A855F7]">
                    Support
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    <a href="mailto:support@lumenixmedia.de" className="text-[#00dfff] hover:text-[#A855F7] transition-colors">
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