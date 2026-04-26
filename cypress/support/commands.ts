import { UserCredentials } from './types';

/**
 * Build API request body from user credentials to avoid duplication
 */
const buildApiBody = (user: UserCredentials): Record<string, string> => ({
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
 * Resolve gender selector based on user title
 */
const getGenderSelector = (title: string): string =>
  title === 'Mrs' ? '#id_gender2' : '#id_gender1';

Cypress.Commands.add('visitHomepage', () => {
  cy.visit('/');
  cy.get('body').should('be.visible');
});

Cypress.Commands.add('searchProduct', (searchTerm: string) => {
  cy.get('#search_product').should('be.visible').clear().type(searchTerm);
  cy.get('#submit_search').should('be.visible').click();
});

Cypress.Commands.add('validateSearchResults', (expectedCount: number) => {
  cy.get('.title').should('contain.text', 'Searched Products');
  cy.get('.product-image-wrapper')
    .should('have.length', expectedCount)
    .and('be.visible');
});

Cypress.Commands.add('addProductToCart', (index: number) => {
  cy.get('.product-image-wrapper')
    .eq(index - 1)
    .scrollIntoView()
    .within(() => {
      cy.get('.add-to-cart').first().click();
    });
  cy.get('#cartModal').should('be.visible');
});

Cypress.Commands.add('validateCartModal', () => {
  cy.get('#cartModal')
    .should('be.visible')
    .within(() => {
      cy.contains('Added!').should('be.visible');
      cy.contains('Your product has been added to cart.').should('be.visible');
    });
});

Cypress.Commands.add('getElementAndAssertText', (selector: string, expectedText: string) => {
  return cy
    .get(selector)
    .should('be.visible')
    .and('contain.text', expectedText);
});

Cypress.Commands.add('signupUser', (user: UserCredentials) => {
  cy.contains('Signup / Login').click();
  cy.get('[data-qa="signup-name"]').type(user.name);
  cy.get('[data-qa="signup-email"]').type(user.email);
  cy.get('[data-qa="signup-button"]').click();

  cy.get(getGenderSelector(user.title)).click();
  cy.get('[data-qa="password"]').type(user.password);
  cy.get('[data-qa="days"]').select(user.days);
  cy.get('[data-qa="months"]').select(user.months);
  cy.get('[data-qa="years"]').select(user.years);

  cy.get('[data-qa="first_name"]').type(user.firstName);
  cy.get('[data-qa="last_name"]').type(user.lastName);
  cy.get('[data-qa="address"]').type(user.address);
  cy.get('[data-qa="country"]').select(user.country);
  cy.get('[data-qa="state"]').type(user.state);
  cy.get('[data-qa="city"]').type(user.city);
  cy.get('[data-qa="zipcode"]').type(user.zipcode);
  cy.get('[data-qa="mobile_number"]').type(user.mobile);
  cy.get('[data-qa="create-account"]').click();

  cy.get('[data-qa="account-created"]').should('contain.text', 'Account Created!');
  cy.get('[data-qa="continue-button"]').click();
});

Cypress.Commands.add('fillLoginForm', (user: Pick<UserCredentials, 'email' | 'password'>) => {
  cy.get('[data-qa="login-email"]').type(user.email);
  cy.get('[data-qa="login-password"]').type(user.password);
  cy.get('[data-qa="login-button"]').click();
});

Cypress.Commands.add('fillSignupForm', (user: Pick<UserCredentials, 'name' | 'email'>) => {
  cy.get('[data-qa="signup-name"]').type(user.name);
  cy.get('[data-qa="signup-email"]').type(user.email);
  cy.get('[data-qa="signup-button"]').click();
});

Cypress.Commands.add('fillAccountInformationForm', (user: UserCredentials) => {
  cy.get(getGenderSelector(user.title)).click();
  cy.get('[data-qa="password"]').type(user.password);
  cy.get('[data-qa="days"]').select(user.days);
  cy.get('[data-qa="months"]').select(user.months);
  cy.get('[data-qa="years"]').select(user.years);
  cy.get('[data-qa="first_name"]').type(user.firstName);
  cy.get('[data-qa="last_name"]').type(user.lastName);
  cy.get('[data-qa="address"]').type(user.address);
  cy.get('[data-qa="country"]').select(user.country);
  cy.get('[data-qa="state"]').type(user.state);
  cy.get('[data-qa="city"]').type(user.city);
  cy.get('[data-qa="zipcode"]').type(user.zipcode);
  cy.get('[data-qa="mobile_number"]').type(user.mobile);
  cy.get('[data-qa="create-account"]').click();
});

Cypress.Commands.add('fillPaymentDetails', (user: Pick<UserCredentials, 'name'>) => {
  cy.get('[data-qa="name-on-card"]').type(user.name);
  cy.get('[data-qa="card-number"]').type('4111111111111111');
  cy.get('[data-qa="cvc"]').type('123');
  cy.get('[data-qa="expiry-month"]').type('12');
  cy.get('[data-qa="expiry-year"]').type('2026');
  cy.get('[data-qa="pay-button"]').click();
});

Cypress.Commands.add('deleteUserByAPI', (user: Pick<UserCredentials, 'email' | 'password'>) => {
  cy.request({
    method: 'DELETE',
    url: `${Cypress.env('apiBaseUrl')}/deleteAccount`,
    failOnStatusCode: false,
    form: true,
    body: {
      email: user.email,
      password: user.password,
    },
  });
});

Cypress.Commands.add('registerUserByAPI', (user: UserCredentials) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}/createAccount`,
    form: true,
    body: buildApiBody(user),
  });
});

Cypress.Commands.add('createAccountViaAPI', (user: UserCredentials) => {
  return cy.request({
    method: 'POST',
    url: `${Cypress.env('apiBaseUrl')}/createAccount`,
    form: true,
    body: buildApiBody(user),
  });
});

Cypress.Commands.add('downloadFile', (url: string, directory: string, filename: string) => {
  return cy
    .request({
      method: 'GET',
      url,
      encoding: 'binary',
    })
    .then((response) => {
      const filePath = `${directory}/${filename}`;
      cy.writeFile(filePath, response.body, 'binary');
      return cy.wrap(filePath);
    });
});

