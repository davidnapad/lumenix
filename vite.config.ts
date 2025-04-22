import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import imagemin from 'vite-plugin-imagemin';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react(),
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false,
      },
      optipng: {
        optimizationLevel: 7,
      },
      mozjpeg: {
        quality: 65,
      },
      pngquant: {
        quality: [0.7, 0.8],
        speed: 4,
      },
      webp: {
        quality: 70,
      },
      svgo: {
        plugins: [
          {
            name: 'removeViewBox',
          },
          {
            name: 'removeEmptyAttrs',
            active: false,
          },
        ],
      },
    }),
    compression({
      algorithm: 'gzip',
      ext: '.gz',
    }),
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
    }),
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'terser',
    cssMinify: true,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
          ui: ['lucide-react', '@radix-ui/react-slot', 'clsx', 'class-variance-authority', 'tailwind-merge'],
          // Split chunks by page to improve initial load time
          'page-home': ['./src/pages/HomePage.tsx'],
          'page-contact': ['./src/pages/ContactPage.tsx'],
          'page-calendar': ['./src/pages/CalendarPage.tsx'],
          'page-impressum': ['./src/pages/ImpressumPage.tsx'],
          'page-privacy': ['./src/pages/PrivacyPage.tsx'],
        }
      }
    },
    sourcemap: false,
    chunkSizeWarningLimit: 1000,
  },
  server: {
    // Optimize dev server
    hmr: {
      overlay: false, // Disable the HMR overlay to save resources
    },
  }
});