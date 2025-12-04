import CatalogPage from "../pageobjects/pages/catalogPage";
import CatalogService from "../pageobjects/services/catalogService";

describe("Public User", { tags: "@public" }, () => {
	beforeEach(() => {
		cy.reload(true);
		cy.visitAndWaitForLoad(CatalogPage.url, CatalogPage.distinctiveSelector);
	});

	it("Filter courses by language", () => {
		CatalogService.getCoursesBy("language").then((coursesLanguages) => {
			expect(new Set(coursesLanguages).size).to.be.greaterThan(0);
		});
		CatalogService.filterCoursesByLanguage("English");
		CatalogService.getCoursesBy("language").then((coursesLanguages) => {
			expect(new Set(coursesLanguages).size).to.be.equal(1);
		});
	});

	it("Sort courses by enrolled", () => {
		CatalogService.getCoursesBy("visitors").then((coursesVisitors) => {
			const unsortedCorusesVisitors = Array.from(coursesVisitors);
			CatalogService.sortCoursesVisitorsDes(coursesVisitors);
			expect(unsortedCorusesVisitors).not.to.have.ordered.members(coursesVisitors);
		});
		CatalogService.sortCoursesByVisitors();
		CatalogService.getCoursesBy("visitors").then((coursesVisitors) => {
			const unsortedCorusesVisitors = Array.from(coursesVisitors);
			CatalogService.sortCoursesVisitorsDes(coursesVisitors);
			expect(unsortedCorusesVisitors).to.have.ordered.members(coursesVisitors);
		});
	});
});
