import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

function WelcomePage() {
    const navigate = useNavigate()
    const goToProfile = () => navigate("/profile")
    const goToQuestionnaire = () => navigate("/questionnaire")
    const goToResources = () => navigate("/resources")
    return (
      <main>
      <header>
          <h1>Pet MatchMaker 🐾</h1>
          <nav>
          <Link to="/resources">
            <button>Resources</button>
          </Link>
          <Link to="/profile">
            <button>Profile</button>
          </Link>
          </nav>
      </header>
      <div>
          Choosing a furry (or maybe scaly!) companion is an exciting decision for any future pet owner. This app helps simplify that process by guiding users through a short lifestyle questionnaire, then recommending the pet that best fits their daily routine, living space, budget, and personal preferences. By promoting thoughtful pet selection, we hope to strengthen the bond between people and their future companions, leading to happier lives for both.
      </div>
      <Link to="/questionnaire">
        <button>Take the Quiz!</button>
      </Link>
      <footer>
        Put any necessary credits here in the footer. 
      </footer>
    </main>
    );
  }
  
  export default WelcomePage;