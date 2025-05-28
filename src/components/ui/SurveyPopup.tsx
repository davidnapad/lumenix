import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, FileText } from 'lucide-react';
import { formatFormData } from '../../lib/formUtils';

interface SurveyPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SurveyPopup({ isOpen, onClose }: SurveyPopupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: What demo interests you most?
    target: '',
    
    // Step 2: Industry
    industry: '',
    
    // Step 3: What should the bot take over?
    tasks: [] as string[],
    otherTask: '',
    
    // Step 4: Where should the bot be integrated?
    platforms: [] as string[],
    otherPlatform: '',
    
    // Step 5: Contact info
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    company: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleCheckboxChange = useCallback((field: 'tasks' | 'platforms', value: string) => {
    setFormData(prev => {
      const currentValues = [...prev[field]];
      
      if (currentValues.includes(value)) {
        return { ...prev, [field]: currentValues.filter(item => item !== value) };
      } else {
        return { ...prev, [field]: [...currentValues, value] };
      }
    });
  }, []);

  const handleRadioChange = useCallback((value: string) => {
    setFormData(prev => ({ ...prev, target: value }));
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  }, [currentStep]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  }, [currentStep]);

  const isStepValid = useCallback(() => {
    switch (currentStep) {
      case 0: // What demo interests you most?
        return !!formData.target;
      case 1: // Industry
        return !!formData.industry;
      case 2: // What should the bot take over?
        return formData.tasks.length > 0;
      case 3: // Where should the bot be integrated?
        return formData.platforms.length > 0;
      case 4: // Contact info
        return (
          !!formData.firstName && 
          !!formData.lastName && 
          !!formData.phone && 
          !!formData.email &&
          !!formData.company
        );
      default:
        return true;
    }
  }, [currentStep, formData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      // Prepare data for submission
      const formattedData = formatFormData(formData);
      
      // Send data to Make.com webhook
      const response = await fetch('https://hook.eu2.make.com/2oec4witw2e3e35j3xfv8jbdonbv1lov', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Show success state
      setSubmitted(true);
      
      // Reset form after delay and close popup
      setTimeout(() => {
        setSubmitted(false);
        setCurrentStep(0);
        setFormData({
          target: '',
          industry: '',
          tasks: [],
          otherTask: '',
          platforms: [],
          otherPlatform: '',
          firstName: '',
          lastName: '',
          phone: '',
          email: '',
          company: ''
        });
        onClose();
      }, 3000);
    } catch (error) {
      console.error('Survey submission error:', error);
      setError('Es gab ein Problem bei der Übermittlung deiner Daten. Bitte versuche es später erneut.');
      setSubmitted(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const steps = [
    {
      title: 'Welche Demo interessiert dich am meisten?',
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            {['Einen kostenlosen Chatbot', 'Einen kostenlosen Voice Agent', 'Ich bin mir noch nicht sicher'].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="radio"
                  id={`target-${option}`}
                  name="target"
                  checked={formData.target === option}
                  onChange={() => handleRadioChange(option)}
                  className="h-5 w-5 text-accent-blue rounded-full border-gray-300 focus:ring-accent-blue transition-colors"
                  required
                />
                <label htmlFor={`target-${option}`} className="ml-2 text-gray-700">
                  {option}
                </label>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'In welcher Branche bist du tätig?',
      content: (
        <div className="space-y-4">
          <div>
            <input
              type="text"
              id="industry"
              name="industry"
              value={formData.industry}
              onChange={handleInputChange}
              placeholder="Deine Branche hier eingeben..."
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
              required
            />
          </div>
        </div>
      )
    },
    {
      title: 'Was soll in deiner Demo gezeigt werden?',
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            {['Leads generieren', 'Termine vereinbaren', 'Kundenanfragen beantworten', 'FAQ abdecken', 'Verkäufe unterstützen'].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={`tasks-${option}`}
                  checked={formData.tasks.includes(option)}
                  onChange={() => handleCheckboxChange('tasks', option)}
                  className="h-5 w-5 text-accent-blue rounded border-gray-300 focus:ring-accent-blue transition-colors"
                />
                <label htmlFor={`tasks-${option}`} className="ml-2 text-gray-700">
                  {option}
                </label>
              </div>
            ))}
            
            {/* Other option with text field */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="tasks-other"
                  checked={formData.tasks.includes('Andere')}
                  onChange={() => handleCheckboxChange('tasks', 'Andere')}
                  className="h-5 w-5 text-accent-blue rounded border-gray-300 focus:ring-accent-blue transition-colors"
                />
                <label htmlFor="tasks-other" className="ml-2 text-gray-700">
                  Andere
                </label>
              </div>
              
              {formData.tasks.includes('Andere') && (
                <input
                  type="text"
                  name="otherTask"
                  value={formData.otherTask}
                  onChange={handleInputChange}
                  placeholder="Beschreibe deine Anforderung..."
                  className="mt-2 w-full px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                />
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Wo soll der Bot oder Agent eingebunden werden?',
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            {['Auf meiner Webseite', 'Im WhatsApp Chat', 'Am Telefon (Voice Agent)', 'Instagram / Facebook / Social Media', 'Im E-Mail-Support'].map((option) => (
              <div key={option} className="flex items-center">
                <input
                  type="checkbox"
                  id={`platforms-${option}`}
                  checked={formData.platforms.includes(option)}
                  onChange={() => handleCheckboxChange('platforms', option)}
                  className="h-5 w-5 text-accent-blue rounded border-gray-300 focus:ring-accent-blue transition-colors"
                />
                <label htmlFor={`platforms-${option}`} className="ml-2 text-gray-700">
                  {option}
                </label>
              </div>
            ))}
            
            {/* Other option with text field */}
            <div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="platforms-other"
                  checked={formData.platforms.includes('Andere')}
                  onChange={() => handleCheckboxChange('platforms', 'Andere')}
                  className="h-5 w-5 text-accent-blue rounded border-gray-300 focus:ring-accent-blue transition-colors"
                />
                <label htmlFor="platforms-other" className="ml-2 text-gray-700">
                  Andere
                </label>
              </div>
              
              {formData.platforms.includes('Andere') && (
                <input
                  type="text"
                  name="otherPlatform"
                  value={formData.otherPlatform}
                  onChange={handleInputChange}
                  placeholder="Beschreibe die Plattform..."
                  className="mt-2 w-full px-4 py-2 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                />
              )}
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Wohin dürfen wir deine Demo senden?',
      content: (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                Vorname *
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                Nachname *
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefonnummer mit Ländervorwahl *
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              placeholder="+49 123 4567890"
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
              required
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
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
              required
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
              Unternehmen *
            </label>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleInputChange}
              className="w-full px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:ring-2 focus:ring-accent-blue focus:border-transparent transition-colors"
              required
            />
          </div>
        </div>
      )
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ willChange: 'opacity' }}
        >
          <motion.div
            className="relative bg-white rounded-2xl shadow-xl max-w-md w-full max-h-[80vh] overflow-y-auto"
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            onClick={e => e.stopPropagation()}
            style={{ willChange: 'transform' }}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition-colors z-10"
              onClick={onClose}
              disabled={isSubmitting}
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
            
            {/* Content */}
            <div className="p-6">
              {!submitted ? (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <h2 className="text-xl font-bold bg-gradient-to-r from-[#00dfff] to-[#A855F7] bg-clip-text text-transparent">
                      Starte jetzt – und erhalte deine persönliche KI-Demo in nur 48 Stunden
                    </h2>
                    <p className="text-gray-600 mt-2">
                      Beantworte ein paar kurze Fragen, damit wir dir die beste Demo für deine Bedürfnisse anbieten können.
                    </p>
                  </div>
                  
                  {error && (
                    <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg">
                      {error}
                    </div>
                  )}
                  
                  {/* Progress bar */}
                  <div className="h-1.5 w-full bg-gray-200 rounded-full mb-6">
                    <div 
                      className="h-1.5 bg-gradient-to-r from-[#00dfff] to-[#A855F7] rounded-full"
                      style={{ 
                        width: `${((currentStep + 1) / steps.length) * 100}%`,
                        willChange: 'width'
                      }}
                    />
                  </div>
                  
                  {/* Steps */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-4">
                      {steps[currentStep].title}
                    </h3>
                    {steps[currentStep].content}
                  </div>
                  
                  {/* Navigation buttons */}
                  <div className="flex justify-between mt-8">
                    {currentStep > 0 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                        disabled={isSubmitting}
                      >
                        Zurück
                      </button>
                    ) : (
                      <div></div>
                    )}
                    
                    {currentStep < steps.length - 1 ? (
                      <motion.button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStepValid() || isSubmitting}
                        className="px-6 py-3 bg-gradient-to-r from-[#00dfff] to-[#A855F7] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Weiter
                      </motion.button>
                    ) : (
                      <motion.button
                        type="submit"
                        disabled={!isStepValid() || isSubmitting}
                        className="px-6 py-3 bg-gradient-to-r from-[#00dfff] to-[#A855F7] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        {isSubmitting ? (
                          <>
                            <span>Wird gesendet...</span>
                            <div className="ml-2 h-5 w-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                          </>
                        ) : (
                          <>
                            <span>Absenden</span>
                            <Send className="ml-2 w-4 h-4" />
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                </form>
              ) : (
                <motion.div 
                  className="py-10 text-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h2 className="text-xl font-bold mb-2">Vielen Dank!</h2>
                  <p className="text-gray-600">
                    Wir erstellen deine persönliche Demo und melden uns innerhalb von 48 Stunden bei dir.
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}