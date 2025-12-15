import js from "@eslint/js"
import unicorn from "eslint-plugin-unicorn"
import globals from "globals"

export default [
  {
    ignores: ["dist", "node_modules"],
  },

  {
    files: ["**/*.js", "**/*.ts"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: globals.node,
    },
    plugins: {
      unicorn,
    },
    rules: {
      ...js.configs.recommended.rules,
      "unicorn/filename-case": [
        "error",
        {
          cases: {
            kebabCase: true,
            camelCase: true,
          },
        },
      ],
      "no-console": "off",
    },
  },

  {
    files: ["**/index.ts", "**/index.js"],
    rules: {
      "unicorn/filename-case": "off",
    },
  },

  {
    files: ["**/*.ts", "**/*.tsx"],
    parser: "@typescript-eslint/parser",
    plugins: ["@typescript-eslint"],
    extends: ["plugin:@typescript-eslint/recommended"],
    parserOptions: { project: true },
  },
]
