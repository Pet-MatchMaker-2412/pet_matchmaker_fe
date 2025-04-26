import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom'

function UserResults({ currentUser, matchResults }) {
    const [zipCode, setZipCode] = useState("")
    const navigate = useNavigate()

    const saveCurrentMatch = (submissionId) => {
        console.log('currentUser', currentUser)
        fetch(`http://localhost:3000/api/v1/users/${currentUser.id}/questionnaire_submissions/${submissionId}`, {
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
            })
    };

    const handleZipSubmit = async (e) => {
    e.preventDefault();

    try {
        const response = await fetch(`http://localhost:3000/api/v1/petfinder_animals?recommended_animal_id=${matchResults.recommended_animal_id}&zipcode=${zipCode}`);

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
    return (
        <main>
            <header>
                <h1>Pet MatchMaker</h1>
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
                <h2>Your Suggested Pet:</h2>
                <p>{matchResults.animal_type}</p>
                <img src={matchResults.photo_url} alt={`A cute little ${matchResults.animal_type}`} />
                <p>{matchResults.description}</p>
                <button onClick={() => saveCurrentMatch(matchResults.submissionId)}>
                    Save Pet
                </button>
            </section>
            <section>
                <form onSubmit={handleZipSubmit}>
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
                    <button type="submit">Find Pets Near Me</button>
                </form>
            </section>
        </main>
    )
}

export default UserResults