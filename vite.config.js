import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "72.167.54.115",
    port: 3000,
  },
  preview: {
    host: "72.167.54.115",
    port: 4000,
  },
});
