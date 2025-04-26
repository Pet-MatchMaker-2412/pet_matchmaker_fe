describe('Welcome Page', () => {
  beforeEach(() => {
    cy.intercept(
      'GET',
      '/api/v1/users?username=something_unique',
      { fixture: 'UserData.json' }
    ).as('getUserData');

    cy.intercept(
      'GET',
      '/api/v1/users/1/questionnaire_submissions',
      { fixture: 'NoQuestionnaireSubmissions.json' }
    ).as('getSubmissions');

    cy.intercept('GET', '/api/v1/questions', {
      fixture: 'QuestionnaireData.json'
    }).as('getQuestions');

    cy.visit('localhost:5173');

    cy.get('input[placeholder="Enter Username"]').type('something_unique');
    cy.contains('button', 'Login').click();
    cy.get('form').submit();

    cy.wait('@getUserData');
    cy.url({ timeout: 10000 }).should('include', '/welcome');
  });

  it('displays title', () => {
    cy.get('h1').should('contain', 'Pet MatchMaker 🐾');
  });

  it('displays the mission statement', () => {
    cy.get('div').should('contain', 'Choosing a furry (or maybe scaly!) companion is an exciting decision for any future pet owner.');
  });

  it('has navigation links to Resources and Profile', () => {
    cy.get('nav').within(() => {
      cy.contains('Resources').parent().should('have.attr', 'href', '/resources');
      cy.contains('Profile').parent().should('have.attr', 'href', '/profile');
    });
  });

  it('navigates to the Resources page when clicking Resources', () => {
    cy.contains('Resources').click();
    cy.url().should('include', '/resources');
  });

  it('navigates to the Profile page and shows no submissions', () => {
    cy.contains('Profile').click();
    cy.wait('@getSubmissions');
    cy.url().should('include', '/profile');
    cy.contains('No questionnaire submissions yet.').should('be.visible');
  });

  it('navigates to the Questionnaire page when clicking Take the Quiz!', () => {
    cy.contains('Take the Quiz!').click();
    cy.url().should('include', '/questionnaire');
  });
});
