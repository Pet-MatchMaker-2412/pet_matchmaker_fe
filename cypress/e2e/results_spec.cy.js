describe('ResultsPage spec', () => {
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
    cy.get('.submission').should('have.length', 1);

    cy.intercept(
      'GET',
      '/api/v1/users/1/questionnaire_submissions?saved=true', 
      { fixture: 'QuestionnaireResults.json' }
    ).as('getQuestionnaireResults');

    cy.contains('button', 'Click for more!').click()

  });

  it("should display the results page and all the content on it", () => {

    cy.get("h1")
      .should("contain", "Pet MatchMaker");

    cy.get("h2")
      .should("contain", "Your Suggested Pet:");

    cy.get("p")
      .should("contain", 'dachshund');

    cy.get("button")
      .contains("Home")
      .should("exist");

    cy.get("button")
      .contains("Profile")
      .should("exist");

    cy.get("button")
      .contains("Save Pet")
      .should("exist");

    cy.get("button")
      .contains("Find Pets Near Me")
      .should("exist");

    cy.get("label")
      .contains("Enter Your Zip Code")
      .should("exist");

    cy.get("input")
      .should("exist");
  });

  it("should navigate to the home page when clicking the home button", () => {
    cy.get("button")
      .contains("Home")
      .click();

    cy.url()
      .should("include", "/welcome");
  });

  it("should navigate to the profile page when clicking the profile button", () => {
    cy.get("button")
      .contains("Profile")
      .click();

    cy.url()
      .should("include", "/profile");
  });
});
