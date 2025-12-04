import MyAccountPage from "../pageobjects/pages/myAccountPage";
import MyAccountService from "../pageobjects/services/myAccountService";
import MyLearningService from "../pageobjects/services/myLearningService";
import CatalogPage from "../pageobjects/pages/catalogPage";
import CatalogService from "../pageobjects/services/catalogService";
import CourseDetailsPage from "../pageobjects/pages/courseDetailsPage";
import CourseDetailsService from "../pageobjects/services/courseDetailsService";

describe("Logged Users", { tags: "@logged", testIsolation: false }, () => {
	it("User logs in", () => {
		cy.logInWithDiscord();
	});

	it("User changes its location", () => {
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
		MyLearningService.validateUserEnrolledIntoCourse(courseToEnroll);
	});

	it("Desenroll to course", () => {
		MyLearningService.desenrollToCourse("Clean Code", "Other");
		MyLearningService.validateUserHasNoCourses();
	});

	it("User visits My Account Page", () => {
		cy.intercept("https://learn.epam.com/account/profile").as("getMyAccountPage");
		cy.visitAndWaitForLoad(MyAccountPage.url, MyAccountPage.distinctiveSelector);
		cy.wait("@getMyAccountPage").then((interception) => {
			expect(interception.response).to.have.property("statusCode", 200);
		});
	});
});
