export class LoginPage {
  private readonly selectors = {
    loginEmail: '[data-qa="login-email"]',
    loginPassword: '[data-qa="login-password"]',
    loginButton: '[data-qa="login-button"]',
    signupName: '[data-qa="signup-name"]',
    signupEmail: '[data-qa="signup-email"]',
    signupButton: '[data-qa="signup-button"]',
    accountCreated: '[data-qa="account-created"]',
    accountDeleted: '[data-qa="account-deleted"]',
    continueButton: '[data-qa="continue-button"]',
    password: '[data-qa="password"]',
    days: '[data-qa="days"]',
    months: '[data-qa="months"]',
    years: '[data-qa="years"]',
    firstName: '[data-qa="first_name"]',
    lastName: '[data-qa="last_name"]',
    address: '[data-qa="address"]',
    country: '[data-qa="country"]',
    state: '[data-qa="state"]',
    city: '[data-qa="city"]',
    zipcode: '[data-qa="zipcode"]',
    mobile: '[data-qa="mobile_number"]',
    createAccount: '[data-qa="create-account"]',
    genderMale: '#id_gender1',
    contactName: '[data-qa="name"]',
    contactEmail: '[data-qa="email"]',
    contactSubject: '[data-qa="subject"]',
    contactMessage: '[data-qa="message"]',
    contactSubmit: '[data-qa="submit-button"]',
    contactSuccess: '.status',
    contactFormTitle: 'div.contact-form > .title',
    deleteAccount: 'Delete Account',
  } as const;

  verifyLoginUrl(): Cypress.Chainable<any> {
    return cy.url().should('eq', `${Cypress.config('baseUrl')}/login`);
  }

  fillLogin(email: string, password: string): void {
    cy.get(this.selectors.loginEmail).type(email);
    cy.get(this.selectors.loginPassword).type(password);
    cy.get(this.selectors.loginButton).click();
  }

  fillSignup(name: string, email: string): void {
    cy.get(this.selectors.signupName).type(name);
    cy.get(this.selectors.signupEmail).type(email);
    cy.get(this.selectors.signupButton).click();
  }

  fillAccountInformation(user: {
    password: string;
    days: string;
    months: string;
    years: string;
    firstName: string;
    lastName: string;
    address: string;
    country: string;
    state: string;
    city: string;
    zipcode: string;
    mobile: string;
  }): void {
    cy.get(this.selectors.genderMale).click();
    cy.get(this.selectors.password).type(user.password);
    cy.get(this.selectors.days).select(user.days);
    cy.get(this.selectors.months).select(user.months);
    cy.get(this.selectors.years).select(user.years);
    cy.get(this.selectors.firstName).type(user.firstName);
    cy.get(this.selectors.lastName).type(user.lastName);
    cy.get(this.selectors.address).type(user.address);
    cy.get(this.selectors.country).select(user.country);
    cy.get(this.selectors.state).type(user.state);
    cy.get(this.selectors.city).type(user.city);
    cy.get(this.selectors.zipcode).type(user.zipcode);
    cy.get(this.selectors.mobile).type(user.mobile);
    cy.get(this.selectors.createAccount).click();
  }

  verifyAccountCreated(): Cypress.Chainable<any> {
    return cy
      .get(this.selectors.accountCreated)
      .should('contain.text', 'Account Created!');
  }

  clickContinue(): void {
    cy.get(this.selectors.continueButton).click();
  }

  verifyAccountDeleted(): Cypress.Chainable<any> {
    return cy
      .get(this.selectors.accountDeleted)
      .should('be.visible')
      .and('contain.text', 'Account Deleted!');
  }

  verifyLoggedInAs(name: string): void {
    cy.contains(`Logged in as ${name}`).should('be.visible');
  }

  clickLogout(): void {
    cy.contains('Logout').click();
  }

  fillContactForm(name: string, email: string, subject: string, message: string): void {
    cy.get(this.selectors.contactName).type(name);
    cy.get(this.selectors.contactEmail).type(email);
    cy.get(this.selectors.contactSubject).type(subject);
    cy.get(this.selectors.contactMessage).type(message);
  }

  submitContactForm(): void {
    cy.get(this.selectors.contactSubmit).click();
  }

  verifyContactSuccess(): Cypress.Chainable<any> {
    return cy
      .get(this.selectors.contactSuccess)
      .should('be.visible')
      .and('contain.text', 'Success! Your details have been submitted successfully.');
  }

  verifyContactFormTitle(): Cypress.Chainable<any> {
    return cy
      .get(this.selectors.contactFormTitle)
      .should('be.visible')
      .and('contain.text', 'Get In Touch');
  }

  getContactFormFileInput(): string {
    return ':nth-child(6) > .form-control';
  }

  clickDeleteAccount(): void {
    cy.contains(this.selectors.deleteAccount).click();
  }
}

export const loginPage = new LoginPage();

