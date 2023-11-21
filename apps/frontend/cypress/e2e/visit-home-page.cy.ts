describe('Visit home page', () => {
  it('Displays the home page', () => {
    cy.visit(Cypress.env('BASE_URL'));
  });
});
