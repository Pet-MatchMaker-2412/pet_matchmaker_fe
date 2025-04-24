describe('QuestionCard spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/questionnaire')
  })

  it("should display on the QuestionnairePage", () => {
    cy.get("h1")
    .should("contain", "Pet MatchMaker");

    cy.get("form")
    .should("exist");

    cy.get("button")
    .contains("Submit")
    .should("exist");

    cy.get("button[type='submit']")
    .should("exist");
  })

  it("should display the questions and its answers", () => {

    cy.get("p")
    .contains("question?")
    .should("exist");

    cy.get("p")
    .contains("question2?")
    .should("exist");

    cy.get("label")
    .contains("answer")
    .should("exist");

    cy.get("label")
    .contains("answer2")
    .should("exist");

    cy.get("label")
    .contains("answer3")
    .should("exist");

    cy.get("label")
    .contains("answer4")
    .should("exist");
  })

  it("should allow the selecting of an answer", () => {
    cy.get("input")
    .should("exist");

    cy.get("input[type='radio']")
    .first()
    .check()
    .should("be.checked");
  })

  it("should submit when all the questions are answered", () => {
    cy.get("input[type='radio']")
    .first()
    .check();

    cy.get("input[type='radio']")
    .eq(1)
    .check();

    cy.get("input[type='radio']")
    .last()
    .check()

    cy.get("input[type='radio']")
    .eq(2)
    .check()

    cy.get("button[type='submit']")
    .click()

    cy.url()
    .should("include", "/results")
  })
})