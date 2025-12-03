import PageFactory from "./pageFactory";

class MyLearningPage extends PageFactory {
	constructor() {
		super(Cypress.env("myLearningUrl"), ".LearningCabinetVisibleRows_container__k9mLC");
	}

	get learningCabinet() {
		return cy.get(this.distinctiveSelector);
	}

	get enrolledCoursesCards() {
		return cy.get('[data-testid="test-slider-item"]');
	}

	get enrolledCoursesTitles() {
		return this.enrolledCoursesCards.find("h5");
	}

	get activeLearningDisctintiveSelector() {
		return ".MyLearningCard_myLearningCard__-owT5";
	}

	get activeLearningUrl() {
		return Cypress.env("myActiveLearningUrl");
	}

	get noActiveLearning() {
		return cy.get(".LearningCabinetVisibleRows_notFound__NdtgU");
	}

	get activeLearningCourses() {
		return cy.get(".MyLearningCard_myLearningCard__-owT5");
	}

	get activeLearningCourseTitles() {
		return cy.get(".MyLearningCard_myLearningCard__-owT5 h3");
	}

	get leaveLearningModal() {
		return cy.get('div[aria-modal="true"]');
	}

	get leaveLearningModalReasonInput() {
		return this.leaveLearningModal.find('input[type="search"]');
	}

	get leaveLearningModalOptions() {
		return cy.get('div[role="dialog"] div[role="option"] div');
	}

	get leaveLearningModalTextarea() {
		return this.leaveLearningModal.find("textarea");
	}

	get leaveLearningModalSubmit() {
		return this.leaveLearningModal.find('[data-testid="test-submit-btn"]');
	}
}

export default new MyLearningPage();
