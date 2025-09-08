import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: [
        "favicon.svg",
        "favicon-dark.svg",
        "apple-*.png",
        "manifest-*.png",
      ],
      manifest: {
        name: "sphere",
        short_name: "Sphere",
        description: "A social media app designed with ❤",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait-primary",
        scope: "/",
        start_url: "/",
        id: "/",
        icons: [
          {
            src: "/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/manifest-icon-192.maskable.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/manifest-icon-512.maskable.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
          { src: "/apple-icon-180.png", sizes: "180x180", type: "image/png" },
        ],

        // screenshots: [
        //   {
        //     src: "screenshot-desktop.png",
        //     sizes: "1280x800",
        //     type: "image/png",
        //     form_factor: "wide",
        //     label: "SPHERE Desktop Experience",
        //   },
        //   {
        //     src: "screenshot-mobile.png",
        //     sizes: "390x844",
        //     type: "image/png",
        //     form_factor: "narrow",
        //     label: "SPHERE Mobile Experience",
        //   },
        // ],
        categories: [
          "social",
          "productivity",
          "entertainment",
          "connect",
          "share",
          "discover",
        ],
        shortcuts: [
          {
            name: "Feed",
            short_name: "Feed",
            description: "View your social feed",
            url: "/feeds",
            icons: [{ src: "/favicon.svg", sizes: "192x192" }],
          },
          {
            name: "Create Post",
            short_name: "Create Post",
            description: "Create a new post",
            url: "/create-post",
            icons: [{ src: "/favicon.svg", sizes: "192x192" }],
          },
          {
            name: "Profile",
            short_name: "Profile",
            description: "View and edit your profile",
            url: "/profile/me",
            icons: [{ src: "/favicon.svg", sizes: "192x192" }],
          },
          {
            name: "Saved Posts",
            short_name: "Saved Posts",
            description: "View your saved posts",
            url: "/saved",
            icons: [{ src: "/favicon.svg", sizes: "192x192" }],
          },
          {
            name: "Explore",
            short_name: "Explore",
            description: "Discover new content",
            url: "/explore",
            icons: [{ src: "/favicon.svg", sizes: "192x192" }],
          },
        ],
      },
      workbox: {
        // globPatterns: ["**/*.{js,css,html,ico,png,svg,webp,woff,woff2}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "google-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: "CacheFirst",
            options: {
              cacheName: "gstatic-fonts-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
          {
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
            handler: "CacheFirst",
            options: {
              cacheName: "images-cache",
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 30,
              },
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        type: "module",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@features": path.resolve(__dirname, "src/features"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@layouts": path.resolve(__dirname, "src/layouts"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@context": path.resolve(__dirname, "src/context"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@config": path.resolve(__dirname, "src/config"),
      "@services": path.resolve(__dirname, "src/services"),
      "@shared": path.resolve(__dirname, "src/shared"),
      "@lib": path.resolve(__dirname, "src/lib"),
    },
  },
});
