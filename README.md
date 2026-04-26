# Cypress TypeScript Automation Framework

A production-ready, enterprise-level Cypress automation framework built with TypeScript for testing the [Automation Exercise](https://automationexercise.com) website.

## Features

- **TypeScript Support**: Full TypeScript integration with strict typing
- **Page Object Model (POM)**: Maintainable page classes for UI elements
- **Custom Commands**: Reusable Cypress commands for common actions
- **Helper Utilities**: Modular helper functions for validations and assertions
- **API + UI Testing**: Combined API and UI test coverage
- **Mochawesome Reporting**: Beautiful HTML test reports with screenshots
- **Screenshot Handling**: Automatic screenshots on failure + manual capture
- **CI/CD Ready**: Configured for continuous integration pipelines

## Project Structure

```
cypress/
├── e2e/                    # End-to-end test files
│   ├── ui/                 # UI test suites
│   │   ├── search-and-cart.cy.ts
│   │   └── ui-tests.cy.ts
│   └── api/                # API test suites
│       └── api-tests.cy.ts
├── fixtures/               # Test data and mock files
│   └── yogesh-credentials.json
├── pages/                  # Page Object Model classes
│   ├── HomePage.ts
│   ├── ProductsPage.ts
│   ├── CartPage.ts
│   ├── LoginPage.ts
│   └── CheckoutPage.ts
├── support/                # Support files and configuration
│   ├── commands.ts         # Custom Cypress commands
│   ├── e2e.ts             # Global hooks and reporter setup
│   ├── index.d.ts         # TypeScript type declarations
│   └── types.ts           # Shared type interfaces
├── utils/                  # Helper utilities
│   └── helpers.ts
├── screenshots/            # Auto-generated screenshots
└── reports/               # Mochawesome test reports
```

## Folder Purposes

| Folder | Purpose |
|--------|---------|
| `e2e/ui` | UI automation test cases |
| `e2e/api` | API endpoint test cases |
| `fixtures` | Test data, JSON files, and mock data |
| `pages` | Page Object Model - selectors and actions per page |
| `support` | Custom commands, global hooks, TypeScript declarations |
| `utils` | Reusable helper functions and utilities |
| `screenshots` | Automatic failure screenshots |
| `reports` | Mochawesome HTML test reports |

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

## Running Tests

```bash
# Open Cypress Test Runner (interactive mode)
npm run cy:open

# Run all tests headlessly
npm run cy:run

# Run tests in Chrome browser
npm run cy:run:chrome

# Run tests in headless mode
npm run cy:run:headless
```

## Generating Reports

```bash
# Run tests and generate Mochawesome report
npm run cy:run

# Merge JSON reports
npm run report:merge

# Generate HTML report
npm run report:generate
```

Reports will be available at `cypress/reports/final/`.

## Custom Commands

| Command | Description |
|---------|-------------|
| `cy.visitHomepage()` | Visit and verify homepage |
| `cy.searchProduct(term)` | Search for a product |
| `cy.validateSearchResults(count)` | Validate search result count |
| `cy.addProductToCart(index)` | Add product to cart by index |
| `cy.validateCartModal()` | Verify cart modal visibility |
| `cy.signupUser(user)` | Complete user registration |
| `cy.fillLoginForm(user)` | Fill and submit login |
| `cy.fillSignupForm(user)` | Fill signup form (name + email) |
| `cy.fillAccountInformationForm(user)` | Fill account info after signup |
| `cy.fillPaymentDetails(user)` | Fill payment details on checkout |
| `cy.deleteUserByAPI(user)` | Delete user via API |
| `cy.registerUserByAPI(user)` | Register user via API |
| `cy.createAccountViaAPI(user)` | Create account via API (returns response) |
| `cy.downloadFile(url, dir, filename)` | Download file from URL to disk |

## Helper Functions

| Function | Description |
|----------|-------------|
| `validateKeywordInProducts()` | Validate keyword in multiple products |
| `selectDropdownByText()` | Dynamic dropdown selection |
| `assertVisibleAndContains()` | Reusable visibility + text assertion |
| `assertVisibleAndExactText()` | Reusable visibility + exact text assertion |
| `takeScreenshot()` | Manual screenshot with timestamp |
| `buildApiPayload(user)` | Build API request body from UserCredentials |

## Best Practices

1. **Page Object Model**: All selectors live in `pages/` classes
2. **No Hardcoded Waits**: Use Cypress built-in auto-waiting
3. **Reusable Commands**: Common actions abstracted to custom commands
4. **Clean Test Structure**: `beforeEach` setup, descriptive test names
5. **Screenshot on Failure**: Automatic capture in `afterEach` hook
6. **Type Safety**: Full TypeScript with strict mode enabled

## Configuration

Key settings in `cypress.config.ts`:

- `baseUrl`: https://automationexercise.com
- `screenshotOnRunFailure`: true
- `video`: false (disabled for performance)
- `defaultCommandTimeout`: 10000ms
- `viewport`: 1280x720

## CI/CD Integration

The framework is ready for CI/CD pipelines. Example for GitHub Actions:

```yaml
name: Cypress Tests
on: [push]
jobs:
  cypress-run:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run cy:run
```

## License

ISC
