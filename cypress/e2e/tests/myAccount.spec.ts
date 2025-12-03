import MyAccountPage from "../pageobjects/pages/myAccountPage";
import MyAccountService from "../pageobjects/services/myAccountService";

describe("My Account", { tags: "@logged", testIsolation: false }, () => {
	it("User logs in", () => {
		cy.logInWithDiscord();
	});

	it("User visits My Account Page", () => {
		cy.intercept("https://learn.epam.com/account/profile").as("getMyAccountPage");
		cy.visitAndWaitForLoad(MyAccountPage.url, MyAccountPage.distinctiveSelector);
		cy.wait("@getMyAccountPage").then((interception) => {
			expect(interception.response).to.have.property("statusCode", 200);
		});
	});

	it("User changes its location", () => {
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
