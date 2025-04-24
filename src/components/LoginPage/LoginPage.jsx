import { useState } from "react";
import { useNavigate } from "react-router-dom"
import mockUser from "../../data/UserData.json"
import './LoginPage.css'

function LoginPage({ setCurrentUser }) {
    const [username, setUsername] = useState("")
    const [error, setError]       = useState(null)
    const [mode, setMode]         = useState("login")
    const navigate                = useNavigate()

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
        console.log("USER:",user_info.data)
            setCurrentUser(user_info); 
            navigate("/welcome");
          } catch (error) {
            console.error(error.message);
            setError(error.message || "An error occurred during login.");
          }
    }

    return (
        <main>
            <h1>Login</h1>
            <form className="login-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <p className="existing-user1">Existing User?</p>
                <p className="existing-user2">Welcome Back! Enter Username & Press Login Button Below!</p>
                <button className="existing-user-login-button" type="submit">Login Existing User</button>
           
                <p className="new-user1">New User?</p>
                <p className="new-user2">Welcome! Enter Username & Press Sign Up Button Below!</p>
                <button className="new-user-login-button" type="submit">Sign Up New User</button>

                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>       
        </main>
    )
}

export default LoginPage