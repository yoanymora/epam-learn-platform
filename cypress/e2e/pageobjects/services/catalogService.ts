import CatalogPage from "../pages/catalogPage";
import Common from "./common";

class CatalogService {
	goToCourseDetails(title: string) {
		cy.typeOnVisibleElement(CatalogPage.searchInput, title);
		Common.waitForVisible(cy.get(".ItemsListWithFilter_sortingListWrapper__VVIE2"));
		const cleanCodeCourseElement = CatalogPage.courseTitles.contains(title);
		Common.waitForVisible(cleanCodeCourseElement);
		cy.clickOnVisibleElement(cleanCodeCourseElement);
	}

	filterCoursesByLanguage(language: string) {
		CatalogPage.filterPanel
			.find("h6:contains('Language')")
			.parents(".uui-label-top")
			.find('div[role="option"] div.uui-input-label')
			.contains(language)
			.click();
	}

	getCoursesBy(
		badge: "language" | "visitors"
	): Cypress.Chainable<Array<string>> | Cypress.Chainable<Array<number>> {
		let elements: Array<any> = [];
		let selector: any;
		if (badge === "language") {
			selector = CatalogPage.allCoursesLanguageBadge;
		} else {
			selector = CatalogPage.allCoursesVisitorsBadge;
		}
		return selector.then(($badges) => {
			elements = [...$badges].map((badge) =>
				badge === "language" ? badge.innerText : Number(badge.innerText)
			);
			return elements;
		});
	}

	sortCoursesVisitorsAsc(visitors: Array<number>): Array<number> {
		return visitors.sort((a, b) => b - a);
	}

	sortCoursesByVisitors() {
		cy.fixture("urls.json").then((fixture) => {
			cy.intercept(fixture.sortCourses.sortByEnrolled).as("sortByEnrolled");
			cy.visitAndWaitForLoad(
				fixture.sortCourses.sortByEnrolled,
				CatalogPage.distinctiveSelector
			);
		});
		cy.wait("@sortByEnrolled").then((interception) => {
			expect(interception.request.query["sorting"]).to.include("ENROLLED");
			expect(interception.response).to.have.property("statusCode", 200);
		});
	}
}

export default new CatalogService();
