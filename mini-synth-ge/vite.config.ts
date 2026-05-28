import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import solid from "vite-plugin-solid";

export default defineConfig({
  base: "./",
  plugins: [solid(), tailwindcss()],
  resolve: { tsconfigPaths: true },
  build: {
    outDir: `/Users/ore/wus-my-units/mini-synth-ge`,
    emptyOutDir: true,
  },
  server: { port: 3000 },
});
