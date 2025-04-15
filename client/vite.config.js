import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig({
  server: {
    host: true,
  },
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@features": path.resolve(__dirname, "src/features"),
      "@hooks": path.resolve(__dirname, "src/hooks"),
      "@routes": path.resolve(__dirname, "src/Routes"),
      "@styles": path.resolve(__dirname, "src/styles"),
      "@utils": path.resolve(__dirname, "src/utils"),
      "@assets": path.resolve(__dirname, "src/assets"),
      "@context": path.resolve(__dirname, "src/context"),
      "@pages": path.resolve(__dirname, "src/pages"),
      "@config": path.resolve(__dirname, "src/config"),
      "@services": path.resolve(__dirname, "src/services"),
      "@lib": path.resolve(__dirname, "src/lib"),
    },
  },
});
