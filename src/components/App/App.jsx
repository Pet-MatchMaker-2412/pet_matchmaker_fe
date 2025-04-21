import { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage'
import WelcomePage from '../WelcomePage/WelcomePage'
import ResourcesPage from '../Resources/ResourcesPage'
import UserProfile from '../UserProfile/UserProfile'
import QuestionnairePage from '../QuestionnairePage/QuestionnairePage';
import UserResults from '../UserResults/UserResults';
import resultsData from "../../data/QuestionnaireSubmissionData.json"

import './App.css'


function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [matchResults, setMatchResults] = useState(() => {
        const mockPet = resultsData.data[0].recommended_animal.data.attributes
        return mockPet
      })
    const [savedPets, setSavedPets] = useState([])

    const saveMatch = (pet) => {
        setSavedPets([...savedPets, pet])
    }

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage setCurrentUser={setCurrentUser} />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/profile" element={<UserProfile currentUser={currentUser} savedPets={savedPets}/>} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path='/questionnaire' element={<QuestionnairePage />} />
                <Route path='/resources' element={<ResourcesPage />} />
                <Route path="/profile" element={<UserProfile  />} />
                <Route path='/results' element={<UserResults matchResults={matchResults} saveMatch={saveMatch}/>} />
            </Routes>
        </Router>
    )
}

export default App;