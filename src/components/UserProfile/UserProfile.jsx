import { useNavigate } from 'react-router-dom';

function UserProfile({ currentUser, savedPets }) {
    const navigate = useNavigate()
    const goToResults = () => navigate("/results")
    const goHome = () => navigate("/welcome")
    const username = currentUser?.attributes?.username || "Guest"

console.log(savedPets);  

    return (
        <main>
            <h1>{username}'s Pet MatchMaker Profile 🐾</h1>
            <nav>
                <button onClick={goHome}>Welcome Page</button>
            </nav>
            <h2>Your Saved Pet Results</h2>
            <div>
                {savedPets.length > 0 ? (
                    savedPets.map((pet, index) => (
                        <div key={index}>
                            <p>Type: {pet.type}</p>
                            <img src={pet.photo_url} alt={pet.type} />
                            <button onClick={goToResults}>Click for more!</button>
                        </div>
                    ))
                ) : (
                    <p>No pets saved yet. Please complete the questionnaire to save pets.</p>
                )}
            </div>
        </main>
    )
}
export default UserProfile;