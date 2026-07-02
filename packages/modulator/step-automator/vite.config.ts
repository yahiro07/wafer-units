import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [preact(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
    dedupe: ["preact"],
    alias: [
      {
        find: /^npm:preact@\^?[\d.]+$/,
        replacement: "preact",
      },
      {
        find: /^npm:preact@\^?[\d.]+\/jsx-runtime$/,
        replacement: "preact/jsx-runtime",
      },
    ],
  },
  optimizeDeps: {
    exclude: ["wafer-host", "mofur", "snap-store"],
  },
  build: { outDir: "../../../dist/step-automator", emptyOutDir: true },
  server: { port: 3000 },
});
