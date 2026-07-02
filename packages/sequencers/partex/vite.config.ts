import { resolve } from "node:path";
import preact from "@preact/preset-vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, UserConfig } from "vite";

const preactPaths = {
  compat: resolve("./node_modules/preact/compat/dist/compat.mjs"),
  jsxDevRuntime: resolve("./node_modules/preact/compat/jsx-dev-runtime.mjs"),
  jsxRuntime: resolve("./node_modules/preact/compat/jsx-runtime.mjs"),
  client: resolve("./node_modules/preact/compat/client.mjs"),
};

const configCommon: UserConfig = {
  base: "./",
  plugins: [
    preact({ reactAliasesEnabled: false, jsxImportSource: "@emotion/react" }),
    tailwindcss(),
  ],
  resolve: {
    tsconfigPaths: true,
    alias: [
      { find: "react/jsx-dev-runtime", replacement: preactPaths.jsxDevRuntime },
      { find: "react/jsx-runtime", replacement: preactPaths.jsxRuntime },
      { find: "react-dom/test-utils", replacement: preactPaths.compat },
      { find: "react-dom/client", replacement: preactPaths.client },
      { find: "react-dom", replacement: preactPaths.compat },
      { find: "react", replacement: preactPaths.compat },
    ],
  },
  optimizeDeps: {
    exclude: ["wafer-host", "mofur", "snap-store"],
  },
};

const configDev: UserConfig = {
  ...configCommon,
  server: { port: 3000 },
};

const configProd: UserConfig = {
  ...configCommon,
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: "./src/wc-entry/index.tsx",
      formats: ["es"],
      fileName: "index",
    },
    outDir: "../../dist/partex",
    emptyOutDir: true,
  },
};

export default defineConfig(({ mode }) =>
  mode === "production" ? configProd : configDev,
);
