import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import QuestionCard from "../QuestionCard/QuestionCard";


function QuestionnairePage({ currentUser, setMatchResults}) {
    const navigate = useNavigate()
    const [questions, setQuestions] = useState([])

    const goHome = () => navigate("/welcome")
    const goToProfile = () => navigate("/profile")

    useEffect(() => {
        fetch("http://localhost:3000/api/v1/questions")
        .then((response) => response.json())
        .then((data) => setQuestions(data.data))
        .catch((err) => console.error("Failed to fetch questions:", err))
    }, [])

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
                <QuestionCard currentUser={currentUser} questions={questions} setMatchResults={setMatchResults} />
            </section>
        </main>
    )
}

export default QuestionnairePage