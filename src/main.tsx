import { StrictMode, lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

// Use dynamic import for the main App component
const App = lazy(() => import('./App.tsx'));

// Loader component for Suspense fallback
const Loader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-t-transparent border-accent-blue rounded-full animate-spin"></div>
  </div>
);

// Create container for hydration
const container = document.getElementById('root')!;
const root = createRoot(container);

// Optional performance measuring
const inDevMode = import.meta.env.DEV;
if (inDevMode) {
  const startTime = performance.now();
  
  // Render app with Suspense
  root.render(
    <StrictMode>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </StrictMode>
  );
  
  // Log performance metrics in development
  window.addEventListener('load', () => {
    const loadTime = performance.now() - startTime;
    console.log(`Initial render: ${loadTime.toFixed(2)}ms`);
    
    // Log FCP and LCP if available
    if ('performance' in window && 'getEntriesByType' in performance) {
      const paintMetrics = performance.getEntriesByType('paint');
      const fcpEntry = paintMetrics.find(entry => entry.name === 'first-contentful-paint');
      if (fcpEntry) {
        console.log(`FCP: ${fcpEntry.startTime.toFixed(2)}ms`);
      }
    }
  });
} else {
  // Production render with Suspense but without metrics
  root.render(
    <StrictMode>
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    </StrictMode>
  );
}

// Service Worker registration removed as it's not supported in StackBlitz
// See: https://github.com/stackblitz/webcontainer-core/issues/846