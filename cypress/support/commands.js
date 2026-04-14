// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createAccountViaAPI', (user) => {
    return cy.request({
        method: "POST",
        url: "https://automationexercise.com/api/createAccount",
        form: true,
        body: {
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
        },
    });
});

Cypress.Commands.add('deleteUserByAPI', (user) => {
    cy.request({
        method: "DELETE",
        url: "https://automationexercise.com/api/deleteAccount",
        failOnStatusCode: false,
        form: true,
        body: {
            email: user.email,
            password: user.password,
        },
    });
});

Cypress.Commands.add('registerUserByAPI', (user) => {
    cy.request({
        method: "POST",
        url: "https://automationexercise.com/api/createAccount",
        form: true,
        body: {
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
        },
    });
});

Cypress.Commands.add('getElementAndAssertText', (selector, expectedText) => {
    cy.get(selector)
        .should('be.visible')
        .and('contain.text', expectedText);
});

Cypress.Commands.add('signupUser', (user) => {
    cy.contains("Signup / Login").click();
    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.get('[data-qa="signup-button"]').click();

    cy.get('#id_gender1').click();
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

Cypress.Commands.add('fillLoginForm', (user) => {
    cy.get('[data-qa="login-email"]').type(user.email);
    cy.get('[data-qa="login-password"]').type(user.password);
    cy.get('[data-qa="login-button"]').click();
});

Cypress.Commands.add('fillSignupForm', (user) => {
    cy.get('[data-qa="signup-name"]').type(user.name);
    cy.get('[data-qa="signup-email"]').type(user.email);
    cy.get('[data-qa="signup-button"]').click();
});

Cypress.Commands.add('fillAccountInformationForm', (user) => {
    cy.get('#id_gender1').click();
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

Cypress.Commands.add('fillPaymentDetails', (user) => {
    cy.get('[data-qa="name-on-card"]').type(user.name);
    cy.get('[data-qa="card-number"]').type('4111111111111111');
    cy.get('[data-qa="cvc"]').type('123');
    cy.get('[data-qa="expiry-month"]').type('12');
    cy.get('[data-qa="expiry-year"]').type('2026');
    cy.get('[data-qa="pay-button"]').click();
});

Cypress.Commands.add('addProductToCart', (index) => {
    cy.get('.product-image-wrapper').eq(index - 1).within(() => {
        cy.get('.add-to-cart').first().click();
    });
    cy.get('#cartModal').should('be.visible');
});

Cypress.Commands.add('searchProduct', (searchTerm) => {
    cy.get('#search_product').type(searchTerm);
    cy.get('#submit_search').click();
});