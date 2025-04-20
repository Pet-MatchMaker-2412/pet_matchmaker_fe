import { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage'
import WelcomePage from '../WelcomePage/WelcomePage'
import ResourcesPage from '../Resources/ResourcesPage'

import './App.css'
import QuestionnairePage from '../QuestionnairePage/QuestionnairePage';

function App() {
    const [currentUser, setCurrentUser] = useState(null)

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage setCurrentUser={setCurrentUser} />} />
                <Route path="/welcome" element={<WelcomePage currentUser={currentUser} />} />
                <Route path='/questionnaire' element={<QuestionnairePage />} />
                <Route path='/resources' element={<ResourcesPage />} />
            </Routes>
        </Router>
    )
}

export default App;