Feature: Public User Actions

	Scenario: Filter courses by language
		Given a public user is in the EPAM's catalog page
		And the courses listed in the page have different languages
		When the user filters the courses by English language
		Then the user only sees courses with the English language badge

	Scenario: Sort courses by quantity of people enrolled
		Given a public user is in the EPAM's catalog page
		And the courses in the page aren't sorted by the quantity of people enrolled
		When the user sort the courses by the quantity of people enrolled
		Then the page refreshes and the courses are sorted by the quantity of people enrolled in descendent order
