import { useState } from "react";
import { useNavigate } from "react-router-dom";

function QuestionCard({questions, setMatchResults}) {
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
        
        navigate("/results")
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