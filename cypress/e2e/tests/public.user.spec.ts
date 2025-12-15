import CatalogPage from "../../pages/catalogPage";
import Common from "../../actions/common";
describe("Public User", { tags: "@public" }, () => {
	beforeEach(() => {
		cy.reload(true);
		cy.visitAndWaitForLoad(CatalogPage.url, CatalogPage.distinctiveSelector);
	});

	it.skip("Filter courses by language", () => {
		cy.getCoursesBy("language").then((coursesLanguages) => {
			expect(new Set(coursesLanguages).size).to.be.greaterThan(0);
		});
		cy.filterCoursesByLanguage("English");
		cy.getCoursesBy("language").then((coursesLanguages) => {
			expect(new Set(coursesLanguages).size).to.be.equal(1);
		});
	});

	it("Sort courses by enrolled", () => {
		cy.getCoursesBy("visitors").then((coursesVisitors) => {
			const unsortedCorusesVisitors = Array.from(coursesVisitors);
			cy.sortCoursesVisitorsDes(coursesVisitors);
			expect(unsortedCorusesVisitors).not.to.have.ordered.members(coursesVisitors);
		});
		cy.sortCoursesByVisitors();
		cy.getCoursesBy("visitors").then((coursesVisitors) => {
			const unsortedCorusesVisitors = Array.from(coursesVisitors);
			cy.sortCoursesVisitorsDes(coursesVisitors);
			expect(unsortedCorusesVisitors).to.have.ordered.members(coursesVisitors);
		});
	});
});
