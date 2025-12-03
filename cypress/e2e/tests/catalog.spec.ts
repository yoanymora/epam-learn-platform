import CatalogPage from "../pageobjects/pages/catalogPage";
import CatalogService from "../pageobjects/services/catalogService";

describe("Catalog Page", { tags: "@public" }, () => {
	before(() => {
		CatalogPage.visit();
		cy.url().should("include", Cypress.env("catalogUrl"));
		CatalogPage.catalogBody.should("be.visible");
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
});
