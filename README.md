# Epam's Learn Platform Automation Testing Task

This project pretends to be a practice with Cypress and TypeScript to test the EPAM's Learn Plataform. The list of main tools used are:

- [Cypress](https://docs.cypress.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Cypress Mochawesome Reporter](https://www.npmjs.com/package/cypress-mochawesome-reporter)
- [ESLint](https://eslint.org/)
- [prettier](https://prettier.io/)

The tests where splitted into Public (@public) and Logged (@logged) user suites. Due to private credentials handling for logged user tests only the public tests are runned within the [Github Action](https://docs.github.com/es/actions/get-started/understand-github-actions) related to this repo.

**If you want to run the @logged tests you must create a .env file inside the root folder of this repo to save the keys _DISCORD_USER_EMAIL_ and _DISCORD_USER_PASSWORD_.**

**-->** The EPAM's Learn platform, and every other domain related to EPAM, handle complex authentication, thus the @logged tests are also pretty flaky. Due this flakiness and the log in nature some workarounds have been used for @logged tests suchs as create multiple individual tests to handle the [Cypress Origin error](https://docs.cypress.io/app/guides/cross-origin-testing)**<--**

<h3>Commands</h3>

<h4>Run tests</h4>

- All tests in headless mode: `npx cypress run`

- Tests for public users: `npx cypress run --env grepTags="@public"`

- Tests for logged users: `npx cypress run --env grepTags="@logged"`

**Every time the tests run new reports are created under the **/cypress/reports** folder.**

<h4>Run lints</h4>

- Check for lint errors: `npm run lint`

- Fix lint errors: `npm run lint:fix`

- Check for format errors: `npm run prettier`

- Fix format errors: `npm run prettier:fix`

**Commiting changes triggers the commands to check for lints and format errors.**
