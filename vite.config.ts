import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import imagemin from 'vite-plugin-imagemin';
import compression from 'vite-plugin-compression';

export default defineConfig({
  plugins: [
    react({
      // Optimize React refresh
      fastRefresh: true,
    }),
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
    // Optimize dependency scanning
    esbuildOptions: {
      target: 'esnext',
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    minify: 'terser',
    cssMinify: true,
    // Improve chunk size warnings threshold
    chunkSizeWarningLimit: 1200,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
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
        },
        // Optimize chunk naming and asset organization
        assetFileNames: 'assets/[name].[hash].[ext]',
        chunkFileNames: 'chunks/[name].[hash].js',
        entryFileNames: 'entries/[name].[hash].js',
      }
    },
    sourcemap: false,
  },
  server: {
    // Optimize dev server
    hmr: {
      overlay: false, // Disable the HMR overlay to save resources
    },
    // Optimize vite server settings
    fs: {
      strict: true,
    },
    // Improved watch settings
    watch: {
      usePolling: false,
      interval: 1000,
    },
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: false,
  },
  // Add prefetch for better page navigation
  experimental: {
    renderBuiltUrl(filename) {
      if (filename.endsWith('.js')) {
        return { relative: true, prepend: '', attributes: { prefetch: true } };
      }
      return { relative: true };
    }
  },
});