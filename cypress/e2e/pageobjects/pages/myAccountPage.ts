import PageFactory from "./pageFactory";

class MyAccountPage extends PageFactory {
	constructor() {
		super(Cypress.env("myAccountUrl"));
	}

	get currentUserLocation() {
		return cy.get(".UserGeneralInfo_param__Jl-V7 > .UserGeneralInfo_list__7bPJe > div");
	}

	get userCard() {
		return cy.get(".MyProfileCard_container__j7XTu");
	}

	get profileDropdown() {
		return cy.get("button.fizvnn.-clickable.AppHeader_action__FbpJW");
	}

	get editLocationModalTrigger() {
		return cy.get("div > div > div:nth-child(2) > div > div > div.wxehuT > div:nth-child(5)");
	}

	get locationModalInput() {
		return cy.get('div[aria-modal="true"] > div > div > div > input[type="search"]');
	}

	get locationOption() {
		return cy.get('div[aria-modal="true"] > div > div > div > div > div > div[role="option"]');
	}

	get selectLocationButton() {
		return cy.get(
			"#app-container > div.gWWgCJ._71ZdkV > div:nth-child(3) > div > div.B-MREe.D2nU0P.uui-modal-footer > button.uui-button-box.uui-enabled.-clickable.-CwFzM.pufwib.uui-button.uui-fill-solid.uui-color-primary.uui-size-36 > div"
		);
	}
}

export default new MyAccountPage();
