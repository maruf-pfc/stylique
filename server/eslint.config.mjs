import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node, // ✅ Node.js globals like process, module, etc.
      },
    },
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs", // ✅ Required if you're using require/module.exports
    },
  },
  {
    files: ["tests/**/*.js"], // Target the tests folder
    rules: {
      "no-undef": "off", // Disable the 'no-undef' rule for tests
    },
  },
]);
