import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

// ✅ Production-ready config
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip",
      threshold: 1024, // compress files >1 KB
    }),
  ],
});
