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
Cypress.Commands.add('login', () => {
    cy.intercept({ method: 'get', url: 'http://mallonlineback.co:8000/api/state' }).as('user_info');
    // go to the site
    cy.visit('http://localhost:3000');
    cy.wait('@user_info').its('response.body')
        .should('contain', { user: false, admin: false, guest: true });
    // cantAdd();
    // sign in as user
    cy.get('.user > .fas').click();
    cy.get(':nth-child(3) > .form-control').clear();
    cy.get(':nth-child(3) > .form-control').type('habibmisi3@gmail.com');
    cy.get(':nth-child(4) > .form-control').clear();
    cy.get(':nth-child(4) > .form-control').type('gh090807');
    cy.get('.btn-black').click();
    // confirm that login success
    cy.wait('@user_info').its('response.body')
        .should('contain', { user: true, admin: false, guest: false });
})
Cypress.Commands.add('adminLogin', () => {
    // sniffing requests
    cy.intercept('http://mallonlineback.co:8000/api/admin-login').as('user_info');
    // go to the site
    cy.visit('http://localhost:3000');
    cy.get('.user > .fas').click();
    cy.get('.select > :nth-child(2) > span').click();
    cy.get(':nth-child(3) > .form-control').clear();
    cy.get(':nth-child(3) > .form-control').type('habibmisi3@gmail.com');
    cy.get(':nth-child(4) > .form-control').clear();
    cy.get(':nth-child(4) > .form-control').type('gh090807');
    cy.get('.btn-black').click();
    cy.wait('@user_info').its('response.statusCode').should('equal', 200);
})
Cypress.Commands.add('logout', () => {
    cy.get('.bars > :nth-child(2)').click();
    cy.get('.logout > span').click();
})

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
