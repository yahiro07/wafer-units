import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig({
  base: "./",
  plugins: [preact(), tailwindcss()],
  resolve: { tsconfigPaths: true, dedupe: ["preact"] },
  optimizeDeps: {
    exclude: ["wafer-host", "mofur", "snap-store"],
  },
  build: { outDir: "../../dist/multi-lfo", emptyOutDir: true },
  server: { port: 3000 },
});
