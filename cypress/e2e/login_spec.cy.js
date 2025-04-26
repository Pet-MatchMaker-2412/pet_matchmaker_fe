describe('LoginPage spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })

  it("should display the login form elements", () => {
    cy.get('h1').should("contain", "Welcome")
    cy.get('h2').should("contain", "Login or Sign Up")
    cy.get('input[placeholder="Enter Username"]').should("exist")
    cy.get('button').contains("Login").should("exist")
    cy.get('button').contains("Sign Up").should("exist")
  })

  it("should allow a user to enter a username and login", () => {
    cy.get('input[placeholder="Enter Username"]').type('testuser')
    cy.get('button').contains('Login').click()
    cy.url().should('include', '/welcome')
  })
})
