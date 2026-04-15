/// <reference types="cypress" />

const userCredentials = require("../fixtures/yogesh-credentials.json")
const accountDataValuesToCheck = [
    userCredentials.firstName,
    userCredentials.lastName,
    userCredentials.company,
    userCredentials.address,
    userCredentials.country,
    userCredentials.state,
    userCredentials.city,
    userCredentials.zipcode,
    userCredentials.mobile,
]

describe("Automation Exercises", () => {
    const verifyHomePage = () => {
        cy.visit("https://automationexercise.com/")
        cy.get("body").should("be.visible")
    }

    context("Registration and Login", () => {
        beforeEach(() => {
            cy.deleteUserByAPI(userCredentials)
            verifyHomePage()
        })

        it("Test Case 1: Register User", () => {
            cy.signupUser(userCredentials)
            cy.contains(`Logged in as ${userCredentials.name}`, { timeout: 10000 }).should('be.visible')
            cy.contains("Delete Account").click()
            cy.getElementAndAssertText('[data-qa="account-deleted"]', "Account Deleted!")
            cy.get('[data-qa="continue-button"]').click()
        })

        it("Test Case 5: Register User with existing email", () => {
            cy.registerUserByAPI(userCredentials)
            cy.visit("https://automationexercise.com/login")
            cy.fillSignupForm(userCredentials)
            cy.contains("Email Address already exist!").should('be.visible')
        })
    })

    context("Product and Cart Logic", () => {
        beforeEach(() => {
            verifyHomePage()
        })

        it("Test Case 9: Search Product", () => {
            cy.contains("Products").click()
            cy.url().should("include", "/products")
            cy.get("#search_product").type("Premium Polo T-Shirts")
            cy.get("#submit_search").click()
            cy.getElementAndAssertText(".title", "Searched Products")
            cy.get(".product-image-wrapper").should('have.length', 1).and('be.visible')
        })

        it("Test Case 13: Verify Product quantity in Cart", () => {
            cy.contains("View Product").first().click()
            cy.get("#quantity").clear().type("4")
            cy.contains("button", "Add to cart").click()
            cy.contains("u", "View Cart").click()
            cy.get(".cart_quantity").should("contain.text", "4")
        })
    })

    context("Advanced Interactions", () => {
        it("Test Case 25: Scroll using Arrow", () => {
            verifyHomePage()
            cy.scrollTo('bottom')
            cy.get("#footer").should('be.visible')
            cy.get("#scrollUp").click()
            cy.contains("Full-Fledged practice website").should('be.visible')
        })

        it("Test Case 26: Scroll without Arrow", () => {
            verifyHomePage()
            cy.scrollTo('bottom')
            cy.contains("Subscription").should('be.visible')
            cy.scrollTo('top')
            cy.get("#slider-carousel").should('be.visible')
        })
    })
})
