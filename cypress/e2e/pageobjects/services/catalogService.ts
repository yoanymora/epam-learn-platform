import CatalogPage from "../pages/catalogPage";

class CatalogService {
	getCourseByTitle(title: string) {
		return CatalogPage.courseTitle.contains(title);
	}

	filterCoursesByLanguage(language: string) {
		CatalogPage.filterPanel
			.find("h6:contains('Language')")
			.parents(".uui-label-top")
			.find('div[role="option"] div.uui-input-label')
			.contains(language)
			.click();
	}

	/**
	 * Returns an array of language texts found on course badges.
	 * Resolves after the selector yields all badge elements and their texts are collected.
	 */
	getCoursesLanguage(): Cypress.Chainable<Array<string>> {
		let languages: Array<string> = [];
		return CatalogPage.allCoursesLanguageBadge.then(($badges) => {
			languages = [...$badges].map((badge) => badge.innerText);
			return languages;
		});
	}
}

export default new CatalogService();
