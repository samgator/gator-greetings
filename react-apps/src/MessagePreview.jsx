import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Message.css'

function MessagePreview({ title, content, image, id, author }) {
    const [profile, setProfile] = useState(null);
    const [username, setUsername] = useState(null);
    const navigate = useNavigate();

    // Fetch profile data
    useEffect(() => {
        async function fetchProfile(userId) {
            try {
                if (!userId) {
                    console.error("No user ID found");
                    return;
                }

                const response = await fetch(`http://localhost:5050/profile/${userId}`);
                const data = await response.json();

                if (response.ok) {
                    setProfile(data);
                    setUsername(data.username);
                } else {
                    console.error("Failed to fetch profile:", data.message);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }

        fetchProfile(author._id);
    }, [author]);

    // Set the profile image URL
    const profileImageUrl = profile?.profilePicture
        ? `http://localhost:5050${profile.profilePicture}`
        : "https://placehold.co/300";

    // Navigate to the detailed message
    function displayMessage() {
        navigate(`message/${id}`);
    }

    return (
        <button className="message-card" onClick={displayMessage}>
            <div className="pic-and-name">
                <img className="profile-pic" src={profileImageUrl} alt="Profile" />
                <p>{username}</p>
            </div>
            <div className="preview-content">
                <img className="preview-pic" src={image} alt="" />
                <h1 className="preview-title">{title}</h1>
            </div>
        </button>
    );
}

export default MessagePreview;