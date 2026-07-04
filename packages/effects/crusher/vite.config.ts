import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [preact(), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
    dedupe: ["preact"],
  },
  optimizeDeps: {
    exclude: ["wafer-host", "snap-store"],
  },
  build: { outDir: "../../../dist/crusher", emptyOutDir: true },
  server: { port: 3000 },
});
