import { useNavigate } from "react-router-dom";
import { useState } from "react";


function UserResults({ matchResults, saveMatch }) {
    const [zipCode, setZipCode] = useState("")
    const navigate = useNavigate()
    const goHome = () => navigate("/welcome")
    const goToProfile = () => navigate("/profile")

    

    const saveCurrentMatch = (submissionId) => {
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

    return (
        <main>
            <header>
                <h1>Pet MatchMaker</h1>
                <nav>
                    <button onClick={goHome}>Home</button>
                    <button onClick={goToProfile}>Profile</button>
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