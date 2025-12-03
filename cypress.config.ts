import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
import { plugin as cypressGrepPlugin } from "@cypress/grep/plugin";
dotenv.config();

export default defineConfig({
	env: {
		grepFilterSpecs: true,
		catalogUrl: "https://learn.epam.com/catalog",
		logInUrl:
			"https://learn.epam.com/api/signin?redirectUrl=https%3A%2F%2Flearn.epam.com%2Fstart",
		myAccountUrl: "https://learn.epam.com/account/profile",
		DiscordUserEmail: process.env.DISCORD_USER_EMAL,
		DiscordUserPassword: process.env.DISCORD_USER_PASSWORD,
	},
	e2e: {
		specPattern: "cypress/e2e/tests/*.spec.ts",
		setupNodeEvents(on, config) {
			cypressGrepPlugin(config);
			return config;
		},
	},
	viewportWidth: 1920,
	viewportHeight: 1400,
	retries: {
		runMode: 2,
		openMode: 0,
	},
});
