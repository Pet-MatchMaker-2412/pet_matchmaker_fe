describe('user profile when no pets are saved yet', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/profile')
  })
  
  it('shows no saved pets message', () => {
    cy.get('p').should('contain', 'No pets saved yet. Please complete the questionnaire to save pets.')
  })

  it('shows users name and title of profile page in h1', () => {
    cy.get('h1').should('contain', "Guest's Pet MatchMaker Profile 🐾" )
  })

  it('should see a section for saved pet results', () => {
    cy.get('h2').should('contain', 'Your Saved Pet Results')
  })

  it('shows button that navigates to welcome page', () => {
    cy.contains('Welcome Page').click()
    cy.url().should('include', '/welcome')
  })
})

describe('profile page once a pet has been saved as a result', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/questionnaire')
    cy.contains('Submit').click()
    cy.url().should('include', '/results')
    cy.contains('Save Pet').click()
    cy.contains('Profile').click()
  })

  it('contains saved pet type and photo', () =>{
    cy.contains('Your Saved Pet Results')
    cy.get('p').should('contain', 'Type:')
    cy.get('img').should('be.visible')
  })

  it('shows "click for more" button and navigates to results', () => {
    cy.contains('Click for more!').click()
    cy.url().should('include', '/results')
  })
})