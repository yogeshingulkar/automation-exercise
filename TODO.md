# Cypress TypeScript Framework Fixes

## Plan Implementation Tracker

- [x] Phase 1: Analysis Complete
- [x] Phase 2: Fix Configuration & Dependencies
  - [x] Fix `package.json` invalid versions (@types/node ^20.14.0, typescript ^5.5.0)
  - [x] Create `.gitignore`
  - [x] Fix `tsconfig.json` moduleResolution (bundler → node)
  - [x] Fix `cypress.config.ts` require() with eslint comment
- [x] Phase 3: Fix Support Files
  - [x] Update `types.ts` with ApiUserPayload interface
  - [x] Update `index.d.ts` declarations (re-add downloadFile, fix createAccountViaAPI return type)
  - [x] Fix `commands.ts` (extract buildApiBody, implement downloadFile, use user.title for gender)
- [x] Phase 4: Fix Utilities
  - [x] Update `helpers.ts` with buildApiPayload importable helper
- [x] Phase 5: Fix Page Objects
  - [x] Update `LoginPage.ts` (add clickLogout, getContactFormFileInput)
  - [x] Update `ProductsPage.ts` (add verifyProductInformationElements)
- [x] Phase 6: Fix Test Files
  - [x] Update `ui-tests.cy.ts` (ESM import for fixtures, use page objects for hardcoded selectors)
  - [x] Update `search-and-cart.cy.ts` (no changes needed — no fixture imports)
  - [x] Update `api-tests.cy.ts` (ESM import for fixtures, use buildApiPayload helper)
- [x] Phase 7: Fix Documentation
  - [x] Update `README.md` (custom commands + helper functions tables)
- [x] Phase 8: Verification
  - [x] Run `npm install` — dependencies resolved successfully
  - [x] Run Cypress spec compilation & execution — 8/9 tests passed; 1 failure is pre-existing website data mismatch ("t-shirt" vs "tshirt"), not a structural issue

