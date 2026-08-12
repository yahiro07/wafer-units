import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  base: "./",
  plugins: [preact()],
  resolve: { tsconfigPaths: true },
  build: {
    outDir: `../../../dist/drum-fill-machine`,
    emptyOutDir: true,
  },
  server: { port: 3000 },
});
