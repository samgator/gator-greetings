import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Message.css'

function MessagePreview({username, title, content, image, id, author}) {
    const [profile, setProfile] = useState(null);
    const navigate = useNavigate();

    function displayMessage(){
        navigate(`message/${id}`);
    }

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
            } else {
                console.error("Failed to fetch profile:", data.message);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }

    console.log(author);
    fetchProfile(author._id);

    const profileImageUrl = profile?.profilePicture 
    ? `http://localhost:5050${profile.profilePicture}` 
    : "https://placehold.co/300";

    return (
        <button className='preview' onClick={displayMessage}>
            <div className='pic-and-name'>
                <img className='profile-pic' src={profileImageUrl}/>
                <p>{username}</p>
            </div>
            <div className='preview-content'>
                <h1 className='preview-title'>{title}</h1>
                <img className='preview-pic' src={image}/>
            </div>
        </button>
    );
}

export default MessagePreview;