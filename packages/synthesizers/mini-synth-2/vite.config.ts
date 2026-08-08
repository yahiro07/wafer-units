import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    tsconfigPaths: true,
  },
  server: { port: 3000 },
});
