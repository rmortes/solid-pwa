import { defineConfig } from "vite";
import solidPlugin from "vite-plugin-solid";
import WindiCSS from "vite-plugin-windicss";
import { VitePWA } from "vite-plugin-pwa";
import replace from "@rollup/plugin-replace";

export default defineConfig({
  plugins: [
    solidPlugin(),
    WindiCSS(),
    VitePWA({
      registerType: process.env.CLAIMS === 'true' ? 'autoUpdate' : undefined,
      includeAssets: ["robots.txt"],
      // workbox: {
      //   globPatterns: [
      //     "**\/*.{js,css,html}",
      //     "manifest.webmanifest",
      //   ],
      // },
      manifest: {
        name: 'Solid app',
        short_name: 'Solid app',
        description: 'Solid app',
        theme_color: '#ffffff',
        // icons: [
        //   {
        //     src: 'pwa-192x192.png',
        //     sizes: '192x192',
        //     type: 'image/png',
        //   },
        //   {
        //     src: 'pwa-512x512.png',
        //     sizes: '512x512',
        //     type: 'image/png',
        //   },
        //   {
        //     src: 'pwa-512x512.png',
        //     sizes: '512x512',
        //     type: 'image/png',
        //     purpose: 'any maskable',
        //   }
        // ]
      }
    }),
    replace({
      __DATE__: new Date().toISOString(),
    }),
  ],
  build: {
    target: "esnext",
    polyfillDynamicImport: false,
  },
});
