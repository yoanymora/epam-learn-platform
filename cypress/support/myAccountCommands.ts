import MyAccountPage from "../pages/myAccountPage";

Cypress.Commands.add("changeLocationTo", (location) => {
	cy.clickOnVisibleElement(MyAccountPage.profileDropdownButton).then(() => {
		cy.waitForVisible(MyAccountPage.profileDropdownBody).then(() => {
			cy.clickOnVisibleElement(MyAccountPage.editLocationModalTrigger).then(() => {
				cy.typeOnVisibleElement(MyAccountPage.locationModalInput, location).then(() => {
					cy.waitForVisible(MyAccountPage.locationOption).then(() => {
						MyAccountPage.locationOption.first().should("contain.text", location);
						MyAccountPage.locationOption.first().click();
						cy.clickOnVisibleElement(MyAccountPage.selectLocationButton).then(() => {
							cy.fixture("urls.json").then((fixture) => {
								cy.intercept(fixture.endpoints.currentUser).as(
									"getCurrentUserProfile"
								);
								MyAccountPage.locationModalInput.should("not.exist");
								MyAccountPage.currentUserLocation.should("not.exist");
								cy.waitForVisible(MyAccountPage.userCard).then(() => {
									cy.wait("@getCurrentUserProfile").then((interception) => {
										expect(interception.response?.body?.location).to.equal(
											location
										);
									});
								});
							});
						});
					});
				});
			});
		});
	});
});
