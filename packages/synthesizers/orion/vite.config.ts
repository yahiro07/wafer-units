import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  base: "./",
  plugins: [preact()],
  resolve: { tsconfigPaths: true },
  build: {
    outDir: `../../../dist/orion`,
    emptyOutDir: true,
  },
  server: { port: 3000 },
});
