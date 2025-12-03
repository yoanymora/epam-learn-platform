import MyAccountPage from "../pageobjects/pages/myAccountPage";
import MyAccountService from "../pageobjects/services/myAccountService";

describe("My Account", { tags: "@logged" }, () => {
	before(() => {
		Cypress.session.clearAllSavedSessions();
		cy.reload(true);
		cy.logInWithDiscord();
	});

	it("A user changes its location", function () {
		cy.intercept("https://learn.epam.com/account/profile").as("getMyAccountPage");
		cy.visitAndWaitForLoad(MyAccountPage.url, MyAccountPage.distinctiveSelector);
		cy.wait("@getMyAccountPage").then((interception) => {
			expect(interception.response).to.have.property("statusCode", 200);
		});
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
