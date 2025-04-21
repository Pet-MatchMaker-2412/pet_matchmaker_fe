import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import mockResultData from '../../data/QuestionnaireSubmissionData.json'

function UserProfile() {
    const location = useLocation()
    const navigate = useNavigate()
    const goToResults = () => navigate("/results")
    const goHome = () => navigate("/welcome")
    const { currentUser } = location.state || {}
    const [recommendedPets, setRecommendedPets] = useState([])
    console.log(currentUser) 
    const username = currentUser.attributes.username

    useEffect(() => {
        if (currentUser) {
            const pets = mockResultData.data.map(submission => {
                return submission.recommended_animal.data.attributes
            })
            setRecommendedPets(pets)
        }
    }, [currentUser])

    let petContent

if (recommendedPets.length > 0) {
  petContent = recommendedPets.map((pet, index) => (
    <div key={index}>
      <p>Type: {pet.type}</p>
      <img
        src={pet.photo_url}
        alt={pet.type}
      />
      <h2> This is where the quiz summary will go. </h2>
      <button onClick= {goToResults}> Click for more! </button>
    </div>
    
  ))
} else {
  petContent = <p>No recommended pets found.</p>
}

    return (
        <main>
            <h1> {username}'s Pet MatchMaker Profile 🐾</h1>
          <nav>
              <button onClick= {goHome}> Welcome Page</button>
          </nav>
          <h2> Your Recommended Pet Results</h2>
          <div>{petContent}</div>
        </main>
    )
}
export default UserProfile;