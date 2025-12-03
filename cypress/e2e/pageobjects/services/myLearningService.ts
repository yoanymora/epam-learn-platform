import MyLearningPage from "../pages/myLearningPage";

class MyLearningService {
	validateUserHasNoCourses() {
		cy.visitAndWaitForLoad(
			MyLearningPage.activeLearningUrl,
			MyLearningPage.activeLearningDisctintiveSelector
		);
		MyLearningPage.noActiveLearning.should("be.visible");
	}

	validateUserEnrolledIntoCourse(title: string) {
		cy.visitAndWaitForLoad(
			MyLearningPage.activeLearningUrl,
			MyLearningPage.activeLearningDisctintiveSelector
		);
		MyLearningPage.activeLearningCourses.should("be.visible");
		cy.reload();
		MyLearningPage.activeLearningCourseTitles.should("be.visible");
		MyLearningPage.activeLearningCourseTitles.contains(title).should("be.visible");
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
		MyLearningPage.activeLearningCourseTitles
			.contains(title)
			.parents(".MyLearningCard_myLearningCardContent__oC2Ma")
			.find("button.MyLearningCardFooterActions_actionButton__-z5Xo")
			.should("be.visible");
		MyLearningPage.activeLearningCourseTitles
			.contains(title)
			.parents(".MyLearningCard_myLearningCardContent__oC2Ma")
			.find("button.MyLearningCardFooterActions_actionButton__-z5Xo")
			.click();
	}

	desenrollToCourse(title: string, reason: string) {
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
