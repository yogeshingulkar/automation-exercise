import userCredentials from '../../fixtures/yogesh-credentials.json';
import { homePage } from '../../pages/HomePage';
import { loginPage } from '../../pages/LoginPage';
import { productsPage } from '../../pages/ProductsPage';
import { cartPage } from '../../pages/CartPage';
import { checkoutPage } from '../../pages/CheckoutPage';

const accountDataValuesToCheck: string[] = [
  userCredentials.firstName,
  userCredentials.lastName,
  userCredentials.company,
  userCredentials.address,
  userCredentials.country,
  userCredentials.state,
  userCredentials.city,
  userCredentials.zipcode,
  userCredentials.mobile,
];

describe('UI Tests', () => {
  context('Registration and Authentication', () => {
    beforeEach(() => {
      cy.deleteUserByAPI(userCredentials);
      homePage.visit();
      homePage.verifyHomePageVisible();
    });

    it('should register a new user successfully', () => {
      cy.signupUser(userCredentials);
      loginPage.verifyLoggedInAs(userCredentials.name);
      loginPage.clickDeleteAccount();
      loginPage.verifyAccountDeleted();
      loginPage.clickContinue();
    });

    it('should login with valid credentials', () => {
      cy.registerUserByAPI(userCredentials);
      homePage.clickSignupLogin();
      loginPage.fillLogin(userCredentials.email, userCredentials.password);
      loginPage.verifyLoggedInAs(userCredentials.name);
      loginPage.clickDeleteAccount();
      loginPage.verifyAccountDeleted();
    });

    it('should show error for invalid login credentials', () => {
      homePage.clickSignupLogin();
      loginPage.fillLogin('invalidEmail@gmail.com', userCredentials.password);
      cy.contains('Your email or password is incorrect!').should('be.visible');
    });

    it('should logout user successfully', () => {
      cy.registerUserByAPI(userCredentials);
      homePage.clickSignupLogin();
      loginPage.fillLogin(userCredentials.email, userCredentials.password);
      loginPage.verifyLoggedInAs(userCredentials.name);
      loginPage.clickLogout();
      loginPage.verifyLoginUrl();
    });

    it('should prevent registration with existing email', () => {
      cy.registerUserByAPI(userCredentials);
      homePage.clickSignupLogin();
      cy.fillSignupForm(userCredentials);
      cy.contains('Email Address already exist!').should('be.visible');
    });
  });

  context('Contact and Information Pages', () => {
    beforeEach(() => {
      homePage.visit();
      homePage.verifyHomePageVisible();
    });

    it('should submit contact us form with attachment', () => {
      homePage.clickContactUs();
      loginPage.verifyContactFormTitle();
      loginPage.fillContactForm(
        userCredentials.name,
        userCredentials.email,
        'I would like to be in contact!',
        'Would be great we could correspond!'
      );
      cy.get(loginPage.getContactFormFileInput()).selectFile('package.json');
      loginPage.submitContactForm();
      loginPage.verifyContactSuccess();
      cy.get('#form-section > .btn').click();
      homePage.verifyHomePageVisible();
      cy.url().should('eq', `${Cypress.config('baseUrl')}/`);
    });

    it('should navigate to test cases page', () => {
      homePage.clickTestCases();
      cy.get('body').should('be.visible');
      cy.url().should('eq', `${Cypress.config('baseUrl')}/test_cases`);
      cy.getElementAndAssertText('.title', 'Test Cases');
    });

    it('should view all products and product details', () => {
      homePage.clickProducts();
      homePage.verifyHomePageVisible();
      productsPage.verifyAllProductsPage();
      productsPage.verifyTitle('All Products');
      productsPage.clickViewProduct(1);
      productsPage.verifyProductInformationElements();
    });
  });

  context('Subscription', () => {
    beforeEach(() => {
      homePage.visit();
      homePage.verifyHomePageVisible();
    });

    it('should subscribe from homepage', () => {
      homePage.subscribeWithEmail(userCredentials.email);
      homePage.verifySubscriptionSuccess();
    });

    it('should subscribe from cart page', () => {
      homePage.clickCart();
      homePage.subscribeWithEmail(userCredentials.email);
      homePage.verifySubscriptionSuccess();
    });
  });

  context('Cart and Checkout Flows', () => {
    beforeEach(() => {
      cy.deleteUserByAPI(userCredentials);
      homePage.visit();
      homePage.verifyHomePageVisible();
    });

    it('should add products to cart and verify', () => {
      homePage.clickProducts();
      cy.addProductToCart(1);
      cartPage.clickContinueShopping();
      cy.addProductToCart(2);
      cartPage.clickViewCart();
      cartPage.verifyProductInCart('product-1', 'Blue Top');
      cartPage.verifyProductInCart('product-1', 'Women > Tops');
      cartPage.verifyProductInCart('product-2', 'Men Tshirt');
      cartPage.verifyProductInCart('product-2', 'Men > Tshirts');
    });

    it('should place order: register while checkout', () => {
      homePage.clickProducts();
      cy.addProductToCart(1);
      cartPage.clickContinueShopping();
      homePage.clickCart();
      cartPage.verifyCartBodyVisible();
      cartPage.verifyCartUrl();
      cartPage.proceedToCheckout();
      cartPage.clickRegisterLoginFromModal();
      cy.fillSignupForm(userCredentials);
      cy.fillAccountInformationForm(userCredentials);
      loginPage.verifyAccountCreated();
      loginPage.clickContinue();
      loginPage.verifyLoggedInAs(userCredentials.name);
      homePage.clickCart();
      cartPage.proceedToCheckout();
      checkoutPage.verifyAddressContains(accountDataValuesToCheck);
    });

    it('should place order: register before checkout', () => {
      cy.signupUser(userCredentials);
      loginPage.verifyLoggedInAs(userCredentials.name);
      cy.addProductToCart(1);
      cartPage.clickContinueShopping();
      homePage.clickCart();
      cartPage.verifyCartBodyVisible();
      cartPage.verifyCartUrl();
      cartPage.proceedToCheckout();
      checkoutPage.verifyAddressContains(accountDataValuesToCheck);
      cartPage.addComment('I want to buy this items!');
      cartPage.placeOrder();
      checkoutPage.fillPaymentDetails(userCredentials.name);
      checkoutPage.verifyOrderPlaced();
      loginPage.clickDeleteAccount();
      loginPage.verifyAccountDeleted();
    });
  });

  context('Advanced Checkout and Account', () => {
    beforeEach(() => {
      cy.deleteUserByAPI(userCredentials);
      cy.registerUserByAPI(userCredentials);
      homePage.visit();
      homePage.verifyHomePageVisible();
    });

    it('should place order: login before checkout', () => {
      homePage.clickSignupLogin();
      loginPage.fillLogin(userCredentials.email, userCredentials.password);
      cy.addProductToCart(1);
      cartPage.clickContinueShopping();
      homePage.clickCart();
      cartPage.verifyCartBodyVisible();
      cartPage.verifyCartUrl();
      cartPage.proceedToCheckout();
      checkoutPage.verifyAddressContains(accountDataValuesToCheck);
      cartPage.addComment('I want to buy this items!');
      cartPage.placeOrder();
      checkoutPage.fillPaymentDetails(userCredentials.name);
      cy.contains('Congratulations! Your order has been confirmed!').should('be.visible');
      loginPage.clickDeleteAccount();
      loginPage.verifyAccountDeleted();
    });

    it('should remove products from cart', () => {
      cy.addProductToCart(1);
      cartPage.clickContinueShopping();
      homePage.clickCart();
      cartPage.verifyCartBodyVisible();
      cartPage.verifyCartUrl();
      cartPage.verifyProductInCart('product-1', 'Blue Top');
      cartPage.verifyProductInCart('product-1', 'Women > Tops');
      cy.get('#product-1').within(() => {
        cy.get('.cart_quantity_delete').click();
      });
      cartPage.verifyEmptyCart();
    });

    it('should view category products', () => {
      homePage.verifyCategorySidebarVisible();
      homePage.clickWomenCategory();
      cy.contains('Tops').click();
      productsPage.verifyTitle('Women - Tops Products');
      homePage.clickMenCategory();
      cy.contains('Jeans').click();
      productsPage.verifyTitle('Men - Jeans Products');
    });

    it('should view and cart brand products', () => {
      homePage.clickProducts();
      productsPage.verifyBrandSidebarVisible();
      productsPage.clickBrand('H&M');
      productsPage.verifyBrandTitle('H&M');
      productsPage.clickBrand('Polo');
      productsPage.verifyBrandTitle('Polo');
    });

    it('should search products and verify cart after login', () => {
      homePage.clickProducts();
      homePage.verifyHomePageVisible();
      productsPage.verifyAllProductsPage();
      productsPage.verifyTitle('All Products');
      cy.searchProduct('TShirt');
      productsPage.verifyTitle('Searched Products');
      productsPage.getProductCount().should('eq', 6);

      cy.get('.product-image-wrapper').each(($el, index) => {
        cy.wrap($el).within(() => {
          cy.get('.add-to-cart').first().click();
        });
        cartPage.verifyCartModalVisible();
        cartPage.clickContinueShopping();
      });

      homePage.clickCart();
      cy.get('#product-2').should('be.visible');
      cy.get('#product-28').should('be.visible');
      cy.get('#product-29').should('be.visible');
      cy.get('#product-30').should('be.visible');
      cy.get('#product-31').should('be.visible');
      cy.get('#product-43').should('be.visible');

      homePage.clickSignupLogin();
      loginPage.fillLogin(userCredentials.email, userCredentials.password);
      loginPage.verifyLoggedInAs(userCredentials.name);
      homePage.clickCart();
      cy.get('#product-2').should('be.visible');
      cy.get('#product-28').should('be.visible');
      cy.get('#product-29').should('be.visible');
      cy.get('#product-30').should('be.visible');
      cy.get('#product-31').should('be.visible');
      cy.get('#product-43').should('be.visible');
    });

    it('should add review on product', () => {
      homePage.clickProducts();
      homePage.verifyHomePageVisible();
      productsPage.verifyAllProductsPage();
      productsPage.verifyTitle('All Products');
      productsPage.clickViewProduct(1);
      productsPage.addReview(
        userCredentials.name,
        userCredentials.email,
        'This is a great product!'
      );
      productsPage.verifyReviewSuccess();
    });

    it('should add to cart from recommended items', () => {
      homePage.verifyRecommendedItemsVisible();
      cy.getElementAndAssertText('.title', 'recommended items');
      cy.get('#recommended-item-carousel > .left > .fa').click();
      cy.get('#recommended-item-carousel > .right > .fa').click();
      cy.get('.recommended_items').within(() => {
        cy.get('.add-to-cart').first().click();
      });
      cartPage.clickViewCart();
      cy.get('#product-1').should('be.visible');
    });
  });

  context('Address and Scroll', () => {
    beforeEach(() => {
      cy.deleteUserByAPI(userCredentials);
      homePage.visit();
      homePage.verifyHomePageVisible();
    });

    it('should verify address details in checkout page', () => {
      cy.signupUser(userCredentials);
      loginPage.verifyLoggedInAs(userCredentials.name);
      cy.addProductToCart(1);
      homePage.clickCart();
      cartPage.verifyCartBodyVisible();
      cartPage.verifyCartUrl();
      cartPage.proceedToCheckout();
      checkoutPage.verifyAddressContains(accountDataValuesToCheck);
      loginPage.clickDeleteAccount();
      loginPage.verifyAccountDeleted();
    });

    it('should download invoice after purchase order', () => {
      cy.addProductToCart(1);
      cartPage.clickContinueShopping();
      homePage.clickCart();
      cartPage.verifyCartBodyVisible();
      cartPage.verifyCartUrl();
      cartPage.proceedToCheckout();
      cartPage.clickRegisterLoginFromModal();
      cy.fillSignupForm(userCredentials);
      cy.fillAccountInformationForm(userCredentials);
      loginPage.verifyAccountCreated();
      loginPage.clickContinue();
      loginPage.verifyLoggedInAs(userCredentials.name);
      homePage.clickCart();
      cartPage.proceedToCheckout();
      checkoutPage.verifyAddressContains(accountDataValuesToCheck);
      cartPage.addComment('I want to buy this items!');
      cartPage.placeOrder();
      checkoutPage.fillPaymentDetails(userCredentials.name);
      checkoutPage.verifyOrderPlaced();
      cartPage.clickDownloadInvoice();
      cy.downloadFile(
        'https://automationexercise.com/payment_done/1400',
        'Downloads',
        'invoice.txt'
      );
      loginPage.clickDeleteAccount();
      loginPage.verifyAccountDeleted();
    });

    it('should scroll up using arrow button', () => {
      homePage.scrollToFooter();
      cy.getElementAndAssertText('.single-widget > h2', 'Subscription');
      homePage.clickScrollUp();
      homePage.verifySliderVisible();
    });

    it('should scroll up without arrow button', () => {
      cy.window().then((win) => {
        win.scrollTo(0, win.document.body.scrollHeight);
      });
      cy.getElementAndAssertText('.single-widget > h2', 'Subscription');
      cy.window().then((win) => {
        win.scrollTo(0, 0);
      });
      homePage.verifySliderVisible();
    });
  });
});
