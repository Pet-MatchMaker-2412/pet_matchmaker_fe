describe('User Profile Page with Submissions', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');

    cy.intercept('GET', 'https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/users?username=drdoolittle', {
      statusCode: 200,
      body: {
        data: {
          id: '1',
          attributes: {
            username: 'drdoolittle'
          }
        }
      }
    }).as('getUser');

    cy.intercept(
      'GET',
      'https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/users/*/questionnaire_submissions',
      { fixture: 'QuestionnaireSubmissionData.json' }
    ).as('getSubmissions');

    cy.get('input[placeholder="Enter Username"]').type('drdoolittle');
    cy.contains('button', 'Login').click();
    cy.get('form').submit();

    cy.on('window:alert', (text) => {
      expect(text).to.contain('Login Successful!');
    });

    cy.url({ timeout: 10000 }).should('include', '/welcome');
    cy.contains('button', 'Profile').click();

    cy.wait('@getSubmissions');
  });

  it("displays the user's profile header", () => {
    cy.contains("Pet MatchMaker Profile 🐾").should('exist');
  });

  it('renders saved questionnaire submissions', () => {
    cy.get('.submission').should('have.length', 1);
    cy.contains('Recommended Pet: dachshund').should('exist');
    cy.contains('button', 'Click for more!').should('exist')
    cy.get('img[alt="dachshund"]')
      .should('have.attr', 'src')
      .and('include', 'dachshund');
  });
});

describe('User Profile Page with Mock Data', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.get('input[placeholder="Enter Username"]').type('drdoolittle');

    cy.intercept('GET', 'https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/users?username=drdoolittle', {
      statusCode: 200,
      body: {
        data: {
          id: '1',
          attributes: {
            username: 'drdoolittle'
          }
        }
      }
    }).as('getUser');

    cy.contains('button', 'Login').click();
    cy.get('form').submit();

    cy.on('window:alert', (text) => {
      expect(text).to.contain('Login Successful!');
    });

    cy.url({ timeout: 10000 }).should('include', '/welcome');

    cy.intercept(
      'GET',
      'https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/users/*/questionnaire_submissions',
      { fixture: 'NoQuestionnaireSubmissions.json' }
    ).as('getNoSubmissions');

    cy.contains('button', 'Profile').click();
    cy.wait('@getNoSubmissions');
  });

  it('displays the "No questionnaire submissions yet" message when there are no submissions', () => {
    cy.contains('No questionnaire submissions yet.').should('exist');
  });
});
