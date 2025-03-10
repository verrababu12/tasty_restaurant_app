import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./", // Fixes routing issue
  build: {
    outDir: "dist",
  },
  server: {
    historyApiFallback: true,
  },
});
