import MyAccountPage from "../../pages/myAccountPage";
import MyAccountService from "../../actions/myAccountService";
import MyLearningService from "../../actions/myLearningService";
import CatalogPage from "../../pages/catalogPage";
import CatalogService from "../../actions/catalogService";
import CourseDetailsPage from "../../pages/courseDetailsPage";
import CourseDetailsService from "../../actions/courseDetailsService";

describe("Logged User", { tags: "@logged", testIsolation: false }, () => {
	it("User logs in", () => {
		cy.logInWithDiscord();
	});

	it("Validate user data in My Account page", () => {
		cy.fixture("urls.json").then((fixture) => {
			cy.intercept(fixture.endpoints.getAppContext).as("getAppContext");
			cy.visitAndWaitForLoad(MyAccountPage.url, MyAccountPage.distinctiveSelector);
			cy.wait("@getAppContext").then((interception) => {
				expect(interception.response?.body?.data?.appContext?.user).to.have.property(
					"name",
					"dummy test"
				);
				expect(interception.response?.body?.data?.appContext?.user).to.have.property(
					"email",
					"test.dummy.epam@gmail.com"
				);
			});
		});
	});

	it("User changes its location", () => {
		cy.visitAndWaitForLoad(MyAccountPage.url, MyAccountPage.distinctiveSelector);
		MyAccountService.changeLocationTo("Jalisco");
		MyAccountPage.currentUserLocation.invoke("text").then((currentLocation) => {
			expect(currentLocation).to.equal("Jalisco");
			MyAccountService.changeLocationTo("Colima");
			MyAccountPage.currentUserLocation.invoke("text").then((newLocation) => {
				expect(newLocation).not.to.equal(currentLocation);
				expect(newLocation).to.equal("Colima");
			});
		});
	});

	it("Enroll into a course", () => {
		const courseToEnroll = "Clean Code";
		MyLearningService.validateUserHasNoCourses();
		cy.visitAndWaitForLoad(CatalogPage.url, CatalogPage.distinctiveSelector);
		CatalogService.goToCourseDetails(courseToEnroll);
		CourseDetailsPage.courseSummary.should("be.visible");
		CourseDetailsService.enrollToCourse();
		MyLearningService.validateUserEnrolledIntoCourse(courseToEnroll, 1);
	});

	it("Disenroll to course", () => {
		MyLearningService.disenrollToCourse("Clean Code", "Other");
		MyLearningService.validateUserHasNoCourses();
	});
});
