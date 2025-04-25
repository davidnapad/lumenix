import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create container for hydration
const container = document.getElementById('root')!;
const root = createRoot(container);

// Optional performance measuring
const inDevMode = import.meta.env.DEV;
if (inDevMode) {
  const startTime = performance.now();
  
  // Render app
  root.render(
    <StrictMode>
      <App />
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
  // Production render without metrics
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}