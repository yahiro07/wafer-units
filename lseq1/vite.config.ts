import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  build: {
    outDir: `/Users/ore/wus-my-units/lseq1`,
    emptyOutDir: true,
  },
  server: { port: 3000 },
});
