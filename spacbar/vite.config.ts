import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  build: {
    outDir: "../dist/specbar",
    emptyOutDir: true,
  },
  server: { port: 3000 },
});
