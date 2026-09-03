import preact from "@preact/preset-vite";
import { defineConfig } from "vite";
import UnoCSS from "unocss/vite";

export default defineConfig({
  base: "./",
  plugins: [preact(), UnoCSS()],
  resolve: { tsconfigPaths: true },
  build: {
    outDir: "../../../dist/luna",
    emptyOutDir: true,
  },
  server: { port: 3000 },
});
