import { defineConfig } from "eslint/config";

export default defineConfig([
	{
		files: ["**/*.ts"],
		rules: {
			camelcase: "warn",
			"max-params": ["error", 4],
			"no-var": "error",
		}
	}
])
