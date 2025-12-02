export default class PageFactory {
	url: string;

	constructor(url: string) {
		this.url = url;
	}

	visit(): void {
		cy.visit(this.url);
	}
}
