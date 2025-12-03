import CourseDetailsPage from "../pages/courseDetailsPage";

class CourseDetailsService {
	enrollToCourse() {
		CourseDetailsPage.studyButton.should("be.visible");
		CourseDetailsPage.studyButton.click();
	}
}

export default new CourseDetailsService();
