import PageFactory from "./pageFactory";

class CourseDetailsPage extends PageFactory {
	constructor() {
		super("/", "#SUMMARY");
	}

	get courseSummary() {
		return cy.get(this.distinctiveSelector);
	}

	get studyButton() {
		return this.courseSummary.find(".CourseTitleSection_infoContainer__J2Iv5 button");
	}
}

export default new CourseDetailsPage();
