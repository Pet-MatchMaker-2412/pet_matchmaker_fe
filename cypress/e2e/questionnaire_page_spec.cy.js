describe('QuestionnairePage spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/questionnaire')
  })

  it("should display the nav buttons and question content", () => {
    cy.get("h1")
    .should("contain", "Pet MatchMaker")

    cy.get("button")
    .contains("Home")
    .should("exist")

    cy.get("button")
    .contains("Profile")
    .should("exist")
  })

  it("checks that the QuestionCard is being rendered", () => {
    cy.get("form")
    .should("exist")

    cy.get("button[type='submit']")
    .should("exist")
  })

  it("should navigate to the home page when clicking the home button", () => {
    cy.get("button")
    .contains("Home")
    .click()

    cy.url()
    .should("include", "/welcome")
  })

  it("should navigate to the profile page when clicking the profile button", () => {
    cy.get("button")
    .contains("Profile")
    .click()

    cy.url()
    .should("include", "/profile")
  })
})