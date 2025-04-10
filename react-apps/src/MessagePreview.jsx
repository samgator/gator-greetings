import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Message.css'

function MessagePreview({title, content, image, id, author, timestamp, likes}) {
    const [profile, setProfile] = useState(null);
    const [username, setUsername] = useState(null);
    const [likesCount, setLikes] = useState(likes);
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
                setUsername(data.username);
            } else {
                console.error("Failed to fetch profile:", data.message);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    }

    fetchProfile(author._id);

    const profileImageUrl = profile?.profilePicture 
    ? `http://localhost:5050${profile.profilePicture}` 
    : "https://placehold.co/300";

    // Timestamps
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    // Likes
    const likeHandler = (e) => {
        // Add a function here to increment/decrement likes
        e.stopPropagation();

        const userId = localStorage.getItem('userId'); // Assuming userId is stored in localStorage

        if (!userId) {
            console.error('User not logged in');
            return;
        }

        fetch(`http://localhost:5050/messages/${message._id}/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        })
            .then((response) => response.json())
            .then((updatedMessage) => {
                setLikes(updatedMessage.likes);
                setLikedBy(updatedMessage.likedBy.includes(userId));
            })
            .catch((error) => {
                console.error('Error updating like:', error);
            });
    };

    return (
        <button className='preview' onClick={displayMessage}>
            <div className='pic-and-name'>
                <img className='profile-pic' src={profileImageUrl}/>
                <p>{username}</p>
            </div>
            <div className='preview-content'>
                <h1 className='preview-title'>{title}</h1>
                <img className='preview-pic' src={image} alt="" />
                <p className='timestamp'>{formatDate(timestamp)}</p>
                <button className='like-btn' onClick={likeHandler}>{likesCount} ♥</button>
            </div>
        </button>
    );
}

export default MessagePreview;