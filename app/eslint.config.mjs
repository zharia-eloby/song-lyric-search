import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import stylisticJs from "@stylistic/eslint-plugin-js";

export default defineConfig([
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    plugins: { 
      js,
      "@stylistic/js": stylisticJs
    }, 
    extends: ["js/recommended"] 
  },
  { 
    files: ["**/*.{js,mjs,cjs,jsx}"], 
    languageOptions: { 
      globals: globals.browser 
    } 
  },
  {
    ...pluginReact.configs.flat.recommended,
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "no-unused-vars": "warn",
      "no-undef": "off",
      "semi": ["error", "always"],
      "quotes": ["error", "double"],
      "@stylistic/js/indent": ["error", 2]
    },
  },
]);