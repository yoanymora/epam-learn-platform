import MyLearningPage from "../pages/myLearningPage";

Cypress.Commands.add("validateUserHasNoCourses", () => {
	const learningSummaryEndpoint =
		"https://learn.epam.com/api/epamgraphql/query?operationName=learningCabinetTotalCountTabs";
	const continueSummaryEndpoint =
		"https://learn.epam.com/api/epamgraphql/query?opName=getContinueLearningItemsQuery";
	cy.intercept(learningSummaryEndpoint).as("getLearningSummary");
	cy.intercept(continueSummaryEndpoint).as("getContinueLearningSummary");
	cy.visitAndWaitForLoad(
		MyLearningPage.activeLearningUrl,
		MyLearningPage.activeLearningDisctintiveSelector
	).then(() => {
		cy.wait("@getLearningSummary").then((interception) => {
			expect(interception.response?.body?.data?.learningOverview?.totalCount).to.equal(0);
		});
		cy.wait("@getContinueLearningSummary").then((interception) => {
			expect(
				interception.response?.body?.data?.myLearningRequestItems?.items.length
			).to.equal(0);
		});
	});
});

Cypress.Commands.add("validateUserEnrolledIntoCourse", (courseToEnroll, coursesEnrolled) => {
	const learningSummaryEndpoint =
		"https://learn.epam.com/api/epamgraphql/query?operationName=learningCabinetTotalCountTabs";
	const continueSummaryEndpoint =
		"https://learn.epam.com/api/epamgraphql/query?opName=getContinueLearningItemsQuery";
	cy.intercept(learningSummaryEndpoint).as("getLearningSummary");
	cy.intercept(continueSummaryEndpoint).as("getContinueLearningSummary");
	cy.visitAndWaitForLoad(MyLearningPage.url, MyLearningPage.distinctiveSelector).then(() => {
		cy.visitAndWaitForLoad(
			MyLearningPage.activeLearningUrl,
			MyLearningPage.activeLearningDisctintiveSelector
		).then(() => {
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
		});
	});
});

Cypress.Commands.add("fillLeaveLearningModal", (reason) => {
	MyLearningPage.leaveLearningModal.should("be.visible");
	cy.clickOnVisibleElement(MyLearningPage.leaveLearningModalReasonInput).then(() => {
		MyLearningPage.leaveLearningModalOptions.should("be.visible");
		MyLearningPage.leaveLearningModalOptions.contains(reason).click();
		cy.typeOnVisibleElement(MyLearningPage.leaveLearningModalTextarea, "Test");
	});
});

Cypress.Commands.add("findAndClickCourseLeaveLearningButton", (title) => {
	MyLearningPage.activeLearningCourseTitles.contains(title).should("be.visible");
	const leaveCourseButton = MyLearningPage.activeLearningCourseTitles
		.contains(title)
		.parents(".MyLearningCard_myLearningCardContent__oC2Ma")
		.find("button.MyLearningCardFooterActions_actionButton__-z5Xo");
	cy.waitForVisible(leaveCourseButton).then(() => {
		leaveCourseButton.click();
	});
});

Cypress.Commands.add("disenrollToCourse", (title, reason) => {
	cy.visitAndWaitForLoad(
		MyLearningPage.activeLearningUrl,
		MyLearningPage.activeLearningDisctintiveSelector
	).then(() => {
		cy.findAndClickCourseLeaveLearningButton(title).then(() => {
			cy.fillLeaveLearningModal(reason).then(() => {
				cy.clickOnVisibleElement(MyLearningPage.leaveLearningModalSubmit);
			});
		});
	});
});
