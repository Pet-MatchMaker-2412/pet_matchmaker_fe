import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuestionCard({currentUser, questions, setMatchResults}) {
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const navigate = useNavigate()

    const handleSelect = (questionId, answerId) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerId,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    
        const totalQuestions = questions.length
        const totalAnswered = Object.keys(selectedAnswers).length
    
        if (totalAnswered < totalQuestions) {
                alert("Please answer all questions before submitting.")
            return
        }

        const answerIds = Object.values(selectedAnswers)

        fetch(`http://localhost:3000/api/v1/users/${currentUser.id}/questionnaire_submissions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ answer_ids: answerIds }),
        })
            .then((res) => res.json())
            .then((data) => {
                const recommendedAnimal = data.data.attributes.recommended_animal.data.attributes
                const submissionId = data.data.id
                setMatchResults({ ...recommendedAnimal, submissionId })
                navigate("/results")
            })
            .catch((err) => {
                console.error("Failed to submit questionnaire:", err)
            });
    }

    return (
        <form onSubmit={handleSubmit}>
            {questions.map((question) =>(
                <div key={question.id}>
                    <p>{question.attributes.text}</p>
                    {question.attributes.answers.map((answer) => (
                        <label key={answer.id}>
                            <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={answer.id}
                            checked={selectedAnswers[question.id] === answer.id}
                            onChange={() => handleSelect(question.id, answer.id)}
                            />
                            {answer.attributes.text}
                        </label>
                    ))}
                </div>
            ))}
            <button type="submit">Submit</button>
        </form>
    )
}

export default QuestionCard