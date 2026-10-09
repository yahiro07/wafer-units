import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import UnoCSS from "unocss/vite";

export default defineConfig({
  base: "./",
  plugins: [solid(), UnoCSS()],
  resolve: { tsconfigPaths: true },
  build: { outDir: "../../../dist/horizon", emptyOutDir: true },
  server: { port: 3000 },
});
