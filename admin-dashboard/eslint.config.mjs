import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

// Get the current directory and filename to set the base directory correctly
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Initialize FlatCompat to manage the ESLint config extensions
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Define the ESLint configuration
const eslintConfig = {
  // Extend the base Next.js configurations
  extends: [
    ...compat.extends("next/core-web-vitals", "next/typescript"),
  ],
  
  // Ignore patterns for specific files
  ignorePatterns: [
    "*.mjs", // Ignore all .mjs files
    ".next/*", // Ignore the Next.js build output
    "node_modules/*", // Ignore node_modules (you can specify other folders too)
  ],
  
  // Define custom rules to be applied
  rules: {
    "no-console": "off", // Allow console.log and other console methods
    "@typescript-eslint/explicit-module-boundary-types": "off", // Turn off explicit return types
    "@typescript-eslint/no-explicit-any": "off", // Allow `any` type
    "@typescript-eslint/no-unused-vars": "off", // Disable unused vars rule
    "react/jsx-key": "off", // Disable missing key warning for React lists
    "no-undef": "off", // Allow undefined variables
    "no-unreachable": "off", // Allow unreachable code
    "no-debugger": "off", // Allow debugger statements
    "react/prop-types": "off", // Disable prop-types checking (use TypeScript types)
    "react/jsx-no-undef": "off", // Allow JSX components that are undefined
    "react/react-in-jsx-scope": "off", // Disabling the React import requirement
  },
};

export default eslintConfig;