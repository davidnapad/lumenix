import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ArrowRight, Phone, MessageSquare, Settings, Clock, TrendingUp, Smile, RefreshCw } from 'lucide-react';
import CalendlyBooking from './components/CalendlyBooking';
import Footer from './components/Footer';
import { AuroraBackground } from './components/ui/aurora-background';
import { GradientIcon } from './components/ui/GradientIcon';
import { motion } from 'framer-motion';
import ChatWidget from './components/ChatWidget';
import ChatbotDemo from './components/ChatbotDemo';
import TeamSection from './components/TeamSection';
import Header from './components/ui/Header';
import CurvedTimeline from './components/sections/CurvedTimeline';
import { Accordion } from './components/ui/Accordion';
import HomePage from './pages/HomePage';
import ContactPage from './pages/ContactPage';
import ImpressumPage from './pages/ImpressumPage';
import PrivacyPage from './pages/PrivacyPage';
import CalendarPage from './pages/CalendarPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900">
        <ChatWidget />
        <Header />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/kontakt" element={<ContactPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/datenschutz" element={<PrivacyPage />} />
          <Route path="/kalender" element={<CalendarPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;