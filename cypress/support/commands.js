import Login from "../e2e/pageobjects/pages/loginPage";
import Access from "../e2e/pageobjects/pages/accessPage";

Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});

Cypress.Commands.add("visitAndWaitForLoad", (url, distinctiveSelector) => {
	cy.visit(url);
	cy.get(distinctiveSelector).should("be.visible");
});

Cypress.Commands.add("logInWithDiscord", () => {
	cy.session("discordSession", () => {
		Login.visit();
		Access.showMoreLink.should("be.visible");
		Access.showMoreLink.click();
		cy.get("#social-discord").should("be.visible");
		cy.get("#social-discord").click();
		cy.origin("https://discord.com", () => {
			Cypress.on("uncaught:exception", (err, runnable) => {
				return false;
			});
			cy.get('input[name="email"]')
				.should("be.visible")
				.type(Cypress.env("DiscordUserEmail"));
			cy.get('input[name="password"]').type(Cypress.env("DiscordUserPassword"));
			cy.get('button[type="submit"]').click();
			cy.get('[data-mana-component="modal"]').should("be.visible");
			cy.get('[data-mana-component="button"]:nth-child(2)').should("be.visible");
			cy.get('[data-mana-component="button"]:nth-child(2)').click();
			cy.url().should("contain", "/start");
		});
	});
});
