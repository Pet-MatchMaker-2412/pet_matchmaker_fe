describe('Welcome Page', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/welcome')
  })

  it('displays title', () => {
    cy.get('h1').should('contain', 'Pet MatchMaker 🐾')
  })

  it('displays the mission statement', () => {
    cy.get('div').should('contain', 'Choosing a furry (or maybe scaly!) companion is an exciting decision for any future pet owner.')
  })

  it('displays a footer with credits', () => {
    cy.get('footer').should('contain', 'Put any necessary credits here in the footer.')
  })

  it('has navigation links to Resources and Profile', () => {
    cy.get('nav').within(() => {
      cy.contains('Resources').parent().should('have.attr', 'href', '/resources')
      cy.contains('Profile').parent().should('have.attr', 'href', '/profile')
    })
  })

  it('navigates to the Resources page when clicking Resources', () => {
    cy.contains('Resources').click()
    cy.url().should('include', '/resources')
  })

  it('navigates to the Profile page when clicking Profile', () => {
    cy.contains('Profile').click();
    cy.url().should('include', '/profile');
  })

  it('navigates to the Questionnaire page when clicking Take the Quiz!', () => {
    cy.contains('Take the Quiz!').click()
    cy.url().should('include', '/questionnaire')
  })
})