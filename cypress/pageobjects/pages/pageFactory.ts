export default class PageFactory {
	url: string;
	constructor(url: string) {
		this.url = url;
	}

	open(): void {
		cy.visit(this.url);
	}
}
