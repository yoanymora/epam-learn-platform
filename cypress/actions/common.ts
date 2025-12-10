class Common {
	waitForVisible(element: Cypress.Chainable<JQuery<HTMLElement>>) {
		element.should("be.visible");
	}

	fillInput(input: Cypress.Chainable<JQuery<HTMLElement>>, value: string) {
		input.clear().type(value);
	}
}

export default new Common();
