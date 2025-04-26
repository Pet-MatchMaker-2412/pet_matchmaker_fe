import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

function UserProfile({ currentUser, setMatchResults }) {
    console.log('currentUser', currentUser)
    const username = currentUser.username || "Guest"

    const [submissions, setSubmissions] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if (currentUser?.id) {
            displaySavedSubmissions(currentUser.id)
        } 
    }, [currentUser])

    function displaySavedSubmissions(id) {

        setLoading(true)
        fetch(`https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/users/${id}/questionnaire_submissions`)
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
  
  function seeResults(recommendedAnimal, recommendedAnimalId, submissionId) {
    setMatchResults({ ...recommendedAnimal, recommended_animal_id: recommendedAnimalId, submissionId })
    navigate("/results")
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
            <h1>{username}'s Pet MatchMaker Profile 🐾</h1>
            <nav>
                <Link to="/welcome">
                    <button>Welcome Page</button>
                </Link>
            </nav>
            <h2>Your Questionnaire Submissions</h2>
            {submissions.length > 0 ? (
                submissions.map((submission, index) => {
                    const recommendedAnimal = submission?.attributes?.recommended_animal?.data
                    const recommendedAnimalId = submission?.attributes?.recommended_animal?.data?.id
                    const submissionId = submission?.attributes?.recommended_animal?.data?.id

                    if (!submission?.attributes?.saved) return null

                    return (
                        <div key={index} className="submission">
                            <p>Recommended Pet: {recommendedAnimal?.attributes?.animal_type}</p>
                            <img
                                src={recommendedAnimal?.attributes?.photo_url}
                                alt={recommendedAnimal?.attributes?.animal_type}
                                style={{ maxWidth: '200px' }}
                            />
                            <button onClick={() => seeResults(recommendedAnimal.attributes, recommendedAnimalId, submissionId)}>Click for more!</button>
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
