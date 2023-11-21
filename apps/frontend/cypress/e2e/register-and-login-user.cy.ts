import { v4 as uuid } from 'uuid';

describe('Register and login user', () => {
  const email: string = `${uuid()}@cypress.com`;
  const password: string = 'cypress123!';

  it('Registers a new user', () => {
    cy.visit(Cypress.env('BASE_URL'));
    cy.get(`a[href='/register']`).click();
    cy.url().should('include', '/register');
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/login');
  });
  it('Logs in the user', () => {
    cy.visit(Cypress.env('BASE_URL'));
    cy.get(`a[href='/login']`).click();
    cy.get('input[name="email"]').type(email);
    cy.get('input[name="password"]').type(password);
    cy.get('button[type="submit"]').click();
    cy.get(`button[id='home-page-logout-button']`).should('exist');
  });
  it('Logs out the user', () => {
    cy.visit(Cypress.env('BASE_URL'));
    cy.get(`button[id='home-page-logout-button']`).click();
    cy.get(`button[id='home-page-logout-button']`).should('not.exist');
  });
});
