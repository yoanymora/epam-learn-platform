import CatalogPage from "../pageobjects/pages/catalogPage";
import myAccountPage from "../pageobjects/pages/myAccountPage";
import CatalogService from "../pageobjects/services/catalogService";

describe("Catalog Page", { tags: "@public" }, () => {
	before(() => {
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

	// it("Get all courses in catalog", () => {
	// 	cy.intercept('https://learn.epam.com/catalog').as('getMyAccountPage');
	// 	CatalogPage.visit();
	// 	// myAccountPage.visit();
	// 	cy.wait('@getMyAccountPage').then((interception) => {
	// 		console.log(interception.response)
	// 	});
	// });
});
