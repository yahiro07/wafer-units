import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import UnoCSS from "unocss/vite";

export default defineConfig({
  base: "./",
  plugins: [svelte(), UnoCSS()],
  build: { outDir: "../../../dist/toner-panner", emptyOutDir: true },
  server: { port: 3000 },
});
