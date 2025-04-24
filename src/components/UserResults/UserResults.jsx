import { useNavigate } from "react-router-dom";
import { useState } from "react";


function UserResults({ matchResults, saveMatch }) {
    const [zipCode, setZipCode] = useState("")
    const navigate = useNavigate()
    const goHome = () => navigate("/welcome")
    const goToProfile = () => navigate("/profile")

    const saveCurrentMatch = () => {
       saveMatch(matchResults)
      }

   
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
                <p>{matchResults.type}</p>
                <img src={matchResults.photo_url} alt={`A cute little ${matchResults.type}`} />
                <button onClick={saveCurrentMatch}>Save Pet</button>
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