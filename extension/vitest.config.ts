import { defineConfig } from "vitest/config";
import { WxtVitest } from "wxt/testing/vitest-plugin";
import tsconfigPaths from "vite-tsconfig-paths";
import { fileURLToPath } from "node:url";
import { dirname, resolve as pathResolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [WxtVitest(), tsconfigPaths()],
  resolve: {
    alias: {
      "@": pathResolve(__dirname, "src"),
      "@/constants": pathResolve(__dirname, "src/constants.ts"),
    },
  },
  test: {
    globals: true,
    environment: "node",
    include: [
      "src/**/*.{test,spec}.{ts,tsx}",
      "tests/**/*.{test,spec}.{ts,tsx}"
    ],
    exclude: [
      "node_modules",
      "dist",
      "out",
      ".wxt",
      "packages/**/dist",
      "**/*.d.ts"
    ],
    reporters: ["default"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html", "lcov"],
      reportsDirectory: "coverage",
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "src/**/*.d.ts",
        "src/**/__mocks__/**",
        "src/**/__fixtures__/**",
        "dist/**"
      ]
    }
  }
});


