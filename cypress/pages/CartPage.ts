export class CartPage {
  private readonly selectors = {
    cartModal: '#cartModal',
    cartModalTitle: 'Added!',
    cartModalMessage: 'Your product has been added to cart.',
    continueShoppingButton: 'Continue Shopping',
    viewCartButton: 'View Cart',
    cartItems: '#cart_info_table tbody tr',
    emptyCart: '#empty_cart',
    emptyCartMessage: 'Cart is empty! Click here to buy products.',
    cartQuantity: '.cart_quantity',
    cartQuantityDisabled: '.cart_quantity > .disabled',
    deleteProductButton: '.cart_quantity_delete',
    proceedToCheckout: 'Proceed To Checkout',
    registerLoginLink: '.modal-content a',
    checkoutComment: '.form-control',
    placeOrderButton: 'Place Order',
    orderPlacedTitle: 'Order Placed!',
    orderConfirmation: 'Congratulations! Your order has been confirmed!',
    downloadInvoice: 'Download Invoice',
  } as const;

  verifyCartModalVisible(): Cypress.Chainable<any> {
    return cy.get(this.selectors.cartModal).should('be.visible');
  }

  verifyCartModalContent(): void {
    cy.get(this.selectors.cartModal).within(() => {
      cy.contains(this.selectors.cartModalTitle).should('be.visible');
      cy.contains(this.selectors.cartModalMessage).should('be.visible');
    });
  }

  clickContinueShopping(): void {
    cy.contains(this.selectors.continueShoppingButton).click();
  }

  clickViewCart(): void {
    cy.contains(this.selectors.viewCartButton).click();
  }

  verifyCartUrl(): Cypress.Chainable<any> {
    return cy.url().should('contain', '/view_cart');
  }

  verifyCartBodyVisible(): Cypress.Chainable<any> {
    return cy.get('body').should('be.visible');
  }

  verifyProductInCart(productId: string, productName: string): void {
    cy.get(`#${productId}`).should('be.visible').and('contain.text', productName);
  }

  verifyCartQuantity(expectedQuantity: string): void {
    cy.get(this.selectors.cartQuantityDisabled).should('contain.text', expectedQuantity);
  }

  removeProductFromCart(): void {
    cy.get(this.selectors.deleteProductButton).click();
  }

  verifyEmptyCart(): Cypress.Chainable<any> {
    return cy
      .get(this.selectors.emptyCart)
      .should('be.visible')
      .and('contain.text', this.selectors.emptyCartMessage);
  }

  proceedToCheckout(): void {
    cy.contains(this.selectors.proceedToCheckout).click();
  }

  clickRegisterLoginFromModal(): void {
    cy.get(this.selectors.registerLoginLink).click();
  }

  addComment(comment: string): void {
    cy.get(this.selectors.checkoutComment).type(comment);
  }

  placeOrder(): void {
    cy.contains(this.selectors.placeOrderButton).click();
  }

  verifyOrderPlaced(): void {
    cy.get('.title').should('contain.text', this.selectors.orderPlacedTitle);
    cy.contains(this.selectors.orderConfirmation).should('be.visible');
  }

  clickDownloadInvoice(): void {
    cy.contains(this.selectors.downloadInvoice).click();
  }
}

export const cartPage = new CartPage();

