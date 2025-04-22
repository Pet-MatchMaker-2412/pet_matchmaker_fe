describe('Welcome Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/welcome')
  })
  it('displays title on page load', () => {
    cy.get('h1')
    cy.contains('Pet MatchMaker 🐾')
  })
})