export class CheckoutPage {
  private readonly selectors = {
    addressDelivery: '#address_delivery',
    addressInvoice: '#address_invoice',
    nameOnCard: '[data-qa="name-on-card"]',
    cardNumber: '[data-qa="card-number"]',
    cvc: '[data-qa="cvc"]',
    expiryMonth: '[data-qa="expiry-month"]',
    expiryYear: '[data-qa="expiry-year"]',
    payButton: '[data-qa="pay-button"]',
    orderPlacedTitle: '.title',
    orderConfirmation: 'Congratulations! Your order has been confirmed!',
    deleteAccount: 'Delete Account',
  } as const;

  verifyAddressContains(values: string[]): void {
    values.forEach((value) => {
      cy.get(this.selectors.addressDelivery).should('contain.text', value);
      cy.get(this.selectors.addressInvoice).should('contain.text', value);
    });
  }

  fillPaymentDetails(name: string): void {
    cy.get(this.selectors.nameOnCard).type(name);
    cy.get(this.selectors.cardNumber).type('4111111111111111');
    cy.get(this.selectors.cvc).type('123');
    cy.get(this.selectors.expiryMonth).type('12');
    cy.get(this.selectors.expiryYear).type('2026');
    cy.get(this.selectors.payButton).click();
  }

  verifyOrderPlaced(): void {
    cy.get(this.selectors.orderPlacedTitle).should('contain.text', 'Order Placed!');
    cy.contains(this.selectors.orderConfirmation).should('be.visible');
  }

  clickDeleteAccount(): void {
    cy.contains(this.selectors.deleteAccount).click();
  }
}

export const checkoutPage = new CheckoutPage();

