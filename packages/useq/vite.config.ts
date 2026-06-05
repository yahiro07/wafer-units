import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  base: "./",
  plugins: [solid(), tailwindcss()],
  resolve: {
    alias: {
      "solid-js/jsx-runtime": "solid-js/h/jsx-runtime",
      "solid-js/jsx-dev-runtime": "solid-js/h/jsx-runtime",
    },
    tsconfigPaths: true,
  },
  build: {
    outDir: `../../dist/useq`,
    emptyOutDir: true,
  },
  server: { port: 3000 },
});
