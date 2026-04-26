export class ProductsPage {
  private readonly selectors = {
    title: '.title',
    allProductsTitle: 'All Products',
    searchedProductsTitle: 'Searched Products',
    searchInput: '#search_product',
    searchButton: '#submit_search',
    productWrapper: '.product-image-wrapper',
    productInfo: '.productinfo p',
    viewProductLink: 'View Product',
    addToCartButton: '.add-to-cart',
    productDetails: '.product-details',
    quantityInput: '#quantity',
    brandSidebar: '.brands_products',
    reviewForm: '#name',
    reviewEmail: '#email',
    reviewTextarea: 'textarea#review',
    reviewSubmit: '#button-review',
    reviewSuccess: '.alert-success',
  } as const;

  verifyAllProductsPage(): Cypress.Chainable<any> {
    return cy.url().should('eq', `${Cypress.config('baseUrl')}/products`);
  }

  verifyTitle(text: string): Cypress.Chainable<any> {
    return cy.get(this.selectors.title).should('be.visible').and('contain.text', text);
  }

  searchForProduct(searchTerm: string): void {
    cy.get(this.selectors.searchInput).should('be.visible').clear().type(searchTerm);
    cy.get(this.selectors.searchButton).should('be.visible').click();
  }

  getProductCount(): Cypress.Chainable<number> {
    return cy.get(this.selectors.productWrapper).its('length');
  }

  verifyProductCount(expectedCount: number): void {
    cy.get(this.selectors.productWrapper)
      .should('have.length', expectedCount)
      .and('be.visible');
  }

  clickViewProduct(index: number): void {
    cy.get(this.selectors.productWrapper)
      .eq(index - 1)
      .contains(this.selectors.viewProductLink)
      .click();
  }

  verifyProductDetailsVisible(): Cypress.Chainable<any> {
    return cy.get(this.selectors.productDetails).should('be.visible');
  }

  verifyProductInformationElements(): void {
    cy.get('.product-information > h2').should('be.visible');
    cy.get('.product-information > :nth-child(3)').should('be.visible');
    cy.get(':nth-child(5) > span').should('be.visible');
    cy.get('.product-information > :nth-child(6)').should('be.visible');
    cy.get('.product-information > :nth-child(7)').should('be.visible');
    cy.get('.product-information > :nth-child(8)').should('be.visible');
  }

  setQuantity(quantity: string): void {
    cy.get(this.selectors.quantityInput).clear().type(quantity);
  }

  verifyBrandSidebarVisible(): Cypress.Chainable<any> {
    return cy.get(this.selectors.brandSidebar).should('be.visible');
  }

  clickBrand(brandName: string): void {
    cy.contains(brandName).click();
  }

  verifyBrandTitle(brandName: string): void {
    cy.get(this.selectors.title).should('contain.text', `Brand - ${brandName} Products`);
  }

  addReview(name: string, email: string, review: string): void {
    cy.get(this.selectors.reviewForm).type(name);
    cy.get(this.selectors.reviewEmail).type(email);
    cy.get(this.selectors.reviewTextarea).type(review);
    cy.get(this.selectors.reviewSubmit).click();
  }

  verifyReviewSuccess(): Cypress.Chainable<any> {
    return cy
      .get(this.selectors.reviewSuccess)
      .should('be.visible')
      .and('contain.text', 'Thank you for your review');
  }

  validateKeywordInResults(keyword: string): void {
    cy.get(this.selectors.productWrapper).each(($product) => {
      cy.wrap($product)
        .find(this.selectors.productInfo)
        .invoke('text')
        .then((text) => {
          expect(text.trim().toLowerCase()).to.contain(keyword.toLowerCase());
        });
    });
  }
}

export const productsPage = new ProductsPage();

