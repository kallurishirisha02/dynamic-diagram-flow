import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  base: "./", // ✅ THIS LINE IS THE FIX
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip",
      threshold: 1024,
    }),
  ],
});
