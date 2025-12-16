import "./commands";
import "./catalogCommands";
import "./myAccountCommands";
import "./courseDetailsCommands";
import "./myLearningCommands";
import "cypress-mochawesome-reporter/register";
Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});
