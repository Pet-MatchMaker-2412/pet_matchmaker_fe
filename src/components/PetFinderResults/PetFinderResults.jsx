import {  useNavigate, useLocation, Link } from "react-router-dom"

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
            <h1>Pet MatchMaker 🐾</h1>
            <nav>
              <button onClick={goHome}>Home</button>
              <button onClick={goToProfile}>Profile</button>
            </nav>
          </header>
          <section>
            <h2>Suggested Pets in {zipCode}!</h2>
            <p>Matching pet type: {matchResults?.type}</p>
            <article>
              <h3>{pet.name}</h3>
              <img src={pet.photo_url} alt={pet.name} style={{ maxWidth: "300px" }} />
              <p>Species: {pet.species}</p>
              <p>Age: {pet.age}</p>
              <p>Gender: {pet.gender}</p>
              <p>Size: {pet.size}</p>
              <p>Location: {pet.city}, {pet.state}</p>
              <p>Description: {pet.description}</p>
              <button onClick={() => window.location.href = `mailto:${pet.email}`}>
              Inquire About {pet.name}
            </button>
            </article>
          </section>
        </main>
      )
}
export default PetFinderResults