import 'cypress-mochawesome-reporter/register';
import './commands';

afterEach(function () {
  if (this.currentTest?.state === 'failed') {
    const testName = this.currentTest.title.replace(/\s+/g, '_');
    const suiteName = this.currentTest.titlePath()[0]?.replace(/\s+/g, '_') ?? 'unknown_suite';
    cy.screenshot(`${suiteName}--${testName}`, { capture: 'fullPage' });
  }
});

