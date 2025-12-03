import { defineConfig } from "eslint/config";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginCypress from "eslint-plugin-cypress";

export default defineConfig([
	{
		extends: [
			eslint.configs.recommended,
			tseslint.configs.recommended,
			pluginCypress.configs.recommended,
		],
		files: ["**/*.ts"],
		rules: {
			camelcase: "warn",
			"max-params": ["error", 4],
			"no-var": "error",
			"@typescript-eslint/no-unused-vars": "off",
			"no-console": "error",
		},
	},
]);
