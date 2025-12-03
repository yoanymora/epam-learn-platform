import MyAccountPage from "../pages/myAccountPage";
import Common from "./common";

class MyAccountService {
	changeLocationTo(location: string) {
		Common.waitForVisible(MyAccountPage.profileDropdownButton);
		MyAccountPage.profileDropdownButton.click();
		Common.waitForVisible(MyAccountPage.profileDropdownBody);
		Common.waitForVisible(MyAccountPage.editLocationModalTrigger);
		MyAccountPage.editLocationModalTrigger.click();
		Common.waitForVisible(MyAccountPage.locationModalInput);
		Common.fillInput(MyAccountPage.locationModalInput, location);
		Common.waitForVisible(MyAccountPage.locationOption);
		MyAccountPage.locationOption.first().should("contain.text", location);
		MyAccountPage.locationOption.first().click();
		Common.waitForVisible(MyAccountPage.selectLocationButton);
		MyAccountPage.selectLocationButton.click();
		MyAccountPage.locationModalInput.should("not.exist");
		MyAccountPage.currentUserLocation.should("not.exist");
		Common.waitForVisible(MyAccountPage.userCard);
	}
}

export default new MyAccountService();
