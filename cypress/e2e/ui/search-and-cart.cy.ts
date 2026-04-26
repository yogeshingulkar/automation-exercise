import { homePage } from '../../pages/HomePage';
import { productsPage } from '../../pages/ProductsPage';
import { cartPage } from '../../pages/CartPage';

describe('Search and Cart Functionality', () => {
  beforeEach(() => {
    homePage.visit();
    homePage.verifyHomePageVisible();
  });

  context('Product Search', () => {
    it('should perform a valid search and display matching products', () => {
      homePage.clickProducts();
      productsPage.verifyAllProductsPage();
      productsPage.verifyTitle('All Products');

      cy.searchProduct('Premium Polo T-Shirts');
      cy.validateSearchResults(1);
      productsPage.validateKeywordInResults('Polo');
    });

    it('should perform a search with multiple results', () => {
      homePage.clickProducts();
      productsPage.verifyAllProductsPage();

      cy.searchProduct('TShirt');
      productsPage.verifyTitle('Searched Products');
      productsPage.getProductCount().should('eq', 6);
      productsPage.validateKeywordInResults('TShirt');
    });

    it('should handle invalid search with no results gracefully', () => {
      homePage.clickProducts();
      productsPage.verifyAllProductsPage();

      cy.searchProduct('NonExistentProductXYZ123');
      productsPage.verifyTitle('Searched Products');
      cy.get('.product-image-wrapper').should('not.exist');
    });
  });

  context('Add to Cart', () => {
    it('should add a single product to cart and verify modal', () => {
      homePage.clickProducts();
      cy.addProductToCart(1);
      cy.validateCartModal();
      cartPage.clickContinueShopping();
    });

    it('should add multiple products to cart and verify cart contents', () => {
      homePage.clickProducts();

      cy.addProductToCart(1);
      cy.validateCartModal();
      cartPage.clickContinueShopping();

      cy.addProductToCart(2);
      cy.validateCartModal();
      cartPage.clickViewCart();

      cartPage.verifyCartUrl();
      cartPage.verifyProductInCart('product-1', 'Blue Top');
      cartPage.verifyProductInCart('product-2', 'Men Tshirt');
    });

    it('should verify product quantity in cart', () => {
      homePage.clickProducts();
      productsPage.clickViewProduct(1);
      productsPage.verifyProductDetailsVisible();

      productsPage.setQuantity('4');
      cy.contains('Add to cart').click();
      cartPage.clickViewCart();

      cartPage.verifyProductInCart('product-1', 'Blue Top');
      cartPage.verifyCartQuantity('4');
    });

    it('should remove product from cart and display empty cart message', () => {
      homePage.clickProducts();

      cy.addProductToCart(1);
      cartPage.clickContinueShopping();

      homePage.clickCart();
      cartPage.verifyCartUrl();
      cartPage.verifyProductInCart('product-1', 'Blue Top');

      cartPage.removeProductFromCart();
      cartPage.verifyEmptyCart();
    });
  });

  context('Dropdown Handling', () => {
    it('should filter products by category using dropdown-like navigation', () => {
      homePage.verifyCategorySidebarVisible();
      homePage.clickWomenCategory();
      cy.contains('Tops').click();
      productsPage.verifyTitle('Women - Tops Products');

      homePage.clickMenCategory();
      cy.contains('Jeans').click();
      productsPage.verifyTitle('Men - Jeans Products');
    });

    it('should filter products by brand', () => {
      homePage.clickProducts();
      productsPage.verifyBrandSidebarVisible();

      productsPage.clickBrand('H&M');
      productsPage.verifyBrandTitle('H&M');

      productsPage.clickBrand('Polo');
      productsPage.verifyBrandTitle('Polo');
    });
  });
});

