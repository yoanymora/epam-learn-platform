import Login from "../e2e/pageobjects/pages/loginPage";
import Access from "../e2e/pageobjects/pages/accessPage";
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add("logInWithLinkedIn", () => {
	Login.visit();
	Access.showMoreLink.should("be.visible");
	Access.showMoreLink.click();
	Access.logWithLinkedInButton.should("be.visible");
	Access.logWithLinkedInButton.click();
	cy.origin("https://www.linkedin.com", () => {
		cy.get("#username").type(Cypress.env("linkedInUserEmail"));
		cy.get("#password").type(Cypress.env("linkedInUserPassword"));
		cy.get('button[type="submit"]').click();
	});
});
