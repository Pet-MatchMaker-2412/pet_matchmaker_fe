import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './LoginPage.scss';

function LoginPage({ setCurrentUser }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(null);
  const [mode, setMode] = useState();
  const [hoveredButton, setHoveredButton] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/users?username=${username}`;

    if (!username.trim()) {
      setError("Please enter a valid username");
      return;
    }

    try {
      if (mode === "login") {
        const responseForExistingUser = await fetch(url);
        
        if (responseForExistingUser.status === 404) {
          setError("Hmm, we didn't find that Username. Try Again?");
        return;
        }

        if ((!responseForExistingUser.ok)) {
          throw new Error(`Response status: ${responseForExistingUser.status}`);
        }

        const user_info = await responseForExistingUser.json();

        console.log("USER:", user_info.data);
        setCurrentUser({
            id: user_info.data.id,
            username: user_info.data.attributes.username
          });
        window.alert("Login Successful!");
        navigate("/welcome")
        
      } else if (mode === "signup") {
        const responseForNewUser = await fetch(url);
        if (responseForNewUser.ok) {
          setError("Username already exists");
          return;
        }

        const addNewUserResponse = await fetch("https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/users", {
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
      setError(error.message);

      try {
            const response = await fetch(`https://pet-matchmaker-api-da76dbdc99ce.herokuapp.com/api/v1/users?username=${username}`);

            
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
      <div className="fish-container">
        <img src="/assets/swimming_fish.png" alt="cute fish" className="animated-fish small-fish" />
        <img src="/assets/swimming_fish.png" alt="cute fish" className="animated-fish medium-fish" />
        <img src="/assets/swimming_fish.png" alt="cute fish" className="animated-fish large-fish" />
      </div>
      <div className="container">
        <div className="card">
          <h1 className="card_title">🐾 Welcome! 🐾</h1>
          <p className="card_title-info">Pen By Anna Batura</p>
          <form className="card_form" onSubmit={handleSubmit}>
            <div className="input">
              <input 
                type="text" 
                className="input_field" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required 
              />
              <label className="input_label">Username</label>
            </div>
            <button 
              type="submit" 
              className="card_button"
              onClick={() => setMode("login")}
              onMouseEnter={() => setHoveredButton("login")}
            >Get started</button>
            <button 
              type="submit"
              className="card_button"
              onClick={() => setMode("signup")}
              onMouseEnter={() => setHoveredButton("signup")}
            >Sign Up</button>
            {hoveredButton === "login" && (
              <p className="hover-message">Click Me if You Have a Username!</p>
            )}

            {hoveredButton === "signup" && (
              <p className="hover-message">Fill Out Username and Click Sign Up</p>
            )}
            {error && <p style={{ color: "red" }}>{error}</p>}
          </form>
        </div>
      </div>
      <a className="link" href="https://codepen.io/Anna_Batura/" target="_blank">
        <svg className="rabbit" version="1.2" viewBox="0 0 600 600">
          <path d="m 335.94313,30.576451 c -9.79312,-0.146115 -17.39091,4.439466 -17.39091,13.789758 0,11.508038 -2.91019,60.415461 1.40532,76.238951 4.31553,15.82355 21.58583,38.97215 34.51834,54.67597 10.06946,12.22726 4.34772,41.69626 4.34772,56.0813 0,14.38499 -2.89751,25.9107 -8.65153,25.9107 -5.75402,0 -14.35971,5.75217 -20.11373,11.50612 -5.75395,5.75402 -11.51588,12.95631 -18.70841,7.20229 -7.19251,-5.75402 -20.15388,-11.49441 -43.16987,-15.80992 -23.01609,-4.31551 -61.84129,-0.0234 -86.29583,8.60763 -24.45458,8.63104 -76.25857,56.11061 -90.643535,77.6882 -14.385056,21.5775 -15.799189,87.73247 -14.36068,97.80193 1.438509,10.06953 -2.908267,17.28255 -10.100778,8.65153 -7.192459,-8.63104 -12.911438,-4.30381 -12.911438,-4.30381 0,0 -7.202292,14.37045 -7.202292,21.56298 0,7.19244 2.854564,14.36068 2.854564,14.36068 0,0 -11.506099,8.65056 -11.506099,14.40458 0,5.75397 11.515881,15.83044 18.708391,24.46146 7.192546,8.63097 31.651182,25.89997 41.720624,24.46148 10.069543,-1.43851 28.775063,-0.0121 35.967573,4.3038 7.19253,4.31551 24.44687,10.06761 46.02443,11.5061 21.57752,1.43851 81.97845,5.75307 97.80193,5.75307 15.82357,0 20.1675,-2.86435 27.35996,-10.05688 7.19253,-7.19245 -5.78527,-15.84115 -10.10079,-25.9107 -4.31551,-10.06946 14.40363,-7.16912 20.15765,-8.60763 5.75402,-1.43849 21.59424,-11.5061 31.66376,-11.5061 10.06953,0 8.6165,10.05589 21.56298,15.80993 12.94654,5.75393 31.63939,24.43902 46.02443,27.31602 14.38497,2.87695 47.47173,0.0121 58.97979,-4.30381 11.50797,-4.31551 10.06946,-14.37044 0,-21.56297 -10.06955,-7.19244 -34.50663,-20.16742 -38.82214,-27.35994 -4.31551,-7.19246 -5.74329,-15.81969 1.44924,-23.01224 7.19251,-7.19252 14.35876,-4.30292 25.86678,-10.05685 11.50806,-5.75402 15.80992,-23.04354 15.80992,-33.11301 0,-10.06953 1.36928,-21.01352 5.75307,-27.31602 3.67345,-5.28128 5.10015,-22.13212 5.30499,-33.64009 0.21874,-12.28864 -5.29329,-15.24871 -9.60881,-22.44122 -4.31543,-7.19246 4.30285,-17.25917 10.05687,-17.25917 5.75402,0 31.65108,-4.33602 41.72062,-8.65153 10.06946,-4.31546 20.16744,-23.03273 27.35995,-31.66377 7.19246,-8.63095 1.41799,-27.31512 -8.65154,-33.06907 -10.06954,-5.75402 -10.07746,-21.59431 -18.70841,-31.66377 -8.63103,-10.06953 -18.68507,-31.62961 -27.31604,-38.82213 -8.63101,-7.19253 -28.77502,-12.95535 -35.96755,-12.95535 -7.19253,0 -11.50612,9e-4 -11.50612,-5.75306 0,-5.75402 -1.44924,-12.9203 -1.44924,-25.86678 0,-12.94655 -16.24344,-68.464566 -37.3729,-102.149659 -4.40799,-7.027282 -11.5581,-5.405316 -20.15765,-2.898485 -5.69412,1.659863 -8.60761,4.35564 -8.60761,23.056136 0,18.700566 -11.50515,-0.03133 -17.25917,-10.100794 -5.75403,-10.069512 -15.86265,-21.58444 -28.80918,-24.461458 -2.42749,-0.539415 -4.76669,-0.800692 -7.02665,-0.834399 z" id="rabbit"></path>
          <defs>
            <filter id="goo">
              <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
              <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
              <feBlend in="SourceGraphic" in2="goo" />
            </filter>
          </defs>
        </svg>
      </a>
    </main>
  );
}

export default LoginPage;



