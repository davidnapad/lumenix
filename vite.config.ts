import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import imagemin from 'vite-plugin-imagemin';
import compression from 'vite-plugin-compression';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react({
      // Optimize React refresh
      fastRefresh: true,
      babel: {
        plugins: ['@babel/plugin-transform-react-constant-elements'],
      }
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
    process.env.ANALYZE === 'true' 
      ? visualizer({
          open: true,
          gzipSize: true,
          brotliSize: true,
          template: 'treemap',
        }) 
      : null,
  ].filter(Boolean),
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
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Create more granular chunk splitting
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('framer-motion')) {
              return 'vendor-animations';
            }
            if (id.includes('lucide-react') || id.includes('radix-ui') || 
                id.includes('clsx') || id.includes('class-variance')) {
              return 'vendor-ui';
            }
            if (id.includes('@tsparticles')) {
              return 'vendor-particles';
            }
            return 'vendor';
          }
          // Split code by pages for better code splitting
          if (id.includes('/pages/')) {
            const pageName = id.split('/pages/')[1].split('.')[0].toLowerCase();
            return `page-${pageName}`;
          }
          // Split components by type
          if (id.includes('/components/ui/')) {
            return 'ui-components';
          }
          if (id.includes('/components/')) {
            return 'feature-components';
          }
        },
        // Optimize asset organization
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const extType = info[info.length - 1];
          if (/png|jpe?g|svg|gif|webp/i.test(extType)) {
            return `assets/images/[name].[hash][extname]`;
          }
          if (/woff|woff2|ttf|otf/i.test(extType)) {
            return `assets/fonts/[name].[hash][extname]`;
          }
          return `assets/[name].[hash][extname]`;
        },
        chunkFileNames: 'chunks/[name].[hash].js',
        entryFileNames: 'entries/[name].[hash].js',
      }
    },
    sourcemap: false,
    // Improve CSS extraction
    cssCodeSplit: true,
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
        return { relative: true, prepend: '', attributes: { prefetch: true, defer: true } };
      }
      if (filename.endsWith('.css')) {
        return { relative: true, prepend: '', attributes: { prefetch: true } };
      }
      return { relative: true };
    }
  },
});