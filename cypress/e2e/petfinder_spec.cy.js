describe("Petfinder Page", () => {
  beforeEach(() => {
    cy.intercept("GET", "/api/v1/users?username=something_unique", {
      fixture: "UserData",
    }).as("getUser");

    cy.intercept("GET", "/api/v1/users/1/questionnaire_submissions?saved=true", {
      fixture: "SavedAnimals",
    })

    cy.intercept("GET", "/api/v1/users/1/questionnaire_submissions", {
      fixture: "SavedAnimals",
    }).as("getSubmissions");

    cy.intercept(
      "GET",
      "/api/v1/petfinder_animals?recommended_animal_id=1&zipcode=32246",
      {
        fixture: "PetFinderData",
      }
    ).as("getPetfinder");

    cy.visit("http://localhost:5173");

    cy.get('.input').type("something_unique");
    cy.get('.card_form > :nth-child(2)').click();
    cy.get("form").submit();
    cy.wait("@getUser");

    cy.contains("button", "Profile").click();
    cy.wait("@getSubmissions");

    cy.get(".submission").find("button").last().click();

    cy.get('#zip').type("32246");
    cy.get("form").submit();
    cy.wait("@getPetfinder");

    cy.url().should("include", "/petfinder");
  });

  it("displays the header and navigation buttons", () => {
    cy.get("h1").should("contain", "Pet MatchMaker");
    cy.contains("button", "Home").should("exist");
    cy.contains("button", "Profile").should("exist");
  });

  it("navigates to the Welcome page when Home is clicked", () => {
    cy.contains("button", "Home").click();
    cy.url().should("include", "/welcome");
  });

  it("navigates to the Profile page when Profile is clicked", () => {
    cy.contains("button", "Profile").click();
    cy.url().should("include", "/profile");
  });

  it("has a header and section displaying zipcode and recommended animal", () => {
    cy.get("h2").should("contain", "Suggested Pets in 32246!");
    cy.get("section > :nth-child(2)").should(
      "contain",
      "Matching pet type: Golden Retriever"
    );
  });
});
