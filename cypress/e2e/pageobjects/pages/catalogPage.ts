import PageFactory from "./pageFactory";

class CatalogPage extends PageFactory {
	constructor() {
		super(Cypress.env("catalogUrl"));
	}

	get catalogBody() {
		return cy.get("div.ExplorePage");
	}

	get filterPanel() {
		return cy.get(
			"div.ExploreFilterPanel_filterPanel__jXe37 > div.ExploreFilterPanel_container__biu4v"
		);
	}

	get filterTitle() {
		return this.filterPanel.find("h6");
	}

	get courseList() {
		return cy.get("div.ItemsListWithFilter_sortingListWrapper__VVIE2");
	}

	get allCourses() {
		return cy.get(
			".ItemsListWithFilter_sortingListWrapper__VVIE2 > div > div > div.CatalogVisibleRows_itemContainer__fM4NY"
		);
	}

	get allCoursesLanguageBadge() {
		return cy.get('[data-testid="label-language"] .OverflowedTypography_content__wo27b');
	}

	get courseCard() {
		return cy.get(
			"div.CatalogVisibleRows_itemContainer__fM4NY > a.CatalogCard_catalogCardAnchor__wzY4P > div.CatalogCard_catalogCard__BnLX-"
		);
	}

	get courseTitle() {
		return this.courseCard.find("div.CatalogCardHeaderBlock_catalogCardHeaderBlock__xOzxc h3");
	}

	get courseArchetype() {
		return this.courseCard.find('[data-testid="test-archetype-badge"]');
	}
}

export default new CatalogPage();
