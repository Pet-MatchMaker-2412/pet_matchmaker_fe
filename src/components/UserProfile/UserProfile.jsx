import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';

function UserProfile() {
    const location = useLocation()
    const navigate = useNavigate()
    const goHome = () => navigate("/welcome")
    const { currentUser } = location.state || {}
    // console.log(currentUser) //current user is null, keeping since I will edit this code on another branch
    // const username = currentUser.attributes.username
    return (
        <main>
            <h1> Pet MatchMaker Profile 🐾</h1>
          <nav>
              <button onClick= {goHome}> Welcome Page</button>
          </nav>
        </main>
    );
}
export default UserProfile;