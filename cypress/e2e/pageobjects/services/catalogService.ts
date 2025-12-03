import CatalogPage from "../pages/catalogPage";

class CatalogService {
	goToCourseDetails(title: string): void {
		CatalogPage.searchInput.should("be.visible");
		CatalogPage.searchInput.type(title);
		CatalogPage.courseTitles.contains(title).should("be.visible");
		CatalogPage.courseTitles.contains(title).click();
	}

	filterCoursesByLanguage(language: string) {
		CatalogPage.filterPanel
			.find("h6:contains('Language')")
			.parents(".uui-label-top")
			.find('div[role="option"] div.uui-input-label')
			.contains(language)
			.click();
	}

	getCoursesLanguage(): Cypress.Chainable<Array<string>> {
		let languages: Array<string> = [];
		return CatalogPage.allCoursesLanguageBadge.then(($badges) => {
			languages = [...$badges].map((badge) => badge.innerText);
			return languages;
		});
	}

	getCoursesVisitors(): Cypress.Chainable<Array<number>> {
		let visitors: Array<number> = [];
		return CatalogPage.allCoursesVisitorsBadge.then(($badges) => {
			visitors = [...$badges].map((badge) => Number(badge.innerText));
			return visitors;
		});
	}

	sortCoursesVisitorsAsc(visitors: Array<number>): Array<number> {
		return visitors.sort((a, b) => b - a);
	}

	sortCoursesByVisitors() {
		cy.fixture("sortUrls.json").then((fixture) => {
			cy.intercept(fixture.sortByEnrolled).as("sortByEnrolled");
			cy.visitAndWaitForLoad(fixture.sortByEnrolled, CatalogPage.distinctiveSelector);
		});
		cy.wait("@sortByEnrolled").then((interception) => {
			expect(interception.request.query["sorting"]).to.include("ENROLLED");
			expect(interception.response).to.have.property("statusCode", 200);
		});
	}
}

export default new CatalogService();
