import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {ignorePatterns: [
    "*.mjs", // Ignore all .mjs files
    ".next/*", // Ignore the Next.js build output
    "node_modules/*", // Ignore node_modules (you can specify other folders too)
  ],},
  {
    rules: {
      "no-console": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "react/jsx-key": "off",
      "no-undef": "off",
      "no-unreachable": "off",
      "no-debugger": "off",
      "react/prop-types": "off",
      "react/jsx-no-undef": "off",
      "react/react-in-jsx-scope": "off",
    },
  },
];

export default eslintConfig;
