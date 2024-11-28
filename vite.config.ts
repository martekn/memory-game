import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginPurgeCss from "vite-plugin-purgecss-updated-v5";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src/"),
      "@components": path.resolve(__dirname, "./src/components/"),
      "@assets": path.resolve(__dirname, "./src/assets/"),
      "@hooks": path.resolve(__dirname, "./src/hooks/"),
      "@provider": path.resolve(__dirname, "./src/provider/"),
      "@context": path.resolve(__dirname, "./src/context/"),
      "@utils": path.resolve(__dirname, "./src/utils/"),
      "@sass": path.resolve(__dirname, "./src/sass/"),
    },
  },
  plugins: [react(), pluginPurgeCss()],
});
