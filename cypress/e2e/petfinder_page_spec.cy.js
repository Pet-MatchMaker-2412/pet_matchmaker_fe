describe('PetFinderResults Page', () => {
  const mockPet = {
    name: 'Spot',
    photo_url: 'https://photos.petfinder.com/photos/pets/42706540/1/?bust=1546042081',
    age: 'Young',
    gender: 'Male',
    size: 'Medium',
    species: 'Dog',
    city: 'Jersey City',
    state: 'NJ',
    description: 'Spot is an amazing dog',
    email: 'petfindertechsupport@gmail.com'
  }

  beforeEach(() => {
    cy.visit('/results')
  })

  it('displays the header and location', () => {
    cy.get('input#zip').type('55925')
    cy.contains('Find Pets Near Me').click()
    cy.url().should('include', '/petfinder')
    cy.get('h1').contains('Pet MatchMaker 🐾')
    cy.get('h2').contains('Suggested Pets in 55925')
  })

  it('displays the pet info correctly', () => {
    cy.get('input#zip').type('55925')
    cy.contains('Find Pets Near Me').click()
    cy.contains(mockPet.name)
    cy.get('img').should('have.attr', 'src', mockPet.photo_url)
    cy.contains(`Species: ${mockPet.species}`)
    cy.contains(`Age: ${mockPet.age}`)
    cy.contains(`Gender: ${mockPet.gender}`)
    cy.contains(`Size: ${mockPet.size}`)
    cy.contains(`Location: ${mockPet.city}, ${mockPet.state}`)
    cy.contains(`Description: ${mockPet.description}`)
  })

  it('has a working email inquiry link', () => {
    cy.get('input#zip').type('55925')
    cy.contains('Find Pets Near Me').click()
    cy.get('button').contains(`Inquire About ${mockPet.name}`)
    cy.get('a[href^="mailto:"]').should('have.attr', 'href', `mailto:${mockPet.email}`)
  })
})
