describe('ResultsPage spec', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/results')
  })

  it("should display the results page and all the content on it", () => {
    cy.get("h1")
    .should("contain", "Pet MatchMaker")

    cy.get("h2")
    .should("contain", "Your Suggested Pet:")

    cy.get("p")
    .should("contain", "dachshund")

    cy.get("img")
    .should("have.attr", "src")
    .and("include", "https://animalcarecentersmyrna.com/wp-content/uploads/2021/08/Untitled-design-2021-08-19T162152.857.png")

    cy.get("button")
    .contains("Home")
    .should("exist")
    
    cy.get("button")
    .contains("Profile")
    .should("exist")

    cy.get("button")
    .contains("Save Pet")
    .should("exist")

    cy.get("button")
    .contains("Find Pets Near Me")
    .should("exist")

    cy.get("label")
    .contains("Enter Your Zip Code")
    .should("exist")

    cy.get("input")
    .should("exist")
  })

  // it("should navigate to the home page when clicking the home button", () => {
  //   cy.get("button")
  //   .contains("Home")
  //   .click()
    
  //   cy.url()
  //   .should("include", "/welcome")
  // })

  // it("should navigate to the profile page when clicking the profile button", () => {
  //   cy.get("button")
  //   .contains("Profile")
  //   .click()

  //   cy.url()
  //   .should("include", "/profile")
  // })
  
})

describe("Zip Code Form", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/results")
  })
  
  it("should render the zip code input", () => {
    cy.get("input[type='text']")
    .should("exist")
  })

  it("should be required", () => {
    cy.get("input[type='text']")
    .then((input) => {
      expect(input).to.have.attr("required")
    })
  })

  it("should not accept more than 5 characters", () => {
    cy.get("input[type='text']")
    .type("123456")
    .should("have.value", "12345")
  })
  
  it("should not accept less than 5 characters", () => {
    cy.get("input[type='text']")
    .type("1234")
    .then(($input) => {
      expect($input[0].checkValidity()).to.be.false
    })
  })

  it("should only allow numbers", () => {
    cy.get("input[id='zip']")
    .type("abcde")
    .then(($input) => {
      expect($input[0].checkValidity()).to.be.false
    })
  })

  // it("should submit and navigate with valid zip", () => {
  //   cy.get("input[id='zip']")
  //   .type("80550")

  //   cy.get("form")
  //   .submit()

  //   cy.url()
  //   .should("include", "/petfinder")
  // })
})