import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [preact()],
  resolve: { tsconfigPaths: true },
  build: { outDir: "../../../dist/parameters-editor", emptyOutDir: true },
  server: { port: 3000 },
});
