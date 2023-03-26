module.exports = {
  env: {
    es2021: true,
  },
  extends: ["standard-with-typescript", "plugin:import/recommended", "plugin:import/typescript", "prettier"],
  overrides: [],
  parserOptions: {
    project: "./tsconfig.json",
  },
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    "@typescript-eslint/prefer-nullish-coalescing": "off",
    "@typescript-eslint/strict-boolean-expressions": "off",
    "import/order": [
      "error",
      {
        alphabetize: { order: "asc" },
        warnOnUnassignedImports: true,
      },
    ],
  },
};
