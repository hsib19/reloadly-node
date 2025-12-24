import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores([
    "coverage/**",
    "dist/**",
    "node_modules/**",
    "**/__tests__/**",
    "**/*.test.*",
    "**/*.spec.*",
    "**/dist/**",
    "**/coverage/**",
    "**/.vitepress/**",
  ]),
  {
    files: ["**/*.{js,ts}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  tseslint.configs.recommended,
]);
