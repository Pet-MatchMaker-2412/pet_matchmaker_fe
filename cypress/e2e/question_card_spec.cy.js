describe('Question Card', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/users?username=something_unique', {
      fixture: 'UserData.json'
    }).as('getUser');

    cy.intercept('GET', '/api/v1/questions', {
      fixture: 'QuestionnaireData.json'
    }).as('getQuestions');

    cy.visit('http://localhost:5173');

    cy.get('input[placeholder="Enter Username"]').type('something_unique');
    cy.contains('button', 'Login').click();
    cy.get('form').submit();
    cy.wait('@getUser');









  });
});