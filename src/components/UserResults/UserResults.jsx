import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Link } from 'react-router-dom'
import "./UserResults.css"

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

    const handleZipSubmit = (e) => {
        e.preventDefault()
        navigate("/petfinder", {
            state: {
                zipCode,
                matchResults
            }
        })
    };

    console.log('matchresults', matchResults)
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

export default UserResults