describe('Questionnaire Page', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/users?username=something_unique', {
      fixture: 'UserData.json'
    }).as('getUser');

    cy.intercept(
      'GET',
      'https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/users/*/questionnaire_submissions',
      { fixture: 'QuestionnaireSubmissionData.json' }
    ).as('getSubmissions');

    cy.intercept('GET', '/api/v1/questions', {
      fixture: 'QuestionnaireData.json'
    }).as('getQuestions');

    cy.visit('http://localhost:5173');

    cy.get('.input').type('something_unique');
    cy.get('.card_form > :nth-child(2)').click();
    cy.get('form').submit();
    cy.wait('@getUser');

    cy.contains('Take the Quiz!').click();
    cy.wait('@getQuestions');
  });

  it('displays the header and navigation buttons', () => {
    cy.get('h1').should('contain', 'Pet MatchMaker');
    cy.contains('button', 'Home').should('exist');
    cy.contains('button', 'Profile').should('exist');
  });

  it('renders the question form with a submit button', () => {
    cy.get('form').should('exist');
    cy.get("button[type='submit']").should('exist');
  });

  it('navigates to the Welcome page when Home is clicked', () => {
    cy.contains('button', 'Home').click();
    cy.url().should('include', '/welcome');
  });

  it('navigates to the Profile page when Profile is clicked', () => {
    cy.contains('button', 'Profile').click();
    cy.url().should('include', '/profile');
  });
});
