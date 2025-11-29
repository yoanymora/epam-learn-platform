import Login from "../../pageobjects/pages/login";

describe('template spec', () => {
  	it('passes', () => {
		cy.visit(Cypress.env('logInWithGoogleUrl'));
		// Login.showMoreLink.click();
		// cy.wait(1000);
    // cy.visit(Cypress.env('logInUrl'));
	// cy.get(".showMoreLink").click();
		// cy.get("#social-google").click();
  	})
})
