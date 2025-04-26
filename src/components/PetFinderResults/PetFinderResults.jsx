import {  useNavigate, useLocation } from "react-router-dom"
import petfinderData from "../../data/PetFinderData.json"
import "./PetFinderResults.css"

function PetFinderResults() {
    const { state } = useLocation()
    const navigate = useNavigate()
    const goHome = () => navigate('/welcome')
    const goToProfile = () => navigate('/profile')

    const zipCode = state?.zipCode
    const matchResults = state?.matchResults
    const pet = petfinderData.data.attributes

    return (
        <main>
          <header>
            <h1>🐾 Pet MatchMaker 🐾</h1>
            <nav>
              <button onClick={goHome}>Home</button>
              <button onClick={goToProfile}>Profile</button>
            </nav>
          </header>
          <section>
            <h1>Suggested Pets in {zipCode}!</h1>
            <h3><strong>Matching pet type: {matchResults?.type}</strong></h3>
            <article>
              <h1>{pet.name}</h1>
              <img className="found-pet-img" src={pet.photo_url} alt={pet.name} style={{ maxWidth: "300px" }} />
              <p><strong>Species: {pet.species}</strong></p>
              <p><strong>Age: {pet.age}</strong></p>
              <p><strong>Gender: {pet.gender}</strong></p>
              <p><strong>Size: {pet.size}</strong></p>
              <p><strong>Location: {pet.city}, {pet.state}</strong></p>
              <p><strong>Description: {pet.description}</strong></p>
              <button className="inquire-button" onClick={() => window.location.href = `mailto:${pet.email}`}>Inquire About {pet.name}</button>
            </article>
          </section>
        </main>
      )
}
export default PetFinderResults