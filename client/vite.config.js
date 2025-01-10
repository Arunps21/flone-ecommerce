import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: { port: 5173 },
  resolve: {
    alias: {
      // This will map `@` to the `src` directory
      '@': path.resolve(__dirname, 'src'),
    },
  },
});
