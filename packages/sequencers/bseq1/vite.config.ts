import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
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
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      formats: ["es"],
      fileName: "index",
    },
    outDir: `../../../dist/bseq1`,
    emptyOutDir: true,
  },
});
