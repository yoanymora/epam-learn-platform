import Login from "../e2e/pageobjects/pages/loginPage";
import Access from "../e2e/pageobjects/pages/accessPage";

Cypress.on("uncaught:exception", (err, runnable) => {
	return false;
});

Cypress.Commands.add("logInWithLinkedIn", () => {
	cy.session("linkedInSession", () => {
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
});

Cypress.Commands.add("logInWithDiscord", () => {
	cy.session("discordSession", () => {
		Login.visit();
		Access.showMoreLink.should("be.visible");
		Access.showMoreLink.click();
		cy.get("#social-discord").click();
		cy.origin("https://discord.com", () => {
			Cypress.on("uncaught:exception", (err, runnable) => {
				return false;
			});
			cy.wait(2000);
			cy.get('input[name="email"]')
				.should("be.visible")
				.type(Cypress.env("DiscordUserEmail"));
			cy.get('input[name="password"]').type(Cypress.env("DiscordUserPassword"));
			cy.get('button[type="submit"]').click();
			cy.get(
				"#«rb» > div > div > div.body__8a031.auto_d125d2.scrollerBase_d125d2 > main > div > div > div > div.applicationDetails__94ab2 > div:nth-child(4) > div"
			).scrollIntoView();
			cy.get(
				"#«rb» > div > div > footer > div > div > button.button_a22cb0.md_a22cb0.primary_a22cb0.hasText_a22cb0.fullWidth_a22cb0 > div"
			).click();
			cy.url().should("contain", "/start");
		});
	});
});
