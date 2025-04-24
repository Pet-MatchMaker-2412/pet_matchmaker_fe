import { Link } from "react-router-dom";
import QuestionCard from "../QuestionCard/QuestionCard";

function QuestionnairePage() {
    return (
        <main>
            <header>
                <h1>Pet MatchMaker</h1>
                <nav>
                    <Link to="/welcome">
                        <button>Home</button>
                    </Link>
                    <Link to="/profile">
                        <button>Profile</button>
                    </Link>
                </nav>
            </header>
            <section>
                <QuestionCard />
            </section>
        </main>
    )
}

export default QuestionnairePage