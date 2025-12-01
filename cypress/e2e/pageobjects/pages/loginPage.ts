import PageFactory from "./pageFactory";

class Login extends PageFactory {
	constructor() {
		super(Cypress.env("logInUrl"));
	}

	get emailInput() {
		return cy.get('input[type="email"]');
	}

	get passwordInput() {
		return cy.get('input[type="password"]');
	}

	get nextButton() {
		return cy.get("#identifierNext");
	}

	get logInButton() {
		return cy.get('button[type="submit"]');
	}
}

export default new Login();
