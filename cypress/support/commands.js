Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});

Cypress.Commands.add("visitAndWaitForLoad", (url, distinctiveSelector) => {
	cy.visit(url);
	cy.get(distinctiveSelector).should("be.visible");
});

Cypress.Commands.add("logInWithDiscord", () => {
	cy.session("discordSession", () => {
		cy.visit(Cypress.env("logInWithDiscordUrl"));
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
