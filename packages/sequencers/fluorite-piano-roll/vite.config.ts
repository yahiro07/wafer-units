import preact from "@preact/preset-vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [preact()],
  resolve: {
    tsconfigPaths: true,
    dedupe: ["preact"],
    alias: [
      //import workaround for @preact-icons/fa
      { find: /^npm:preact@\^?[\d.]+$/, replacement: "preact" },
      {
        find: /^npm:preact@\^?[\d.]+\/jsx-runtime$/,
        replacement: "preact/jsx-runtime",
      },
    ],
  },
  optimizeDeps: {
    exclude: ["wafer-host", "snap-store"],
  },
  build: { outDir: "../../../dist/fluorite-piano-roll", emptyOutDir: true },
  server: { port: 3000 },
});
