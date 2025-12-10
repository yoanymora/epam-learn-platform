import { uniq } from "../../../../node_modules/cypress/types/lodash/index";

export default class PageFactory {
	url: string;
	distinctiveSelector: string;

	constructor(url: string, distinctiveSelector) {
		this.url = url;
		this.distinctiveSelector = distinctiveSelector;
	}

	visit() {
		cy.visit(this.url);
	}
}
