import {  useNavigate, useLocation } from "react-router-dom"
import petfinderData from "../../data/PetFinderData.json"
import "./PetFinderResults.css"
import { useLocation, Link } from "react-router-dom"

function PetFinderResults() {
    const { state } = useLocation()

    const zipCode = state?.zipCode
    const matchResults = state?.matchResults
    const petfinderPets = state?.petfinderPets || []

    return (
      <main>
          <header>
            <h1>🐾 Pet MatchMaker 🐾</h1>
            <nav>
                  <Link to="/welcome">
                      <button>Home</button>
                  </Link>
                  <Link to="/profile">
                      <button>Profile</button>
                  </Link>
            </nav>
          </header>
          <section>
              <h2>Suggested Pets in {zipCode}!</h2>
              <p>Matching pet type: {matchResults?.animal_type}</p>

              {petfinderPets.length > 0 ? (
                  petfinderPets.map((petWrapper) => {
                      const pet = petWrapper.attributes;

                      return (
                          <article key={petWrapper.id}>
                              <h3>{pet.name}</h3>
                              <img src={pet.photo_url} alt={pet.name} style={{ maxWidth: "300px" }} />
                              <p>Species: {pet.species}</p>
                              <p>Age: {pet.age}</p>
                              <p>Gender: {pet.gender}</p>
                              <p>Size: {pet.size}</p>
                              <p>Location: {pet.city}, {pet.state}</p>
                              <p>Description: {pet.description}</p>
                              <a href={`mailto:${pet.email}`}>
                                  <button>Inquire About {pet.name}</button>
                              </a>
                          </article>
                      );
                  })
              ) : (
                  <p>No pets found. Please try another zip code!</p>
              )}
          </section>
      </main>
  );
}

export default PetFinderResults;