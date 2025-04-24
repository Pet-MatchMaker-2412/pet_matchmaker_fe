import { Link } from 'react-router-dom'

function UserProfile({ currentUser, savedPets }) {
    const username = currentUser?.attributes?.username || "Guest" 

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
                    savedPets.map((pet, index) => (
                        <div key={index}>
                            <p>Type: {pet.type}</p>
                            <img src={pet.photo_url} alt={pet.type} />
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
export default UserProfile;