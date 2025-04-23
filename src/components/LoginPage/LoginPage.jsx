import { useState } from "react";
import { useNavigate } from "react-router-dom"
import mockUser from "../../data/UserData.json"

function LoginPage({ setCurrentUser }) {
    const [username, setUsername] = useState("")
    const [error, setError] = useState(null)
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("http://localhost:3000/api/v1/users")


        if (!username.trim()) {
            setError("Please enter a valid username")
            return
        }

        setCurrentUser(mockUser.data)
        navigate("/welcome")
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