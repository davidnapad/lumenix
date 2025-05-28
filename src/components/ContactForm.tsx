import { Mail } from 'lucide-react';
import { useState, FormEvent, useCallback } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { formatFormData } from '../lib/formUtils';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
    privacy: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{success: boolean; message: string} | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);
    setSubmitResult(null);
    
    try {
      // Format data for submission
      const formattedData = formatFormData(formData);
      
      // Send data to Make.com webhook
      const response = await fetch('https://hook.eu2.make.com/tzajippi8g4qo50cferk6e1xyre2balv', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Clear form after successful submission
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
        privacy: false
      });
      
      setSubmitResult({
        success: true, 
        message: 'Deine Nachricht wurde erfolgreich gesendet. Wir werden uns in Kürze bei dir melden.'
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitResult({
        success: false, 
        message: 'Es gab ein Problem beim Senden deiner Nachricht. Bitte versuche es später noch einmal.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Memoized change handler for better performance
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      // Cast to handle checkbox inputs
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({
        ...prev,
        [name]: checkbox.checked
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  }, []);

  return (
    <section id="kontaktformular" className="scroll-mt-32">
      <div className="w-full bg-white/80 backdrop-blur-sm rounded-xl md:rounded-2xl shadow-lg p-4 md:p-8">
        {submitResult && (
          <div className={`mb-6 p-4 rounded-lg ${submitResult.success ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {submitResult.message}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-3 rounded-xl bg-background border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              value={formData.name}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-Mail-Adresse *
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-3 rounded-xl bg-background border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              value={formData.email}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefonnummer (optional)
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              className="w-full px-4 py-3 rounded-xl bg-background border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
              Gewünschte Lösung *
            </label>
            <select
              id="service"
              name="service"
              required
              className="w-full px-4 py-3 rounded-xl bg-background border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              value={formData.service}
              onChange={handleInputChange}
              disabled={isSubmitting}
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
              name="message"
              required
              rows={4}
              className="w-full px-4 py-3 rounded-xl bg-background border border-gray-200 shadow-sm focus:ring-2 focus:ring-primary focus:border-transparent transition-colors"
              value={formData.message}
              onChange={handleInputChange}
              disabled={isSubmitting}
            />
          </div>

          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="privacy"
              name="privacy"
              required
              className="mt-1 h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded transition-colors"
              checked={formData.privacy}
              onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
              disabled={isSubmitting}
            />
            <label htmlFor="privacy" className="text-sm text-gray-600">
              🔒 Mit dem Absenden akzeptierst du die Verarbeitung deiner Daten gemäß unserer Datenschutzerklärung. *
            </label>
          </div>

          <motion.button
            type="submit"
            className="w-full md:w-fit mx-auto mt-6 md:mt-8 flex items-center justify-center bg-gradient-to-r from-cyan-400 to-violet-500 text-white font-medium py-3 px-6 rounded-xl shadow-md hover:shadow-lg transition-all will-change-transform disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span>Wird gesendet...</span>
                <div className="ml-2 h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
              </>
            ) : (
              <>
                <span>Nachricht senden</span>
                <Mail className="ml-2 h-5 w-5" />
              </>
            )}
          </motion.button>
        </form>
      </div>
    </section>
  );
}