import PageFactory from "./pageFactory";

class MyAccount extends PageFactory {
	constructor() {
		super(Cypress.env("myAccountUrl"));
	}
}

export default new MyAccount();
