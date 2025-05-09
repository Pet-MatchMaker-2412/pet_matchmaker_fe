import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./QuestionCard.css"


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

        const answerIds = Object.values(selectedAnswers).map(id => parseInt(id))


        fetch(`https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/users/${currentUser.id}/questionnaire_submissions`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ answer_ids: answerIds }),
        })
            .then((res) => res.json())
            .then((data) => { 
                const recommendedAnimal = data.data.attributes.recommended_animal.data.attributes
                const recommendedAnimalId = data.data.attributes.recommended_animal.data.id
                const submissionId = data.data.id
                console.log('submissionId:', submissionId)
                console.log('recommendedAnimalId:', recommendedAnimalId)
                console.log('recommendedAnimal:', recommendedAnimal)
                setMatchResults({ ...recommendedAnimal, 
                    recommended_animal_id: recommendedAnimalId,
                    submissionId})
                navigate("/results") 
            })
            .catch((err) => {
                console.error("Failed to submit questionnaire:", err)
            });
            
    }

    return (
        <form className="question-card" onSubmit={handleSubmit}>
            {questions.map((question) =>(
                <div className="q-and-a" key={question.id}>
                    <p><strong>{question.attributes.text}</strong></p>
                    {question.attributes.answers.map((answer) => (
                        <label className="pawprint" key={answer.id}>
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
            <button className="submit-button" type="submit">Submit</button>
        </form>
    )
}

export default QuestionCard