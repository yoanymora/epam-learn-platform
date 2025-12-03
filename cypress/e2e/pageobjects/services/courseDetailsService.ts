import CourseDetailsPage from "../pages/courseDetailsPage";

class CourseDetailsService {
	enrollToCourse() {
		cy.clickOnVisibleElement(CourseDetailsPage.studyButton);
	}
}

export default new CourseDetailsService();
