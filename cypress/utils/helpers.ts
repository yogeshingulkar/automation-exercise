/**
 * Validates that all product elements contain the expected keyword (case-insensitive)
 * @param keyword - keyword to search for in product names
 * @param productSelector - selector for product containers (default: '.product-image-wrapper')
 */
export const validateKeywordInProducts = (
  keyword: string,
  productSelector: string = '.product-image-wrapper'
): void => {
  cy.get(productSelector).each(($product) => {
    cy.wrap($product)
      .find('.productinfo p')
      .invoke('text')
      .then((text) => {
        const normalizedText = text.trim().toLowerCase();
        const normalizedKeyword = keyword.toLowerCase();
        expect(normalizedText).to.contain(normalizedKeyword);
      });
  });
};

/**
 * Handles dynamic dropdown selection by visible text with retry logic
 * @param selector - dropdown CSS selector
 * @param text - visible text to select
 */
export const selectDropdownByText = (selector: string, text: string): void => {
  cy.get(selector)
    .should('be.visible')
    .and('not.be.disabled')
    .select(text, { force: false })
    .should('contain.text', text);
};

/**
 * Reusable assertion to verify element is visible and contains expected text
 * @param selector - CSS selector
 * @param text - expected text content
 */
export const assertVisibleAndContains = (
  selector: string,
  text: string
): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get(selector).should('be.visible').and('contain.text', text);
};

/**
 * Reusable assertion to verify element is visible and has exact text
 * @param selector - CSS selector
 * @param text - exact expected text
 */
export const assertVisibleAndExactText = (
  selector: string,
  text: string
): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.get(selector).should('be.visible').and('have.text', text);
};

/**
 * Takes a manual screenshot with a descriptive name
 * @param name - screenshot file name
 * @param options - optional Cypress screenshot options
 */
export const takeScreenshot = (
  name: string,
  options?: Partial<Cypress.ScreenshotOptions>
): void => {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  cy.screenshot(`${name}_${timestamp}`, {
    capture: 'viewport',
    ...options,
  });
};

import { UserCredentials } from '../support/types';

/**
 * Build API request payload from UserCredentials
 * @param user - user credentials object
 * @returns API-compatible form body
 */
export const buildApiPayload = (user: UserCredentials): Record<string, string> => ({
  name: user.name,
  email: user.email,
  password: user.password,
  title: user.title,
  birth_date: user.days,
  birth_month: user.months,
  birth_year: user.years,
  firstname: user.firstName,
  lastname: user.lastName,
  company: user.company,
  address1: user.address,
  address2: user.address,
  country: user.country,
  zipcode: user.zipcode,
  state: user.state,
  city: user.city,
  mobile_number: user.mobile,
});

/**
 * Formats user data for API requests (legacy, use buildApiPayload)
 * @param user - user credentials object
 * @returns formatted form body
 */
export const formatUserForAPI = (
  user: Record<string, string>
): Record<string, string> => ({
  name: user.name,
  email: user.email,
  password: user.password,
  title: user.title,
  birth_date: user.days,
  birth_month: user.months,
  birth_year: user.years,
  firstname: user.firstName,
  lastname: user.lastName,
  company: user.company,
  address1: user.address,
  address2: user.address,
  country: user.country,
  zipcode: user.zipcode,
  state: user.state,
  city: user.city,
  mobile_number: user.mobile,
});

