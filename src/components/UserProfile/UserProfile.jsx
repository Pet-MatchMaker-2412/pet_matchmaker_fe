import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

function UserProfile({ currentUser }) {
    console.log('currentUser', currentUser)
    const username = currentUser.username || "Guest"

    const [submissions, setSubmissions] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (currentUser?.id) {
            displaySavedSubmissions(currentUser.id)
        } 
    }, [currentUser])

    function displaySavedSubmissions(id) {

        setLoading(true)
        fetch(`http://localhost:3000/api/v1/users/${id}/questionnaire_submissions`)
        // fetch(`https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/users/${id}/questionnaire_submissions`)
        .then((response) => response.json())
        .then((data) => {
            if (data && data.data) {
                setSubmissions(data.data)
            }
            setLoading(false)
        })
        .catch((err) => {
            console.log("Unable to fetch user submissions", err)
            setLoading(false)
        })
    }

    if (loading) {
        return (
          <section className='UserProfile'>
            <div className="loading">Loading submission details...</div>
          </section>
        )
    }

    return (
        <main>
            <h1>🐾 {username}'s Pet MatchMaker Profile 🐾</h1>
            <nav>
                <Link to="/welcome">
                    <button>Welcome Page</button>
                </Link>
            </nav>
            <h2>Your Questionnaire Submissions</h2>
            {submissions.length > 0 ? (
                submissions.map((submission, index) => {
                    const recommendedAnimal = submission?.attributes?.recommended_animal?.data

                    if (!submission?.attributes?.saved) return null

                    return (
                        <div key={index} className="submission">
                            <p>Recommended Pet: {recommendedAnimal?.attributes?.animal_type}</p>
                            <img
                                src={recommendedAnimal?.attributes?.photo_url}
                                alt={recommendedAnimal?.attributes?.animal_type}
                                style={{ maxWidth: '200px' }}
                            />
                            <Link to="/results">
                                <button>Click for more!</button>
                            </Link>
                        </div>
                    )
                })
            ) : (
                <p>No questionnaire submissions yet.</p>
            )}
        </main>
    )
}

export default UserProfile
