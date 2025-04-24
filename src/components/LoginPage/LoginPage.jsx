import { useState } from "react";
import { useNavigate } from "react-router-dom"
import mockUser from "../../data/UserData.json"

function LoginPage({ setCurrentUser }) {
    const [username, setUsername] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!username.trim()) {
            setError("Please enter a valid username")
            return
        }

        try {
            const response = await fetch(`http://localhost:3000/api/v1/users?username=${username}`);

            
            if (!response.ok) {
              throw new Error(`Response status: ${response.status}`);
            }
        
            const user_info = await response.json();
            if (!user_info) {
              setError("User name not found");
              return;
            }
    
            setCurrentUser({
                id: user_info.data.id,
                username: user_info.data.attributes.username
            })

            navigate("/welcome");
          } catch (error) {
            console.error(error.message);
            setError(error.message || "An error occurred during login.");
          }
    }

    return (
        <main>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </main>
    )
}

export default LoginPage