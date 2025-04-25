import { useEffect, useState, useRef } from 'react';

declare global {
  interface Window {
    chatbaseConfig: {
      chatbotId: string;
      locale: string;
    };
  }
}

export default function ChatWidget() {
  const [error, setError] = useState<string | null>(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    // Don't load the chat widget right away, wait for the page to fully load first
    const loadChatWidget = () => {
      if (scriptLoaded.current) return;
      
      // Configure Chatbase
      window.chatbaseConfig = {
        chatbotId: "dein-bot-id", // Replace with your actual chatbot ID
        locale: "de"
      };

      // Load Chatbase script
      const script = document.createElement('script');
      script.src = "https://www.chatbase.co/embed.min.js";
      script.setAttribute('chatbotId', 'dein-bot-id'); // Replace with your actual chatbot ID
      script.defer = true;
      script.async = true; // Make it async for better performance
      
      // Handle script load error
      script.onerror = () => {
        setError('Failed to load chat widget');
        console.error('Failed to load Chatbase script');
      };

      document.body.appendChild(script);
      scriptLoaded.current = true;
    };

    // Prioritize main page loading by delaying chat widget
    // Use requestIdleCallback if available for better performance
    if (window.requestIdleCallback) {
      window.requestIdleCallback(() => {
        setTimeout(loadChatWidget, 5000);
      }, { timeout: 10000 });
    } else {
      // Fallback to setTimeout
      const timer = setTimeout(loadChatWidget, 7000);
      return () => clearTimeout(timer);
    }

    return () => {
      if (scriptLoaded.current) {
        const script = document.querySelector('script[src="https://www.chatbase.co/embed.min.js"]');
        if (script && document.body.contains(script)) {
          document.body.removeChild(script);
        }
      }
    };
  }, []);

  if (error) {
    console.error('Chat widget error:', error);
    return null; // Silently fail instead of showing broken widget
  }

  return null;
}