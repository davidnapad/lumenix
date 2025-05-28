import { useEffect, useState, useRef, useCallback } from 'react';

declare global {
  interface Window {
    chatbaseConfig: {
      chatbotId: string;
      locale: string;
    };
    VG_CONFIG: {
      ID: string;
      region: 'eu' | 'na';
      render: string;
      modalMode?: boolean;
      stylesheets: string[];
      user?: {
        name?: string;
        email?: string;
        phone?: string;
      };
      userID?: string;
      autostart?: boolean;
    };
  }
}

export default function ChatWidget() {
  const [error, setError] = useState<string | null>(null);
  const scriptLoaded = useRef(false);
  const loadAttempted = useRef(false);
  const isVisible = useRef(false);
  
  // To get your Chatbase chatbot ID:
  // 1. Sign up or log in at https://www.chatbase.co/
  // 2. Create a new chatbot or use an existing one
  // 3. In your chatbot settings, find the chatbot ID
  // 4. Replace the string below with your actual ID
  const CHATBOT_ID = "cfb9c3d5-3df7-4398-a5b0-3ef95175b835"; // Example ID - replace with your actual ID

  // Improved loading strategy with proper cleanup
  const loadChatWidget = useCallback(() => {
    if (scriptLoaded.current || loadAttempted.current) return;
    loadAttempted.current = true;
    
    // Check if chatbot ID is properly configured
    if (CHATBOT_ID === "YOUR_ACTUAL_CHATBOT_ID") {
      console.warn("Please replace the placeholder with your actual Chatbase chatbot ID");
      setError("Chat widget not configured. Please set your Chatbase chatbot ID.");
      return;
    }
    
    // Only load when user has scrolled down a bit or after a delay
    if (!isVisible.current && window.scrollY < 100) {
      // Don't load yet, wait for scroll or timer
      return;
    }
    
    // Configure Chatbase
    window.chatbaseConfig = {
      chatbotId: CHATBOT_ID,
      locale: "de"
    };

    // Load Chatbase script
    const script = document.createElement('script');
    script.src = "https://www.chatbase.co/embed.min.js";
    script.setAttribute('chatbotId', CHATBOT_ID);
    script.defer = true;
    script.async = true; // Make it async for better performance
    
    // Handle script load error
    script.onerror = () => {
      setError('Failed to load chat widget');
      console.error('Failed to load Chatbase script');
      scriptLoaded.current = false;
    };

    document.body.appendChild(script);
    scriptLoaded.current = true;
  }, [CHATBOT_ID]);

  useEffect(() => {
    // Use Intersection Observer to detect when user scrolls down
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          isVisible.current = true;
          loadChatWidget();
        }
      },
      {
        rootMargin: '0px 0px 200px 0px', // Load when user approaches footer
        threshold: 0
      }
    );
    
    // Observe a marker element near the bottom of the first viewport
    const marker = document.createElement('div');
    marker.style.height = '1px';
    marker.style.position = 'absolute';
    marker.style.top = '90vh';
    marker.style.left = '0';
    marker.style.width = '100%';
    marker.style.pointerEvents = 'none';
    marker.style.opacity = '0';
    document.body.appendChild(marker);
    
    observer.observe(marker);
    
    // Handle scroll event as fallback
    const handleScroll = () => {
      if (window.scrollY > 100 && !loadAttempted.current) {
        isVisible.current = true;
        loadChatWidget();
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Fallback: Load after a delay regardless of scroll
    const timer = setTimeout(() => {
      isVisible.current = true;
      loadChatWidget();
    }, 5000);
    
    return () => {
      observer.disconnect();
      document.body.removeChild(marker);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
      if (scriptLoaded.current) {
        const script = document.querySelector('script[src="https://www.chatbase.co/embed.min.js"]');
        if (script && document.body.contains(script)) {
          document.body.removeChild(script);
        }
      }
    };
  }, [loadChatWidget]);

  if (error) {
    console.error('Chat widget error:', error);
    // Display a fallback message instead of silently failing
    return (
      <div className="fixed bottom-4 right-4 bg-white p-3 rounded-md shadow-lg z-50">
        <p className="text-sm text-gray-700">
          Chat is currently unavailable. 
          {CHATBOT_ID === "YOUR_ACTUAL_CHATBOT_ID" ? 
            " Please configure your chatbot." : 
            " Please try again later."}
        </p>
      </div>
    );
  }

  return null;
}