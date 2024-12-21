import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig(({ mode }) => {
  const isTest = mode === "test";

  return {
    plugins: [
      react(),
      tsconfigPaths(), // Enables TypeScript path aliases
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "/src"), // Adjust path alias
      },
    },
    ...(isTest && {
      test: {
        environment: "jsdom", // Use jsdom for tests
        globals: true, // Enables `describe`, `it`, and `expect` globally
        setupFiles: "./vitest.setup.ts", // Setup file for tests
      },
    }),
  };
});
