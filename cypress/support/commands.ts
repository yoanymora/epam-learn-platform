import CatalogPage from "../pages/catalogPage";
import Common from "../actions/common";

declare namespace Cypress {
	interface Chainable<Subject = any> {
		sortCoursesVisitorsDes: (visitors: any) => Chainable<Subject>;
		goToCourseDetails(title: string): Chainable<void>;
		filterCoursesByLanguage(language: string): Chainable<void>;
		getCoursesBy(badge: "language" | "visitors"): Chainable<void>;
		sortCoursesByVisitors();
		logInWithDiscord();
	}
}

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

Cypress.Commands.add("sortCoursesVisitorsDes", (visitors) => {
	console.log("sorting...");
	return visitors.sort((a, b) => {
		console.log("iteration");
		return b - a;
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

Cypress.Commands.add("goToCourseDetails", (title) => {
	cy.typeOnVisibleElement(CatalogPage.searchInput, title);
	Common.waitForVisible(cy.get(".ItemsListWithFilter_sortingListWrapper__VVIE2"));
	const cleanCodeCourseElement = CatalogPage.courseTitles.contains(title);
	Common.waitForVisible(cleanCodeCourseElement);
	cy.clickOnVisibleElement(cleanCodeCourseElement);
});

Cypress.Commands.add("filterCoursesByLanguage", (language) => {
	CatalogPage.filterPanel
		.find("h6:contains('Language')")
		.parents(".uui-label-top")
		.find('div[role="option"] div.uui-input-label')
		.contains(language)
		.click();
});

Cypress.Commands.add("getCoursesBy", (badge) => {
	let elements: Array<any> = [];
	let selector: any;
	if (badge === "language") {
		selector = CatalogPage.allCoursesLanguageBadge;
	} else {
		selector = CatalogPage.allCoursesVisitorsBadge;
	}
	return selector.then(($badges) => {
		elements = [...$badges].map((badge) =>
			badge === "language" ? badge.innerText : Number(badge.innerText)
		);
		return elements;
	});
});

Cypress.Commands.add("sortCoursesVisitorsDes", (visitors) => {
	console.log("sorting...");
	return visitors.sort((a, b) => {
		console.log("iteration");
		return b - a;
	});
});

Cypress.Commands.add("sortCoursesByVisitors", () => {
	cy.fixture("urls.json").then((fixture) => {
		cy.intercept(fixture.sortCourses.sortByEnrolled).as("sortByEnrolled");
		cy.visitAndWaitForLoad(fixture.sortCourses.sortByEnrolled, CatalogPage.distinctiveSelector);
	});
	cy.wait("@sortByEnrolled").then((interception) => {
		expect(interception.request.query["sorting"]).to.include("ENROLLED");
		expect(interception.response).to.have.property("statusCode", 200);
	});
});
