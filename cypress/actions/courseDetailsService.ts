import CourseDetailsPage from "../pages/courseDetailsPage";

class CourseDetailsService {
	enrollToCourse() {
		cy.fixture("urls.json").then((fixture) => {
			cy.clickOnVisibleElement(CourseDetailsPage.studyButton);
			cy.origin(fixture.endpoints.eLearn, () => {
				cy.get("#courseTabsNavigation");
			});
		});
	}
}

export default new CourseDetailsService();
