import MyAccountPage from "../pages/myAccountPage";
import Common from "./common";

class MyAccountService {
	changeLocationTo(location: string) {
		cy.clickOnVisibleElement(MyAccountPage.profileDropdownButton);
		Common.waitForVisible(MyAccountPage.profileDropdownBody);
		cy.clickOnVisibleElement(MyAccountPage.editLocationModalTrigger);
		cy.typeOnVisibleElement(MyAccountPage.locationModalInput, location);
		Common.waitForVisible(MyAccountPage.locationOption);
		MyAccountPage.locationOption.first().should("contain.text", location);
		MyAccountPage.locationOption.first().click();
		cy.clickOnVisibleElement(MyAccountPage.selectLocationButton);
		MyAccountPage.locationModalInput.should("not.exist");
		MyAccountPage.currentUserLocation.should("not.exist");
		Common.waitForVisible(MyAccountPage.userCard);
	}
}

export default new MyAccountService();
