import { useNavigate } from 'react-router-dom';

function ResourcesPage() {
    const navigate = useNavigate()
    const goHome = () => navigate("/welcome")
    return (
        <main>
            <h1>🐾 Resources 🐾</h1>
            <p>This is where resources for people interested in service animals and any additional info can go.</p>
            <button onClick={goHome}>Home</button>
        </main>
    );
}

export default ResourcesPage;
