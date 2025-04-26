import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from 'react-router-dom'
import "./UserResults.css"

function UserResults({ currentUser, matchResults }) {
    const [zipCode, setZipCode] = useState("")
    const [savedAnimalTypes, setSavedAnimalTypes] = useState([]);

    const navigate = useNavigate()
    
 useEffect(() => {
    fetch(`https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/users/${currentUser.id}/questionnaire_submissions?saved=true`)
        .then((response) => response.json())
        .then((data) => {
            const previouslySavedAnimals = data.map(sub => sub.animal_type); 
            setSavedAnimalTypes(previouslySavedAnimals);
        })
        .catch((err) => {
            console.error("Error fetching saved pets:", err);
        });
}, [currentUser.id]);

const alreadySaved = savedAnimalTypes.includes(matchResults.animal_type);

const saveCurrentMatch = (submissionId) => {
    if (alreadySaved) {
        alert("You have already saved this pet!");
        return;
    }

    fetch(`https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/users/${currentUser.id}/questionnaire_submissions/${submissionId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ saved: true }),
    })
        .then((res) => res.json())
        .then(() => {
            alert("Pet saved successfully!")
        })
        .catch((err) => {
            console.error("Failed to save pet:", err)
        });
};
    const handleZipSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/petfinder_animals?recommended_animal_id=${matchResults.recommended_animal_id}&zipcode=${zipCode}`);

        if (!response.ok) {
            throw new Error("Failed to fetch PetFinder animals");
        }

        const data = await response.json();
        console.log("Fetched PetFinder data:", data);

        navigate("/petfinder", {
            state: {
                zipCode,
                matchResults,
                petfinderPets: data.data 
            }
        });
    } catch (error) {
        console.error("Error fetching PetFinder animals:", error);
    }
};

    console.log('matchresults', matchResults)
    console.log(matchResults.description);

    return (
        <main className="results">
            <header>
                <nav>
                    <Link to="/welcome">
                        <button>Home</button>
                    </Link>
                <h1>🐾 Pet MatchMaker 🐾</h1>
                    <Link to="/profile">
                        <button>Profile</button>
                    </Link>
                </nav>
            </header>
            <section>
                <h1>Your Suggested Pet:</h1>
                <h1 className="suggested-pet">{matchResults.animal_type}</h1>
                <img className="pet-image" src={matchResults.photo_url} alt={`A cute little ${matchResults.animal_type}`} />
                <p className="description"><strong>{matchResults.description}</strong></p>
                <button className="save-pet-button" onClick={() => saveCurrentMatch(matchResults.submissionId)}>Save Pet</button>
            </section>
            <section>
                <form className="zip-form" onSubmit={handleZipSubmit}>
                    <label htmlFor="zip">Enter Your Zip Code:</label>
                    <input
                        id="zip"
                        type="text"
                        pattern="\d{5}"
                        maxLength="5"
                        minLength="5"
                        title="Please enter 5-digit zip-code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                    />
                    <button className="find-pets-button" type="submit">Find Pets Near Me</button>
                </form>
            </section>
        </main>
    )
}

export default UserResults;