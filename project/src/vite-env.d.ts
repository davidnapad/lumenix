/// <reference types="vite/client" />

interface Window {
  VG_CONFIG: {
    ID: string;
    region: 'eu' | 'na';
    render: 'popup' | 'full-width';
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