import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  base: "./",
  plugins: [preact(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  build: {
    outDir: `../../../dist/tone-wheel`,
    emptyOutDir: true,
  },
  server: { port: 3000 },
});
