import { useNavigate } from "react-router-dom";

function QuestionnairePage() {
    const navigate = useNavigate()

    const goHome = () => navigate("/welcome")
    const goToProfile = () => navigate("/profile")

    return (
        <main>
            <header>
                <h1>Pet MatchMaker</h1>
                <nav>
                    <button onClick={goHome}>Home</button>
                    <button onClick={goToProfile}>Profile</button>
                </nav>
            </header>
        </main>
    )
}

export default QuestionnairePage