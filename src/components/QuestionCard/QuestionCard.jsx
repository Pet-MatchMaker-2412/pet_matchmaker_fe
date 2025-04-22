import { useState } from "react";
import { useNavigate } from "react-router-dom";
import questionData from "../../data/QuestionnaireData.json"

function QuestionCard() {
    const [selectedAnswers, setSelectedAnswers] = useState({})
    const navigate = useNavigate()
    const questions = questionData.data

    const handleSelect = (questionId, answerId) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answerId,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 

        // add validation here
        console.log("Submitted Answers:", selectedAnswers)
        navigate("/results")
    }

    return (
        <form onSubmit={handleSubmit}>
            {questions.map((question) =>(
                <div key={question.id}>
                    <p>{question.attributes.text}</p>
                    {question.relationships.answers.data.map((answer) => (
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