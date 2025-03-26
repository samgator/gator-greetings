import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Message.css'

function Message() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        async function fetchMessage() {
            try {
                const response = await fetch(`http://localhost:5050/messages/${id}`);
                const data = await response.json();
                setMessage(data);
            } catch (error) {
                console.error('Error fetching message:', error);
            }
        }

        fetchMessage();
    }, [id]);

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
                } else {
                    console.error("Failed to fetch profile:", data.message);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        }

        if (message && message.author) {
            fetchProfile(message.author._id);
        }
    }, [message]);

    const profileImageUrl = profile?.profilePicture 
    ? `http://localhost:5050${profile.profilePicture}` 
    : "https://placehold.co/300";

    let messageImageUrl = message?.image 
    ? `http://localhost:5050${message.image}` 
    : "/src/assets/logo.png";

    const exitMessage = () => {
        navigate('/home');
    };

    if (!message) {
        return <p>Loading...</p>;
    }

    const displayProfile = () => {
        navigate(`/home/profileview/${message.author?._id}`);
    };

    return ( 
        <div className='container'>
            <div className='exit-message-btn-container'>
                <button className='exit-message-btn' onClick={exitMessage}>Back to Home</button>
            </div>
            <div className='message-container'>
                <div className='pic-and-name'>
                    <img className='profile-pic' src={profileImageUrl} alt="Message" onClick={displayProfile}/>
                    <p>{message.author?.username || 'Unknown'}</p>
                </div>
                <div className='message-content'>
                    <div className='preview-content'>
                        <h1 className='preview-title'>{message.title}</h1>
                        <img className='preview-pic' src={messageImageUrl || '/src/assets/logo.png'} alt="Message"/>
                    </div>
                    <p className='message'>{message.content}</p>
                </div>
            </div>
        </div>
        
    );
}

export default Message;