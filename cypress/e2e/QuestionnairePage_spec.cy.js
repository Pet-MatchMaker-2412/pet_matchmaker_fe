describe('QuestionnairePage spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/questionnaire')
  })

  it("should display the nav buttons and question content", () => {
    cy.contains('Pet MatchMaker')
    cy.get('h1').should("contain", "Pet MatchMaker")
    .get("button").contains("Home").should("exist")
    .get("button").contains("Profile").should("exist")
  })
  
  it("checks that the QuestionCard is being rendered", () => {
    cy.get("form").should("exist")
    .get("button[type='submit']").should("exist")
  })
})