describe('Welcome Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/welcome')
  })

  it('displays title', () => {
    cy.get('h1')
    cy.contains('Pet MatchMaker 🐾')
  })

  it('displays the mission statement', () => {
    cy.get('div')
    cy.contains('Choosing a furry (or maybe scaly!) companion is an exciting decision for any future pet owner. This app helps simplify that process by guiding users through a short lifestyle questionnaire, then recommending the pet that best fits their daily routine, living space, budget, and personal preferences. By promoting thoughtful pet selection, we hope to strengthen the bond between people and their future companions, leading to happier lives for both.')
  })

  it('displays a footer with credits', () => {
    cy.get('footer')
    cy.contains('Put any necessary credits here in the footer.')
  })

  it('has ')
})