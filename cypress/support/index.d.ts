/// <reference types="cypress" />

import { UserCredentials } from './types';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Visit the automation exercise homepage
       */
      visitHomepage(): Chainable<void>;

      /**
       * Search for a product by keyword
       * @param searchTerm - product name or keyword
       */
      searchProduct(searchTerm: string): Chainable<void>;

      /**
       * Validate search results count and visibility
       * @param expectedCount - expected number of results
       */
      validateSearchResults(expectedCount: number): Chainable<void>;

      /**
       * Add a product to cart by its index
       * @param index - 1-based product index
       */
      addProductToCart(index: number): Chainable<void>;

      /**
       * Validate that the cart modal is visible
       */
      validateCartModal(): Chainable<void>;

      /**
       * Get element and assert text contains expected value
       * @param selector - CSS selector
       * @param expectedText - text to match
       */
      getElementAndAssertText(selector: string, expectedText: string): Chainable<JQuery<HTMLElement>>;

      /**
       * Sign up a new user with full registration flow
       * @param user - user data object
       */
      signupUser(user: UserCredentials): Chainable<void>;

      /**
       * Fill login form and submit
       * @param user - user credentials
       */
      fillLoginForm(user: Pick<UserCredentials, 'email' | 'password'>): Chainable<void>;

      /**
       * Fill signup form (name + email)
       * @param user - user credentials
       */
      fillSignupForm(user: Pick<UserCredentials, 'name' | 'email'>): Chainable<void>;

      /**
       * Fill account information form after signup
       * @param user - full user data
       */
      fillAccountInformationForm(user: UserCredentials): Chainable<void>;

      /**
       * Fill payment details on checkout
       * @param user - user data for payment
       */
      fillPaymentDetails(user: Pick<UserCredentials, 'name'>): Chainable<void>;

      /**
       * Delete user account via API
       * @param user - user credentials
       */
      deleteUserByAPI(user: Pick<UserCredentials, 'email' | 'password'>): Chainable<void>;

      /**
       * Register user via API
       * @param user - full user data
       */
      registerUserByAPI(user: UserCredentials): Chainable<void>;

      /**
       * Create account via API and return response
       * @param user - full user data
       */
      createAccountViaAPI(user: UserCredentials): Chainable<Cypress.Response<unknown>>;

      /**
       * Download file from URL and save to disk
       * @param url - file URL
       * @param directory - target directory
       * @param filename - file name
       */
      downloadFile(url: string, directory: string, filename: string): Chainable<string>;
    }
  }
}

export {};
