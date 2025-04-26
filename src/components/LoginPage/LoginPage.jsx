import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.css';

function LoginPage({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [mode, setMode] = useState();
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `http://localhost:3000/api/v1/users?username=${username}`;

    if (!username.trim()) {
      setError("Please enter a valid username");
      return;
    }

    try {
      if (mode === "login") {
        const responseForExistingUser = await fetch(url);
        if (!responseForExistingUser.ok)
          throw new Error(`Response status: ${responseForExistingUser.status}`);

        const user_info = await responseForExistingUser.json();
        if (!user_info) {
          setError("Hmm, we didn't find that Username. Try Again?");
          return;
        }

        console.log("USER:", user_info.data);
        setCurrentUser({
            id: user_info.data.id,
            username: user_info.data.attributes.username
          });
        window.alert("Login Successful!");
        navigate("/welcome");

      } else if (mode === "signup") {
        const responseForNewUser = await fetch(url);
        if (responseForNewUser.ok) {
          setError("Username already exists");
          return;
        }

        const addNewUserResponse = await fetch("http://localhost:3000/api/v1/users", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ username })
        });

        if (!addNewUserResponse.ok) {
          const errorData = await addNewUserResponse.json();
          console.log("ErrorData:", errorData);
          throw new Error("Failed to create user");
        }

        const newUser = await addNewUserResponse.json();
        setCurrentUser({
            id: newUser.data.id,
            username: newUser.data.attributes.username
          });
        window.alert("Signup Successful! Logging in!");
        navigate("/welcome");
      }
    } catch (error) {
      console.error(error.message);
      setError(error.message || "An error occurred during login.");

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
  };

  return (
    <main>
      <h1>🐾 Welcome! 🐾</h1>
      <h2>Login or Sign Up</h2>

      <form className="login-form" onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
        />

        <div className="mode-toggle" onMouseLeave={() => setHoveredButton(null)}>
            <button
            type="submit"
            className="login"
            onClick={() => setMode("login")}
            onMouseEnter={() => setHoveredButton("login")}
            >
            Login
            </button>
            <button
            type="submit"
            className="signup"
            onClick={() => setMode("signup")}
            onMouseEnter={() => setHoveredButton("signup")}
            >
            Sign Up
            </button>

            {hoveredButton === "login" && (
                <p className="hover-message">Click Me if You Have a Username!</p>
            )}
  
            {hoveredButton === "signup" && (
                <p className="hover-message">Fill Out Username and Click Sign Up</p>
            )}
        </div>

        {error && <p style={{ color: "red" }}>{error}</p>}
    </form> 
      
    </main>
  );
}

export default LoginPage;