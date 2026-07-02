import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  plugins: [preact(), tailwindcss()],
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
      "react/jsx-runtime": "preact/jsx-runtime",
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      formats: ["es"],
      fileName: "index",
    },
    outDir: "../../../dist/chord-caster",
    emptyOutDir: true,
  },
});
