import CatalogPage from "../pageobjects/pages/catalogPage";
import myAccountPage from "../pageobjects/pages/myAccountPage";
import CatalogService from "../pageobjects/services/catalogService";

describe("Catalog Page", { tags: "@public" }, () => {
	beforeEach(() => {
		cy.reload(true);
		cy.visitAndWaitForLoad(CatalogPage.url, CatalogPage.distinctiveSelector);
	});

	it("Filter courses by language", () => {
		CatalogService.getCoursesLanguage().then((coursesLanguages) => {
			expect(new Set(coursesLanguages).size).to.be.greaterThan(0);
		});
		CatalogService.filterCoursesByLanguage("English");
		CatalogService.getCoursesLanguage().then((coursesLanguages) => {
			expect(new Set(coursesLanguages).size).to.be.equal(1);
		});
	});

	it("Sort courses by enrolled", () => {
		CatalogService.getCoursesVisitors().then((coursesVisitors) => {
			const unsortedCorusesVisitors = Array.from(coursesVisitors);
			CatalogService.sortCoursesVisitorsAsc(coursesVisitors);
			expect(unsortedCorusesVisitors).not.to.have.ordered.members(coursesVisitors);
		});
		CatalogService.sortCoursesByVisitors();
		CatalogService.getCoursesVisitors().then((coursesVisitors) => {
			const unsortedCorusesVisitors = Array.from(coursesVisitors);
			CatalogService.sortCoursesVisitorsAsc(coursesVisitors);
			expect(unsortedCorusesVisitors).to.have.ordered.members(coursesVisitors);
		});
	});
});
