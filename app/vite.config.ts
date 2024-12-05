import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      strategies: 'generateSW',
      devOptions: {
        enabled: true
      },
     manifest: {
  name: "True Voices",
  short_name: "TV",
  description: "Collect and showcase testimonials effortlessly.",
  start_url: "./",
  display: "standalone",
  background_color: "#f0f0f0", // Light gray background
  theme_color: "#0078D4", // A vibrant blue that complements most logos
  icons: [
    {
      "src": "/assets/pwa-64x64.png",
      "sizes": "64x64",
      "type": "image/png"
    },
    {
      "src": "/assets/pwa-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/pwa-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/assets/maskable-icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
},
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname === '/dashboard/space1/wall-of-love';
            },
            handler: 'CacheFirst', // Cache the entire page
            method: 'GET',
            options: {
              cacheName: 'wall-of-love-page',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24 * 7, // Cache for 7 days
                maxEntries: 1 // Cache only this page
              },
              cacheableResponse: {
                statuses: [0, 200], // Cache successful and opaque responses
              }
            }
    },
          {
            urlPattern: ({ url }) => {
              return url.pathname.includes('assets');
            },
            handler: 'CacheFirst',
            method: 'GET',
            options: {
              cacheName: 'static-assets',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
                maxEntries: 100
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          },
          {
            urlPattern: ({ url }) => {
              return url.pathname.includes('space');
            },
            handler: 'NetworkFirst',
            method: 'GET',
            options: {
              cacheName: 'space-api',
              expiration: {
                maxAgeSeconds: 60 * 60 * 24,
                maxEntries: 100
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  server: {
    port: 3030,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});