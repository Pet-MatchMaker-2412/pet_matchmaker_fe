import { useNavigate } from "react-router";


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
              <button onClick= {goToResources}> Resources</button>
              <button onClick={goToProfile}>Profile</button>
          </nav>
      </header>
      <div>
          Choosing a furry (or maybe scaly!) companion is an exciting decision for any future pet owner. This app helps simplify that process by guiding users through a short lifestyle questionnaire, then recommending the pet that best fits their daily routine, living space, budget, and personal preferences. By promoting thoughtful pet selection, we hope to strengthen the bond between people and their future companions, leading to happier lives for both.
      </div>
      <button onClick={goToQuestionnaire}>Take the Quiz!</button>
      <footer>
        Put any necessary credits here in the footer. 
      </footer>
    </main>
    );
  }
  
  export default WelcomePage;