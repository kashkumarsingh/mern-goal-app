import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3500,
    proxy: {
      "/api": {
        target: "http://localhost:5000", // The target URL for /api requests
        changeOrigin: true,
      },
    },
  },
});
