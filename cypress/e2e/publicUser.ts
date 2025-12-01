import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import CatalogPage from "../pages/catalogPage";

Given(/^a public user is in the EPAM's catalog page$/, () => {
	cy.visitAndWaitForLoad(CatalogPage.url, CatalogPage.distinctiveSelector);
});

Given(/^the courses listed in the page have different languages$/, () => {
	cy.getCoursesBy("language").then((coursesLanguages) => {
		expect(new Set(coursesLanguages).size).to.be.greaterThan(0);
	});
});

When(/^the user filters the courses by English language$/, () => {
	cy.filterCoursesByLanguage("English");
});

Then(/^the user only sees courses with the English language badge$/, () => {
	cy.getCoursesBy("language").then((coursesLanguages) => {
		expect(new Set(coursesLanguages).size).to.be.equal(1);
	});
});

Given(/^the courses in the page aren't sorted by the quantity of people enrolled$/, () => {
	cy.getCoursesBy("visitors").then((coursesVisitors) => {
		const unsortedCorusesVisitors = Array.from(coursesVisitors);
		cy.sortCoursesVisitorsDes(coursesVisitors).then(() => {
			expect(unsortedCorusesVisitors).not.to.have.ordered.members(coursesVisitors);
		});
	});
});

When(/^the user sort the courses by the quantity of people enrolled$/, () => {
	cy.sortCoursesByVisitors();
});

Then(
	/^the page refreshes and the courses are sorted by the quantity of people enrolled in descendent order$/,
	() => {
		cy.getCoursesBy("visitors").then((coursesVisitors) => {
			const unsortedCorusesVisitors = Array.from(coursesVisitors);
			cy.sortCoursesVisitorsDes(coursesVisitors).then(() => {
				expect(unsortedCorusesVisitors).to.have.ordered.members(coursesVisitors);
			});
		});
	}
);
