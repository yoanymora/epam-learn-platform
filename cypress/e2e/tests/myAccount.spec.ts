import MyAccountPage from "../pageobjects/pages/myAccountPage";
import MyAccountService from "../pageobjects/services/myAccountService";

describe("My Account", () => {
	beforeEach(() => {
		cy.logInWithDiscord();
	});

	it("A user changes its location", function () {
		MyAccountPage.visit();
		MyAccountService.changeLocationTo("Jalisco");
		MyAccountPage.currentUserLocation.invoke("text").then((currentLocation) => {
			expect(currentLocation).to.equal("Jalisco");
			MyAccountService.changeLocationTo("Colima");
			MyAccountPage.currentUserLocation.invoke("text").then((newLocation) => {
				expect(newLocation).not.to.equal(currentLocation);
				expect(newLocation).to.equal("Colima");
			});
		});
	});
});
