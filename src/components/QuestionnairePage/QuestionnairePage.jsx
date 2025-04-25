import { Link } from "react-router-dom";
import { useState, useEffect } from "react"
import QuestionCard from "../QuestionCard/QuestionCard";

function QuestionnairePage({ currentUser, setMatchResults}) {
    const [questions, setQuestions] = useState([])

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
                    <Link to="/welcome">
                        <button>Home</button>
                    </Link>
                    <Link to="/profile">
                        <button>Profile</button>
                    </Link>
                </nav>
            </header>
            <section>
                <QuestionCard currentUser={currentUser} questions={questions} setMatchResults={setMatchResults} />
            </section>
        </main>
    )
}

export default QuestionnairePage