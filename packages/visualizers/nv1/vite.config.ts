import { defineConfig } from "vite";
import solid from "vite-plugin-solid";
import UnoCSS from "unocss/vite";
import { macaronVitePlugin } from "@macaron-css/vite";

export default defineConfig({
  base: "./",
  plugins: [macaronVitePlugin(), solid(), UnoCSS()],
  resolve: { tsconfigPaths: true },
  build: { outDir: "../../../dist/nv1", emptyOutDir: true },
  server: { port: 3000 },
});
