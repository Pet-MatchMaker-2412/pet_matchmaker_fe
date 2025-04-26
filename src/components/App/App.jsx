import { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from '../LoginPage/LoginPage'
import WelcomePage from '../WelcomePage/WelcomePage'
import ResourcesPage from '../Resources/ResourcesPage'
import UserProfile from '../UserProfile/UserProfile'
import QuestionnairePage from '../QuestionnairePage/QuestionnairePage'
import UserResults from '../UserResults/UserResults'
import PetFinderResults from '../PetFinderResults/PetFinderResults'

import './App.css'


function App() {
    const [currentUser, setCurrentUser] = useState(null)
    const [matchResults, setMatchResults] = useState(null)
    
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage setCurrentUser={setCurrentUser} />} />
                <Route path="/welcome" element={<WelcomePage />} />
                <Route path="/profile" element={<UserProfile currentUser={currentUser} setMatchResults={setMatchResults}/>} />
                <Route path="/resources" element={<ResourcesPage />} />
                <Route path='/questionnaire' element={<QuestionnairePage currentUser={currentUser} setMatchResults={setMatchResults}/>} />
                <Route path='/resources' element={<ResourcesPage />} />
                <Route path='/results' element={<UserResults currentUser={currentUser} matchResults={matchResults}  />} />
                <Route path='/petfinder' element={<PetFinderResults />} />
            </Routes>
        </Router>
    )
}

export default App;