import MyAccountPage from "./pageobjects/pages/myAccountPage";

describe("Dummy login", () => {
	beforeEach(function () {
		cy.logInWithLinkedIn();
	});

	it("Visit my account page", function () {
		MyAccountPage.visit();
	});
});
