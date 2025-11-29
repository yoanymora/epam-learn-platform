import PageFactory from "./pageFactory";

class Login extends PageFactory {
	constructor() {
		super(Cypress.env("logInUrl"));
	}

	get showMoreLink() {
		return cy.get(".showMoreLink");
	}

	get googleSocialButton() {
		return cy.get("#social-google");
	}
}

export default new Login();
