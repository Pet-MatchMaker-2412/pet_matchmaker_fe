import { useState } from 'react'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../LoginPage/LoginPage'
import WelcomePage from '../WelcomePage/WelcomePage'

import './App.css'

function App() {
    const [currentUser, setCurrentUser] = useState(null)

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage setCurrentUser={setCurrentUser} />} />
                <Route path="/welcome" element={<WelcomePage currentUser={currentUser} />} />
            </Routes>
        </Router>
    )
}

export default App;