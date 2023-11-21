import { v4 as uuid } from 'uuid';

describe('Register and login user', () => {
  const email: string = `${uuid()}@cypress.com`;
  const password: string = 'cypress123!';

  it('Registers a new user, logs them in, and then logs them out', () => {
    // Navigate to the home page
    cy.visit(Cypress.env('BASE_URL'));

    // Click on the register link
    cy.get(`a[href='/register']`).click();
    cy.url().should('include', '/register');

    // Fill out register form
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/login');

    // Fill out login form
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();

    // Logout button should appear
    cy.get(`button[id='home-page-logout-button']`).should('exist');
    cy.get(`button[id='home-page-logout-button']`).click();

    // Logout button should disappear
    cy.get(`button[id='home-page-logout-button']`).should('not.exist');
  });
});
