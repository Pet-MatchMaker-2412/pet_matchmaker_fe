describe('Question Card', () => {
  beforeEach(() => {
    cy.intercept('GET', '/api/v1/users?username=something_unique', {
      fixture: 'UserData.json'
    }).as('getUser');

    cy.intercept('GET', '/api/v1/questions', {
      fixture: 'QuestionnaireData.json'
    }).as('getQuestions');

    cy.intercept('POST', '/api/v1/users/1/questionnaire_submissions', {
      statusCode: 201,
      body: {
        data: {
          type: "questionnaire_submission",
          id: "1",
          attributes: {
            saved: false,
            submission_answers: {
              data: [
                {
                  id: "1",
                  type: "submission_answer",
                  attributes: {
                    text: "answer"
                  }
                }
              ]
            },
            recommended_animal: {
              data: {
                type: "recommended_animal",
                id: "1",
                attributes: {
                  animal_type: "Dachshund",
                  photo_url: "https://images.unsplash.com/photo-1604443586815-3272e18c124f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                  description: "Good Boy!"
                }
              }
            }
          }
        }
      }
    }).as('postSubmission');

    cy.visit('http://localhost:5173');

    cy.get('input[placeholder="Enter Username"]').type('something_unique');
    cy.contains('button', 'Login').click();
    cy.get('form').submit();
    cy.wait('@getUser');
    cy.contains('Take the Quiz!').click();
    cy.wait('@getQuestions');
  });

  it('should display the mock question and answer options', () => {
    cy.get('p').should('contain', 'question?');  
    cy.get('label').should('contain', 'answer');
    cy.get('input[type="radio"]').should('exist');
  });

  it('should allow selecting answers and submitting the form', () => {
    cy.get('input[type="radio"]').first().check({ force: true });
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/results');

  it('should alert if not all questions are answered', () => {
    cy.get('button[type="submit"]').click();
  
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Please answer all questions before submitting.');
    });
  
    cy.url().should('include', '/questionnaire'); 
    });
  });

  describe('Sad Path: Incomplete questionnaire submission', () => {
    it('should alert if not all questions are answered', () => {
      cy.get('button[type="submit"]').click();
  
      cy.on('window:alert', (str) => {
        expect(str).to.equal('Please answer all questions before submitting.');
      });
  
      cy.url().should('include', '/questionnaire'); 
    });
  });
});

