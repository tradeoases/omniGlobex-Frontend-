import path from "path";
import { defineConfig } from "vite";
import svgr from "vite-plugin-svgr";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv"
dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  build: {
    assetsDir: "assets",
  },
  define: {
    "process.env.VITE_API_URL":JSON.stringify(process.env.VITE_API_URL)
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
