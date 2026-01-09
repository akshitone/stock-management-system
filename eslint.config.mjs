import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["**/dist", "**/.next", "**/node_modules"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
  },
  {
      files: ["**/*.{js,mjs,cjs,jsx}"],
      extends: [js.configs.recommended],
      languageOptions: {
          globals: globals.browser,
      },
  }
);
