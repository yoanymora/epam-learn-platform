class Common {
	waitForVisible(element: Cypress.Chainable<JQuery<HTMLElement>>): void {
		element.should("be.visible");
	}

	fillInput(input: Cypress.Chainable<JQuery<HTMLElement>>, value: string): void {
		input.clear().type(value);
	}
}

export default new Common();
