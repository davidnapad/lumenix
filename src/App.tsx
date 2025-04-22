import React, { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/ui/Header';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

// Lazy loaded components with dynamic imports
const HomePage = lazy(() => import('./pages/HomePage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const ImpressumPage = lazy(() => import('./pages/ImpressumPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const CalendarPage = lazy(() => import('./pages/CalendarPage'));

// Loading fallback
const PageLoader = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-t-transparent border-accent-blue rounded-full animate-spin"></div>
  </div>
);

// ScrollToTop component for router navigation
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-900">
        <ScrollToTop />
        <ChatWidget />
        <Header />
        
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/kontakt" element={<ContactPage />} />
            <Route path="/impressum" element={<ImpressumPage />} />
            <Route path="/datenschutz" element={<PrivacyPage />} />
            <Route path="/kalender" element={<CalendarPage />} />
          </Routes>
        </Suspense>

        <Footer />
      </div>
    </Router>
  );
}

export default App;