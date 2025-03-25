import './Profile.css';
import { useNavigate } from 'react-router-dom';

function Profile({ username, bio }) {
    const navigate = useNavigate();

    function exitProfile() {
        navigate(-1);
    }

    return (
        <div className="profile-container">
            <div className="card">
                <div className="exit-btn-container">
                    <button className="exit-btn" onClick={exitProfile}>X</button>
                </div>
                <div className="column">
                    <img src="https://placehold.co/300" className="profilePic" alt="Profile" />
                </div>
                <div className="column">
                    <h1 className="title">{username}'s Profile</h1>
                    <h2 className="bio-title">Bio:</h2>
                    <div className="bio">{bio}</div>
                </div>
            </div>
        </div>
    );
}

export default Profile;