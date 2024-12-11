describe('template spec', () => {

  //  SE INICIALIZA CON EL SIGUIENTE COMANDO : npx cypress open
  // RECUERDA CAMBIAR LA IP DEL COMPU AL INCIARLO
    it('Verificar inicio de sesión con credenciales incorrectas', () => {
      cy.visit('http://192.168.253.60:8102/').then(() => {
        cy.get('#cuenta').invoke('val', '');
        cy.get('#cuenta').type('cuenta-inexistente');
        cy.get('#password').invoke('val', '');
        cy.get('#password').type('1234');
        cy.contains('Ingresar').click();
        cy.intercept('/login').as('route').then(() => {
          cy.contains('Ingresar');
        });
      });
    });

    it('Verificar inicio de sesión con credenciales correctas', () => {
      cy.visit('http://192.168.253.60:8102/').then(() => {
        cy.get('#cuenta').invoke('val', '');
        cy.get('#cuenta').type('atorres');
        cy.get('#password').invoke('val', '');
        cy.get('#password').type('1234');
        cy.contains('Ingresar').click();
        cy.intercept('/login').as('route').then(() => {
          cy.contains('¡Bienvenido(a)!');
          cy.get('#wellcome_title').contains('¡Bien');
          cy.get('#wellcome_user').contains('Ana Torres');
          cy.intercept('/logout').as('routeLogout');
          cy.get('#salir').click(); 
        });
      });
    });


   // Interceptar logout y hacer clic en el botón
   //cy.intercept('/logout').as('routeLogout');
   //cy.get('#salir').click();   debes cambiar los el de arriba por este 

   it('Añadir y eliminar publicacion', () => {
     cy.visit('http://192.168.253.60:8102/').then(() => {
       cy.get('#cuenta').invoke('val', '');
       cy.get('#cuenta').type('atorres');
       cy.get('#password').invoke('val', '');
       cy.get('#password').type('1234');
       cy.contains('Ingresar').click();
       cy.intercept('/login').as('route').then(() => {
         cy.contains('¡Bienvenido(a)!');
         cy.get('#wellcome_title').contains('¡Bien');
         cy.get('#wellcome_user').contains('Ana Torres');
         cy.get('ion-segment-button[value="foro"]').click()
        // Verificar que el componente del foro esté visible
         // Llenar los campos del formulario
         cy.get('#foro_titulo').invoke('val',''); // Input de título
         cy.get('#foro_titulo').type('nueva');
         cy.get('#foro_contenido').invoke('val',''); // Textarea de contenido
         cy.get('#foro_contenido').type('publicacion');
         // Hacer clic en el botón "Actualizar/Guardar"
         cy.get('#foro_actualizar').click();
         cy.wait(2000);

         // Verificar que la publicación se agregó correctamente
         cy.contains('nueva').should('exist'); // Verifica que el título aparece en la lista
         cy.contains('nueva') // Localizar la publicación por título
           .parents('ion-card') // Subir al contenedor principal de la publicación
           .find('#foro_eliminar') // Localizar el botón de eliminar
           .click(); // Hacer clic para eliminar

         // Confirmar que la publicación fue eliminada
         cy.contains('nueva').should('not.exist');
         cy.contains('contenido').should('not.exist');
         cy.wait(5000);
         cy.intercept('/logout').as('routeLogout');
         cy.get('#salir').click();   //debes cambiar los el de arriba por este 
        
       });
     });
   });



  it('actualizar mis datos', () => {
    cy.visit('http://192.168.253.60:8102/login');

    
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
  });
  
  
