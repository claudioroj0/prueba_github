/// <reference types="Cypress"/>
describe('actualizar mis datos', () => {
  it('actualizar mis datos', () => {
    cy.visit('http://10.20.6.93:8102/login');

   
    cy.get('#ion-input-0').clear({ force: true }); // Añadido force: true
    cy.get('#ion-input-0').type('atorres', { force: true }); // Añadido force: true
    cy.get('#ion-input-1').clear({ force: true }); // Añadido force: true
    cy.get('#ion-input-1').type('1234', { force: true }); // Añadido force: true
    cy.get('.ancho-boton').click();
    cy.get('[value="misdatos"]').click();
    cy.get('app-misdatos > .content-ltr').click();
    cy.get('#ion-input-2').clear({ force: true }); // Añadido force: true
    cy.get('#ion-input-2').type('pedro', { force: true }); // Añadido force: true
    cy.get('#ion-input-3').clear({ force: true }); // Añadido force: true
    cy.get('#ion-input-3').type('pedro', { force: true }); // Añadido force: true
    cy.get('#ion-input-4').clear({ force: true }); // Añadido force: true
    cy.get('#ion-input-4').type('pedro', { force: true }); // Añadido force: true
    cy.get('#ion-input-5').clear({ force: true }); // Añadido force: true
    cy.get('#ion-input-5').type('pedro@duocuc.cl', { force: true }); // Añadido force: true
    cy.get('#ion-input-6').clear({ force: true }); // Añadido force: true
    cy.get('#ion-input-6').type('pedro', { force: true }); // Añadido force: true
    cy.get('#ion-input-7').clear({ force: true }); // Añadido force: true
    cy.get('#ion-input-7').type('pedro', { force: true }); // Añadido force: true
    cy.get('#datos_educa').click({ force: true }); // Añadido force: true
    cy.get('#datos_educa').click({ force: true }); // Añadido force: true
    cy.get('#alert-input-3-4 > .alert-button-inner > .alert-radio-label').click();
    cy.get('.alert-button-group > :nth-child(2) > .alert-button-inner').click();
    cy.get('#ion-input-11').click({ force: true }); // Añadido force: true
    cy.get('.floating-div').click({ force: true }); // Añadido force: true
    cy.get('#ion-input-11').clear({ force: true }); // Añadido force: true
    cy.get('#ion-input-11').type('13/01/2000', { force: true }); // Añadido force: true
    cy.get('#ion-input-8').clear({ force: true }); // Añadido force: true
    cy.get('#ion-input-8').type('pedro', { force: true }); // Añadido force: true
    cy.get('#ion-input-9').clear({ force: true }); // Añadido force: true
    cy.get('#ion-input-9').type('pedro', { force: true }); // Añadido force: true
    cy.get('#datos_actualizar').click();
    
  })
})
