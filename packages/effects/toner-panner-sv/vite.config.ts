import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";

export default defineConfig({
  base: "./",
  plugins: [svelte()],
  // resolve: { tsconfigPaths: true },
  build: { outDir: "../../../dist/toner-panner", emptyOutDir: true },
  server: { port: 3000 },
});
