import { Mail } from 'lucide-react';
import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    privacy: false
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <section id="kontaktformular" className="scroll-mt-32">
      <div className="w-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              required
              className="w-full px-4 py-3 rounded-xl bg-background border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail-Adresse *
            </label>
            <input
              type="email"
              id="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-background border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefonnummer (optional)
            </label>
            <input
              type="tel"
              id="phone"
              className="w-full px-4 py-3 rounded-xl bg-background border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
              Gewünschte Lösung *
            </label>
            <select
              id="service"
              required
              className="w-full px-4 py-3 rounded-xl bg-background border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              value={formData.service}
              onChange={(e) => setFormData({...formData, service: e.target.value})}
            >
              <option value="">Worum geht's?</option>
              <option value="chatbot">Chatbot</option>
              <option value="voice">Voice Agent</option>
              <option value="automation">Automatisierung</option>
              <option value="other">Sonstiges</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Erzähl mir von deinem Projekt... *
            </label>
            <textarea
              id="message"
              required
              rows={5}
              className="w-full px-4 py-3 rounded-xl bg-background border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            />
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="privacy"
              required
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition-colors"
              checked={formData.privacy}
              onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
            />
            <label htmlFor="privacy" className="text-sm text-gray-600">
              🔒 Mit dem Absenden akzeptierst du die Verarbeitung deiner Daten gemäß unserer Datenschutzerklärung. *
            </label>
          </div>

          <motion.button
            type="submit"
            className="w-full md:w-fit mx-auto mt-8 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Nachricht senden</span>
            <Mail className="ml-2 h-5 w-5" />
          </motion.button>
        </form>
      </div>
    </section>
  );
}