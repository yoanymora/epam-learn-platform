import PageFactory from "./pageFactory";

class Access extends PageFactory {
	constructor() {
		super("https://access.epam.com");
	}

	get showMoreLink() {
		return cy.get(".showMoreLink");
	}

	get logWithLinkedInButton() {
		return cy.get("#social-linkedin");
	}
}

export default new Access();
