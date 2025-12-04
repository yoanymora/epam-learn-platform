import MyLearningPage from "../pages/myLearningPage";
import Common from "./common";

class MyLearningService {
	validateUserHasNoCourses() {
		const learningSummaryEndpoint =
			"https://learn.epam.com/api/epamgraphql/query?operationName=learningCabinetTotalCountTabs";
		const continueSummaryEndpoint =
			"https://learn.epam.com/api/epamgraphql/query?opName=getContinueLearningItemsQuery";
		cy.intercept(learningSummaryEndpoint).as("getLearningSummary");
		cy.intercept(continueSummaryEndpoint).as("getContinueLearningSummary");
		cy.visitAndWaitForLoad(
			MyLearningPage.activeLearningUrl,
			MyLearningPage.activeLearningDisctintiveSelector
		);
		cy.wait("@getLearningSummary").then((interception) => {
			expect(interception.response?.body?.data?.learningOverview?.totalCount).to.equal(0);
		});
		cy.wait("@getContinueLearningSummary").then((interception) => {
			expect(
				interception.response?.body?.data?.myLearningRequestItems?.items.length
			).to.equal(0);
		});
	}

	validateUserEnrolledIntoCourse(courseToEnroll, coursesEnrolled: number) {
		const learningSummaryEndpoint =
			"https://learn.epam.com/api/epamgraphql/query?operationName=learningCabinetTotalCountTabs";
		const continueSummaryEndpoint =
			"https://learn.epam.com/api/epamgraphql/query?opName=getContinueLearningItemsQuery";
		cy.intercept(learningSummaryEndpoint).as("getLearningSummary");
		cy.intercept(continueSummaryEndpoint).as("getContinueLearningSummary");
		cy.visitAndWaitForLoad(MyLearningPage.url, MyLearningPage.distinctiveSelector);
		cy.visitAndWaitForLoad(
			MyLearningPage.activeLearningUrl,
			MyLearningPage.activeLearningDisctintiveSelector
		);
		cy.wait("@getLearningSummary").then((interception) => {
			expect(interception.response?.body?.data?.learningOverview?.totalCount).to.equal(
				coursesEnrolled
			);
		});
		cy.wait("@getContinueLearningSummary").then((interception) => {
			expect(
				interception.response?.body?.data?.myLearningRequestItems?.items[0]?.catalogItem
					?.name
			).to.equal(courseToEnroll);
		});
	}

	fillLeaveLearningModal(reason: string) {
		MyLearningPage.leaveLearningModal.should("be.visible");
		cy.clickOnVisibleElement(MyLearningPage.leaveLearningModalReasonInput);
		MyLearningPage.leaveLearningModalOptions.should("be.visible");
		MyLearningPage.leaveLearningModalOptions.contains(reason).click();
		cy.typeOnVisibleElement(MyLearningPage.leaveLearningModalTextarea, "Test");
	}

	findAndClickCourseLeaveLearningButton(title: string) {
		MyLearningPage.activeLearningCourseTitles.contains(title).should("be.visible");
		const leaveCourseButton = MyLearningPage.activeLearningCourseTitles
			.contains(title)
			.parents(".MyLearningCard_myLearningCardContent__oC2Ma")
			.find("button.MyLearningCardFooterActions_actionButton__-z5Xo");
		Common.waitForVisible(leaveCourseButton);
		leaveCourseButton.click();
	}

	disenrollToCourse(title: string, reason: string) {
		cy.visitAndWaitForLoad(
			MyLearningPage.activeLearningUrl,
			MyLearningPage.activeLearningDisctintiveSelector
		);
		this.findAndClickCourseLeaveLearningButton(title);
		this.fillLeaveLearningModal(reason);
		cy.clickOnVisibleElement(MyLearningPage.leaveLearningModalSubmit);
	}
}

export default new MyLearningService();
