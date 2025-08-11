import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "https://www.admin.deliverlydashboard.com",
  },
  preview: {
    host: "https://www.admin.deliverlydashboard.com",
  },
});
