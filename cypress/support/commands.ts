export {};

declare global {
	namespace Cypress {
		interface Chainable {
			sortCoursesVisitorsDes(visitors: any): Chainable<any>;
			goToCourseDetails(title: string): Chainable<any>;
			filterCoursesByLanguage(language: string): Chainable<any>;
			getCoursesBy(badge: "language" | "visitors"): Chainable<any>;
			sortCoursesByVisitors();
			logInWithDiscord();
			visitAndWaitForLoad(url, distinctiveSelector): Chainable<any>;
			clickOnVisibleElement(element): Chainable<any>;
			typeOnVisibleElement(element, value: string): Chainable<any>;
			changeLocationTo(location: string): Chainable<any>;
			enrollToCourse(): Chainable<any>;
			validateUserHasNoCourses(): Chainable<any>;
			validateUserEnrolledIntoCourse(
				courseToEnroll: string,
				coursesEnrolled: string
			): Chainable<any>;
			fillLeaveLearningModal(reason: string): Chainable<any>;
			findAndClickCourseLeaveLearningButton(title: string): Chainable<any>;
			disenrollToCourse(title: string, reason: string): Chainable<any>;
		}
	}
}

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

Cypress.Commands.add("clickOnVisibleElement", (element) => {
	element.should("be.visible");
	element.click();
});

Cypress.Commands.add("typeOnVisibleElement", (element, value) => {
	element.should("be.visible");
	element.clear().type(value);
});
