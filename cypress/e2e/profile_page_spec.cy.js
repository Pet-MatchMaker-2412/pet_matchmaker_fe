describe('Profile Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/profile')
  })

  it('displays title', () => {
    cy.get('h1').should('contain', 'Pet MatchMaker 🐾')
  })
  
})