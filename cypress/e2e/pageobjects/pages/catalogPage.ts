import PageFactory from "./pageFactory";

class CatalogPage extends PageFactory {
	constructor() {
		super(Cypress.env("catalogUrl"), "div.ExplorePage");
	}

	get searchInput() {
		return cy.get('input[type="search"]');
	}

	get filterPanel() {
		return cy.get(
			"div.ExploreFilterPanel_filterPanel__jXe37 > div.ExploreFilterPanel_container__biu4v"
		);
	}

	get filterModal() {
		return cy.get('div[aria-modal="true"]');
	}

	get filterModalSearchInput() {
		return this.filterModal.find('input[type="search"]');
	}

	get filterModalOption() {
		return cy.get('div[role="option"] div');
	}

	get allCoursesLanguageBadge() {
		return cy.get('[data-testid="label-language"] .OverflowedTypography_content__wo27b');
	}

	get courseCard() {
		return cy.get(
			"div.CatalogVisibleRows_itemContainer__fM4NY > a.CatalogCard_catalogCardAnchor__wzY4P > div.CatalogCard_catalogCard__BnLX-"
		);
	}

	get courseTitles() {
		return this.courseCard.find("div.CatalogCardHeaderBlock_catalogCardHeaderBlock__xOzxc h3");
	}

	get allCoursesVisitorsBadge() {
		return cy.get('[data-testid="content-visitors"] .OverflowedTypography_content__wo27b');
	}
}

export default new CatalogPage();
