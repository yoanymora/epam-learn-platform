import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
import { plugin as cypressGrepPlugin } from "@cypress/grep/plugin";
import { page } from "./epamUrls";

dotenv.config();

export default defineConfig({
	env: {
		grepFilterSpecs: true,
		catalogUrl: page.catalog,
		logInUrl: page.logIn,
		logInWithDiscordUrl: page.logInWithDiscord,
		myAccountUrl: page.myAccount,
		myLearningUrl: page.myLearning,
		myActiveLearningUrl: page.myActiveLearning,
		DiscordUserEmail: process.env.DISCORD_USER_EMAL,
		DiscordUserPassword: process.env.DISCORD_USER_PASSWORD,
	},
	e2e: {
		supportFile: "cypress/support/e2e.ts",
		specPattern: "cypress/e2e/tests/*.spec.ts",
		setupNodeEvents(on, config) {
			cypressGrepPlugin(config);
			// eslint-disable-next-line @typescript-eslint/no-require-imports
			require("cypress-mochawesome-reporter/plugin")(on);
			return config;
		},
		reporter: "cypress-mochawesome-reporter",
		reporterOptions: {
			reportDir: "cypress/reports/html",
			overwrite: true,
			html: true,
			json: true,
			charts: true,
			embeddedScreenshots: true,
			timestamp: "ddmmyyyy_HHMMss",
		},
	},
	viewportWidth: 1920,
	viewportHeight: 1400,
	retries: {
		runMode: 2,
		openMode: 0,
	},
});
