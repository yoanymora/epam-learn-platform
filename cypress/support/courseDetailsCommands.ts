import CourseDetailsPage from "../pages/courseDetailsPage";

Cypress.Commands.add("enrollToCourse", () => {
	cy.fixture("urls.json").then((fixture) => {
		cy.clickOnVisibleElement(CourseDetailsPage.studyButton).then(() => {
			cy.origin(fixture.endpoints.eLearn, () => {
				cy.get("#courseTabsNavigation");
			});
		});
	});
});
