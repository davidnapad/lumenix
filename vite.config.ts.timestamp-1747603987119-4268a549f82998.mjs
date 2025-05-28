// vite.config.ts
import { defineConfig } from "file:///home/project/node_modules/vite/dist/node/index.js";
import react from "file:///home/project/node_modules/@vitejs/plugin-react/dist/index.mjs";
import path from "path";
import imagemin from "file:///home/project/node_modules/vite-plugin-imagemin/dist/index.mjs";
import compression from "file:///home/project/node_modules/vite-plugin-compression/dist/index.mjs";
var __vite_injected_original_dirname = "/home/project";
var vite_config_default = defineConfig({
  plugins: [
    react({
      // Optimize React refresh
      fastRefresh: true
    }),
    imagemin({
      gifsicle: {
        optimizationLevel: 7,
        interlaced: false
      },
      optipng: {
        optimizationLevel: 7
      },
      mozjpeg: {
        quality: 65
      },
      pngquant: {
        quality: [0.7, 0.8],
        speed: 4
      },
      webp: {
        quality: 70
      },
      svgo: {
        plugins: [
          {
            name: "removeViewBox"
          },
          {
            name: "removeEmptyAttrs",
            active: false
          }
        ]
      }
    }),
    compression({
      algorithm: "gzip",
      ext: ".gz"
    }),
    compression({
      algorithm: "brotliCompress",
      ext: ".br"
    })
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
    include: ["react", "react-dom", "react-router-dom", "framer-motion"],
    // Optimize dependency scanning
    esbuildOptions: {
      target: "esnext"
    }
  },
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  },
  build: {
    minify: "terser",
    cssMinify: true,
    // Improve chunk size warnings threshold
    chunkSizeWarningLimit: 1200,
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"]
      }
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["react", "react-dom", "react-router-dom"],
          animations: ["framer-motion"],
          ui: ["lucide-react", "@radix-ui/react-slot", "clsx", "class-variance-authority", "tailwind-merge"],
          // Split chunks by page to improve initial load time
          "page-home": ["./src/pages/HomePage.tsx"],
          "page-contact": ["./src/pages/ContactPage.tsx"],
          "page-calendar": ["./src/pages/CalendarPage.tsx"],
          "page-impressum": ["./src/pages/ImpressumPage.tsx"],
          "page-privacy": ["./src/pages/PrivacyPage.tsx"]
        },
        // Optimize chunk naming and asset organization
        assetFileNames: "assets/[name].[hash].[ext]",
        chunkFileNames: "chunks/[name].[hash].js",
        entryFileNames: "entries/[name].[hash].js"
      }
    },
    sourcemap: false
  },
  server: {
    // Optimize dev server
    hmr: {
      overlay: false
      // Disable the HMR overlay to save resources
    },
    // Optimize vite server settings
    fs: {
      strict: true
    },
    // Improved watch settings
    watch: {
      usePolling: false,
      interval: 1e3
    }
  },
  // Enable CSS code splitting
  css: {
    devSourcemap: false
  },
  // Add prefetch for better page navigation
  experimental: {
    renderBuiltUrl(filename) {
      if (filename.endsWith(".js")) {
        return { relative: true, prepend: "", attributes: { prefetch: true } };
      }
      return { relative: true };
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9wcm9qZWN0XCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9wcm9qZWN0L3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3Byb2plY3Qvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCByZWFjdCBmcm9tICdAdml0ZWpzL3BsdWdpbi1yZWFjdCc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBpbWFnZW1pbiBmcm9tICd2aXRlLXBsdWdpbi1pbWFnZW1pbic7XG5pbXBvcnQgY29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVhY3Qoe1xuICAgICAgLy8gT3B0aW1pemUgUmVhY3QgcmVmcmVzaFxuICAgICAgZmFzdFJlZnJlc2g6IHRydWUsXG4gICAgfSksXG4gICAgaW1hZ2VtaW4oe1xuICAgICAgZ2lmc2ljbGU6IHtcbiAgICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDcsXG4gICAgICAgIGludGVybGFjZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIG9wdGlwbmc6IHtcbiAgICAgICAgb3B0aW1pemF0aW9uTGV2ZWw6IDcsXG4gICAgICB9LFxuICAgICAgbW96anBlZzoge1xuICAgICAgICBxdWFsaXR5OiA2NSxcbiAgICAgIH0sXG4gICAgICBwbmdxdWFudDoge1xuICAgICAgICBxdWFsaXR5OiBbMC43LCAwLjhdLFxuICAgICAgICBzcGVlZDogNCxcbiAgICAgIH0sXG4gICAgICB3ZWJwOiB7XG4gICAgICAgIHF1YWxpdHk6IDcwLFxuICAgICAgfSxcbiAgICAgIHN2Z286IHtcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdyZW1vdmVWaWV3Qm94JyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdyZW1vdmVFbXB0eUF0dHJzJyxcbiAgICAgICAgICAgIGFjdGl2ZTogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSksXG4gICAgY29tcHJlc3Npb24oe1xuICAgICAgYWxnb3JpdGhtOiAnZ3ppcCcsXG4gICAgICBleHQ6ICcuZ3onLFxuICAgIH0pLFxuICAgIGNvbXByZXNzaW9uKHtcbiAgICAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJyxcbiAgICAgIGV4dDogJy5icicsXG4gICAgfSksXG4gIF0sXG4gIG9wdGltaXplRGVwczoge1xuICAgIGV4Y2x1ZGU6IFsnbHVjaWRlLXJlYWN0J10sXG4gICAgaW5jbHVkZTogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbScsICdmcmFtZXItbW90aW9uJ10sXG4gICAgLy8gT3B0aW1pemUgZGVwZW5kZW5jeSBzY2FubmluZ1xuICAgIGVzYnVpbGRPcHRpb25zOiB7XG4gICAgICB0YXJnZXQ6ICdlc25leHQnLFxuICAgIH0sXG4gIH0sXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgY3NzTWluaWZ5OiB0cnVlLFxuICAgIC8vIEltcHJvdmUgY2h1bmsgc2l6ZSB3YXJuaW5ncyB0aHJlc2hvbGRcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEyMDAsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLFxuICAgICAgICBkcm9wX2RlYnVnZ2VyOiB0cnVlLFxuICAgICAgICBwdXJlX2Z1bmNzOiBbJ2NvbnNvbGUubG9nJywgJ2NvbnNvbGUuaW5mbycsICdjb25zb2xlLmRlYnVnJ10sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczoge1xuICAgICAgICAgIHZlbmRvcjogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxuICAgICAgICAgIGFuaW1hdGlvbnM6IFsnZnJhbWVyLW1vdGlvbiddLFxuICAgICAgICAgIHVpOiBbJ2x1Y2lkZS1yZWFjdCcsICdAcmFkaXgtdWkvcmVhY3Qtc2xvdCcsICdjbHN4JywgJ2NsYXNzLXZhcmlhbmNlLWF1dGhvcml0eScsICd0YWlsd2luZC1tZXJnZSddLFxuICAgICAgICAgIC8vIFNwbGl0IGNodW5rcyBieSBwYWdlIHRvIGltcHJvdmUgaW5pdGlhbCBsb2FkIHRpbWVcbiAgICAgICAgICAncGFnZS1ob21lJzogWycuL3NyYy9wYWdlcy9Ib21lUGFnZS50c3gnXSxcbiAgICAgICAgICAncGFnZS1jb250YWN0JzogWycuL3NyYy9wYWdlcy9Db250YWN0UGFnZS50c3gnXSxcbiAgICAgICAgICAncGFnZS1jYWxlbmRhcic6IFsnLi9zcmMvcGFnZXMvQ2FsZW5kYXJQYWdlLnRzeCddLFxuICAgICAgICAgICdwYWdlLWltcHJlc3N1bSc6IFsnLi9zcmMvcGFnZXMvSW1wcmVzc3VtUGFnZS50c3gnXSxcbiAgICAgICAgICAncGFnZS1wcml2YWN5JzogWycuL3NyYy9wYWdlcy9Qcml2YWN5UGFnZS50c3gnXSxcbiAgICAgICAgfSxcbiAgICAgICAgLy8gT3B0aW1pemUgY2h1bmsgbmFtaW5nIGFuZCBhc3NldCBvcmdhbml6YXRpb25cbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvW25hbWVdLltoYXNoXS5bZXh0XScsXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnY2h1bmtzL1tuYW1lXS5baGFzaF0uanMnLFxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2VudHJpZXMvW25hbWVdLltoYXNoXS5qcycsXG4gICAgICB9XG4gICAgfSxcbiAgICBzb3VyY2VtYXA6IGZhbHNlLFxuICB9LFxuICBzZXJ2ZXI6IHtcbiAgICAvLyBPcHRpbWl6ZSBkZXYgc2VydmVyXG4gICAgaG1yOiB7XG4gICAgICBvdmVybGF5OiBmYWxzZSwgLy8gRGlzYWJsZSB0aGUgSE1SIG92ZXJsYXkgdG8gc2F2ZSByZXNvdXJjZXNcbiAgICB9LFxuICAgIC8vIE9wdGltaXplIHZpdGUgc2VydmVyIHNldHRpbmdzXG4gICAgZnM6IHtcbiAgICAgIHN0cmljdDogdHJ1ZSxcbiAgICB9LFxuICAgIC8vIEltcHJvdmVkIHdhdGNoIHNldHRpbmdzXG4gICAgd2F0Y2g6IHtcbiAgICAgIHVzZVBvbGxpbmc6IGZhbHNlLFxuICAgICAgaW50ZXJ2YWw6IDEwMDAsXG4gICAgfSxcbiAgfSxcbiAgLy8gRW5hYmxlIENTUyBjb2RlIHNwbGl0dGluZ1xuICBjc3M6IHtcbiAgICBkZXZTb3VyY2VtYXA6IGZhbHNlLFxuICB9LFxuICAvLyBBZGQgcHJlZmV0Y2ggZm9yIGJldHRlciBwYWdlIG5hdmlnYXRpb25cbiAgZXhwZXJpbWVudGFsOiB7XG4gICAgcmVuZGVyQnVpbHRVcmwoZmlsZW5hbWUpIHtcbiAgICAgIGlmIChmaWxlbmFtZS5lbmRzV2l0aCgnLmpzJykpIHtcbiAgICAgICAgcmV0dXJuIHsgcmVsYXRpdmU6IHRydWUsIHByZXBlbmQ6ICcnLCBhdHRyaWJ1dGVzOiB7IHByZWZldGNoOiB0cnVlIH0gfTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7IHJlbGF0aXZlOiB0cnVlIH07XG4gICAgfVxuICB9LFxufSk7Il0sCiAgIm1hcHBpbmdzIjogIjtBQUF5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
