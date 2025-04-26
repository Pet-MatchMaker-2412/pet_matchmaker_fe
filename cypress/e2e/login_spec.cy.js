// logans old PR code that Bev copied


// describe('LoginPage spec', () => {
//   beforeEach(() => {
//      cy.visit('http://localhost:5173/')
//    })
 
//    it("should display the login form with input and login button", () => {
//      cy.get('h1').should("contain", "Login")
//      .get('input[placeholder="Enter Username"]')
//      .get('button').contains("Login").should("exist")
//      .get('h1').should("contain", "Login")
//    })
 
//    it("should allow a suer to enter a username and login", () => {
//      cy.get("input[placeholder='Enter Username']").type('testuser')
//      .get("button").contains("Login").click()
//      cy.url().should("include", "/welcome")
//    })
 
//  })