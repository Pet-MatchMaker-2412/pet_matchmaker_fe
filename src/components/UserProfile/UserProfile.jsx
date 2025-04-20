import { useLocation } from "react-router-dom";

function UserProfile() {
    const location = useLocation()
    console.log("Location state:", location.state);
    const { currentUser } = location.state || {}
    return (
        <main>
            <h1>Your Profile</h1>
        </main>
    );
}
export default UserProfile;