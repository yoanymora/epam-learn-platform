import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
import { plugin as cypressGrepPlugin } from "@cypress/grep/plugin";
import { page } from "./epamUrls";
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

dotenv.config();

async function setupNodeEvents(
	on: Cypress.PluginEvents,
	config: Cypress.PluginConfigOptions
): Promise<Cypress.PluginConfigOptions> {
	// This is required for the preprocessor to be able to generate JSON reports after each run, and more,
	await addCucumberPreprocessorPlugin(on, config);

	on(
		"file:preprocessor",
		createBundler({
			plugins: [createEsbuildPlugin(config)],
		})
	);
	cypressGrepPlugin(config);
	// eslint-disable-next-line @typescript-eslint/no-require-imports
	require("cypress-mochawesome-reporter/plugin")(on);

	// Make sure to return the config object as it might have been modified by the plugin.
	return config;
}

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
		specPattern: "cypress/e2e/*.feature",
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
		setupNodeEvents,
	},
	viewportWidth: 1920,
	viewportHeight: 1400,
	retries: {
		runMode: 2,
		openMode: 0,
	},
});
