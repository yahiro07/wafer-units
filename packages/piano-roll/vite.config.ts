import { resolve } from "node:path";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

const preactPaths = {
  compat: resolve("./node_modules/preact/compat/dist/compat.mjs"),
  jsxRuntime: resolve("./node_modules/preact/compat/jsx-runtime.mjs"),
  client: resolve("./node_modules/preact/compat/client.mjs"),
};

export default defineConfig(({ mode }) => ({
  base: "./",
  define: { "process.env.NODE_ENV": JSON.stringify("production") },
  plugins: [preact({ reactAliasesEnabled: false }), tailwindcss()],
  resolve: {
    tsconfigPaths: true,
    alias: [
      { find: "react/jsx-runtime", replacement: preactPaths.jsxRuntime },
      { find: "react-dom/test-utils", replacement: preactPaths.compat },
      { find: "react-dom/client", replacement: preactPaths.client },
      { find: "react-dom", replacement: preactPaths.compat },
      { find: "react", replacement: preactPaths.compat },
    ],
  },
  optimizeDeps: {
    exclude: ["wus-unit-types", "mofur", "mofur-components"],
  },
  server: {
    port: 3000,
  },
  build:
    mode === "production"
      ? {
          lib: {
            entry: "./src/index.tsx",
            formats: ["es"],
            fileName: "index",
          },
          outDir: "../../dist/piano-roll",
          emptyOutDir: true,
        }
      : undefined,
}));
