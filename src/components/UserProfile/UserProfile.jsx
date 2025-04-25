import { Link } from 'react-router-dom'
import { useEffect, useState } from "react";

function UserProfile({ currentUser }) {
    const [savedPets, setSavedPets] = useState([]);
    const username = currentUser?.attributes?.username || "Guest" 

    useEffect(() => {
        if (!currentUser) return

        fetch(`http://localhost:3000/api/v1/users/${currentUser.id}/questionnaire_submissions`)
            .then(res => res.json())
            .then(data => {
                const pets = data.data.map((submission) => {
                    const animal = submission.attributes.recommended_animal.data.attributes
                    return {
                        ...animal,
                        id: submission.id
                    }
                })
                setSavedPets(pets)
            })
            .catch(err => console.error("Failed to fetch saved pets:", err))
    }, [currentUser])

    return (
        <main>
            <h1>{username}'s Pet MatchMaker Profile 🐾</h1>
            <nav>
                <Link to="/welcome">
                    <button>Welcome Page</button>
                </Link>
            </nav>
            <h2>Your Saved Pet Results</h2>
            <div>
                {savedPets.length > 0 ? (
                    savedPets.map((pet) => (
                        <div key={pet.id}>
                            <p>Type: {pet.animal_type}</p>
                            <img src={pet.photo_url} alt={pet.animal_type} />
                            <Link to="/results">
                                <button>Click for more!</button>
                            </Link>
                        </div>
                    ))
                ) : (
                    <p>No pets saved yet. Please complete the questionnaire to save pets.</p>
                )}
            </div>
        </main>
    )
}
export default UserProfile