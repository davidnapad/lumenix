import { useEffect, useState } from 'react';

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

  useEffect(() => {
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
    
    // Handle script load error
    script.onerror = () => {
      setError('Failed to load chat widget');
      console.error('Failed to load Chatbase script');
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  if (error) {
    console.error('Chat widget error:', error);
    return null; // Silently fail instead of showing broken widget
  }

  return null;
}