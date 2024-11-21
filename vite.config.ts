import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import pluginPurgeCss from "vite-plugin-purgecss-updated-v5";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pluginPurgeCss()],
});
