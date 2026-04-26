export class HomePage {
  private readonly selectors = {
    body: 'body',
    sliderCarousel: '#slider-carousel',
    footer: '#footer',
    scrollUpButton: '#scrollUp',
    subscriptionHeader: '.single-widget > h2',
    subscribeEmail: '#susbscribe_email',
    subscribeButton: '#subscribe',
    subscribeSuccess: '#success-subscribe',
    signupLoginLink: 'Signup / Login',
    productsLink: 'Products',
    cartLink: 'Cart',
    contactUsLink: 'Contact us',
    testCasesLink: 'Test Cases',
    recommendedItems: '.recommended_items',
    recommendedItemsTitle: '.recommended_items .title',
    categorySidebar: '.left-sidebar',
    womenCategory: 'Women',
    menCategory: 'Men',
  } as const;

  visit(): void {
    cy.visit('/');
  }

  verifyHomePageVisible(): Cypress.Chainable<any> {
    return cy.get(this.selectors.body).should('be.visible');
  }

  clickSignupLogin(): void {
    cy.contains(this.selectors.signupLoginLink).click();
  }

  clickProducts(): void {
    cy.contains(this.selectors.productsLink).click();
  }

  clickCart(): void {
    cy.contains(this.selectors.cartLink).click();
  }

  clickContactUs(): void {
    cy.contains(this.selectors.contactUsLink).click();
  }

  clickTestCases(): void {
    cy.contains(this.selectors.testCasesLink).click();
  }

  scrollToFooter(): void {
    cy.get(this.selectors.footer).scrollIntoView();
  }

  verifyFooterVisible(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.footer).should('be.visible');
  }

  subscribeWithEmail(email: string): void {
    this.scrollToFooter();
    cy.get(this.selectors.subscribeEmail).type(email);
    cy.get(this.selectors.subscribeButton).click();
  }

  verifySubscriptionSuccess(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get(this.selectors.subscribeSuccess)
      .should('be.visible')
      .and('contain.text', 'You have been successfully subscribed!');
  }

  clickScrollUp(): void {
    cy.get(this.selectors.scrollUpButton).click();
  }

  verifySliderVisible(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy
      .get(this.selectors.sliderCarousel)
      .should('be.visible')
      .and('contain.text', 'Full-Fledged practice website for Automation Engineers');
  }

  verifyRecommendedItemsVisible(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.recommendedItems).scrollIntoView();
  }

  verifyCategorySidebarVisible(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.selectors.categorySidebar).should('be.visible').and('contain.text', 'Category');
  }

  clickWomenCategory(): void {
    cy.contains(this.selectors.womenCategory).click();
  }

  clickMenCategory(): void {
    cy.contains(this.selectors.menCategory).click();
  }
}

export const homePage = new HomePage();

