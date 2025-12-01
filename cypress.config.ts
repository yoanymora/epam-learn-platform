import { defineConfig } from "cypress";
import * as dotenv from "dotenv";
dotenv.config();

export default defineConfig({
	env: {
		logInUrl:
			"https://learn.epam.com/api/signin?redirectUrl=https%3A%2F%2Flearn.epam.com%2Fstart",
		myAccountUrl: "https://learn.epam.com/account/profile",
		linkedInUserEmail: process.env.LINKEDIN_USER_EMAL,
		linkedInUserPassword: process.env.LINKEDIN_USER_PASSWORD,
	},
	e2e: {
		specPattern: "cypress/e2e/**/*.spec.ts",
		setupNodeEvents(on, config) {},
	},
});
