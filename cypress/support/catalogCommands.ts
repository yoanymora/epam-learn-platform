import CatalogPage from "../pages/catalogPage";

Cypress.Commands.add("sortCoursesVisitorsDes", (visitors) => {
	console.log("sorting...");
	return visitors.sort((a, b) => {
		console.log("iteration");
		return b - a;
	});
});

Cypress.Commands.add("goToCourseDetails", (title) => {
	cy.typeOnVisibleElement(CatalogPage.searchInput, title).then(() => {
		cy.waitForVisible(cy.get(".ItemsListWithFilter_sortingListWrapper__VVIE2")).then(() => {
			const cleanCodeCourseElement = CatalogPage.courseTitles.contains(title);
			cy.waitForVisible(cleanCodeCourseElement).then(() => {
				cy.clickOnVisibleElement(cleanCodeCourseElement);
			});
		});
	});
});

Cypress.Commands.add("filterCoursesByLanguage", (language) => {
	CatalogPage.filterPanel
		.find("h6:contains('Language')")
		.parents(".uui-label-top")
		.find('div[role="option"] div.uui-input-label')
		.contains(language)
		.click();
});

Cypress.Commands.add("getCoursesBy", (badge) => {
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
});

Cypress.Commands.add("sortCoursesVisitorsDes", (visitors) => {
	console.log("sorting...");
	return visitors.sort((a, b) => {
		console.log("iteration");
		return b - a;
	});
});

Cypress.Commands.add("sortCoursesByVisitors", () => {
	cy.fixture("urls.json").then((fixture) => {
		cy.intercept(fixture.sortCourses.sortByEnrolled).as("sortByEnrolled");
		cy.visitAndWaitForLoad(fixture.sortCourses.sortByEnrolled, CatalogPage.distinctiveSelector);
	});
	cy.wait("@sortByEnrolled").then((interception) => {
		expect(interception.request.query["sorting"]).to.include("ENROLLED");
		expect(interception.response).to.have.property("statusCode", 200);
	});
});
