describe('Resources Page', () => {
  beforeEach(() => {
    cy.visit('localhost:5173/resources');
  });

  it('displays the main heading', () => {
    cy.get('h1').should('contain', '🐾 PetMatchMaker Resources');
  });

  it('displays the service animals section with correct link', () => {
    cy.contains('h2', 'Service Animals').should('exist');
    cy.contains('Learn more about service animals').should('have.attr', 'href', 'https://www.ada.gov/resources/service-animals-faqs/');
  });

  it('displays the dog breeds section with AKC link', () => {
    cy.contains('h2', 'Dog Breeds Info').should('exist');
    cy.contains('Visit the AKC Breed Directory').should('have.attr', 'href', 'https://www.akc.org/dog-breeds/');
  });

  it('displays the veterinary care section with AVMA link', () => {
    cy.contains('h2', 'Veterinary Care').should('exist');
    cy.contains('American Veterinary Medical Association (AVMA)').should('have.attr', 'href', 'https://www.avma.org/resources/pet-owners');
  });

  it('has a link to go back to the welcome page', () => {
    cy.contains('← Back to Home').should('have.attr', 'href', '/welcome');
  });
});
