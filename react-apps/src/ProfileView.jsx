import './Profile.css';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function ProfileView() {
    const {userId} = useParams();
    const navigate = useNavigate();
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function fetchProfile() {
            try {
                const response = await fetch(`http://localhost:5050/profile/${userId}`);
                const data = await response.json();
                
                if (response.ok) {
                    setProfile(data);
                } else {
                    console.error("Failed to fetch profile:", data.message);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }
        fetchProfile();
    }, [userId]);

    function exitProfile() {
        navigate('/home');
    }


    const profileImageUrl = profile?.profilePicture 
    ? `http://localhost:5050${profile.profilePicture}` 
    : "https://placehold.co/300";


    return (
        <div className="profile-container">
            <div className="card">
                <div className="exit-btn-container">
                    <button className="exit-btn" onClick={exitProfile}>X</button>
                </div>
                {profile ? (
                    <>
                        <div className="column">
                            <img 
                                src={profileImageUrl} 
                                className="profilePic" 
                                alt="Profile" 
                            />
                        </div>
                    <div className="column">
                        <h1 className="title">{profile.username}'s Profile</h1>
                        <h2 className="bio-title">Bio:</h2>
                        <div className="bio">{profile.bio}</div>
                    </div>
                </>
            ) : (
                <p>Loading profile...</p> // Show a loading message while the profile is being fetched
            )}
            </div>
        </div>
    );
}

export default ProfileView;