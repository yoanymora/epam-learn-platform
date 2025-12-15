class Common {
	waitForVisible(element: Cypress.Chainable<JQuery<HTMLElement>>) {
		element.should("be.visible");
	}

	fillInput(input: Cypress.Chainable<JQuery<HTMLElement>>, value: string) {
		input.clear().type(value);
	}

	sortCoursesVisitorsDes(visitors) {
		console.log("sorting...");
		return visitors.sort((a, b) => {
			console.log("iteration");
			return b - a;
		});
	}
}

export default new Common();
