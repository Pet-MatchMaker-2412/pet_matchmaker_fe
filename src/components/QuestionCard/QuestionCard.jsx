import { useState } from "react";
import { useNavigate } from "react-router-dom";
import questions from "../../data/QuestionnaireData.json"

function QuestionnaireData() {
    const [selectedAnswers, setSelectedAnswers] = useState
    const navigate = useNavigate()

    const handleSelect = (questionId, answer) => {
        setSelectedAnswers({
            ...selectedAnswers,
            [questionId]: answer,
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 

        // add validation
        console.log("Submitted Answers:", selectedAnswers)
        navigate("/results")
    }

    return (
        <form onSubmit={handleSubmit}>
            {questions.map((question) =>(
                <div key={question.id}>
                    <p>{question.question}</p>
                    {question.answers.map((answer, index) => (
                        <label key={index}>
                            <input
                            type="radio"
                            name={`question-${question.id}`}
                            value={answer}
                            checked={selectedAnswers[question.id] === answer}
                            onChange={() => handleSelect(question.id, answer)}
                            />
                        </label>
                    ))}
                </div>
            ))}

            <button type="submit">Submit</button>
        </form>
    )
}

export default QuestionCard