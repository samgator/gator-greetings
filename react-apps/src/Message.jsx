import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Message.css'
import MessageReply from './MessageReply.jsx'

function Message() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);
    const [profile, setProfile] = useState(null);
    const [author, setAuthor] = useState(null);
    const [replies, setReplies] = useState([]);
    const [newReply, setNewReply] = useState('');
    const [replyProfiles, setReplyProfiles] = useState({});


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
                    setAuthor(data.username);
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

    const fetchReplies = async () => {
        try {
            const response = await fetch(`http://localhost:5050/messages/${id}/replies`);
            if (response.ok) {
                const data = await response.json();
                setReplies(data);

                const uniqueAuthorIds = [...new Set(data.map(r => r.author))];
                const profiles = {};

                const profilePromises = uniqueAuthorIds.map(async (authorId) => {
                    const idToFetch = typeof authorId === 'object' && authorId !== null && authorId._id ? authorId._id : authorId;
                    if (!idToFetch) return null; 

                    const res = await fetch(`http://localhost:5050/profile/${idToFetch}`);
                    const profileData = await res.json();
                    profiles[idToFetch] = profileData;
                    return profileData; 
                });

                await Promise.all(profilePromises);
                setReplyProfiles(profiles);

            } else {
                console.error('Failed to fetch replies');
            }
        } catch (error) {
            console.error('Error fetching replies:', error);
        }
    };
    
    useEffect(() => {
        if (id) {
            fetchReplies();
        }
    }, [id]);

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

    const handleReplySubmit = async () => {
        if (!newReply) return;
        
        try {
            const response = await fetch(`http://localhost:5050/messages/${id}/replies`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            
                body: JSON.stringify({
                    replyContent: newReply,
                    authorId: localStorage.getItem('userId'), 
                }),
            });
    
            if (response.ok) {
                const reply = await response.json();
                setReplies([...replies, reply]);
                setNewReply('');
                fetchReplies();
            } else {
                console.error('Failed to submit reply');
            }
        } catch (error) {
            console.error('Error submitting reply:', error);
        }
    };

    // Timestamps
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }
    
    
    return ( 
        <div className='container'>

            <div className='exit-message-btn-container'>
                <button className='exit-message-btn' onClick={exitMessage}>Back to Home</button>
            </div>

            <div className='message-container'>
                <div className='pic-and-name'>
                    <img className='profile-pic' src={profileImageUrl} alt="Message" onClick={displayProfile}/>
                    <p>{author || 'Unknown'}</p>
                </div>
                <div className='message-content'>
                    <div className='preview-content'>
                        <h1 className='preview-title'>{message.title}</h1>
                        <img className='preview-pic' src={messageImageUrl || '/src/assets/logo.png'} alt=""/>
                        <p className='timestamp'>{formatDate(message.createdAt)}</p>
                    </div>
                    <p className='message'>{message.content}</p>
                </div>
                <div className='message-replies-container'>
                    <div className='message-reply-bar'>
                    <input className='reply-input' type="text" placeholder="Reply..." value={newReply} onChange={(e) => setNewReply(e.target.value)} />
                        <button className='reply-btn'>
                            <img style={{width:'80%', height:'80%', marginTop:'4px', marginLeft:'4px'}} src="/src/assets/send_icon.png" onClick={handleReplySubmit}/>
                        </button>
                    </div>
                    {replies.map((reply) => (
                    <MessageReply key={reply._id} reply={reply} profile={replyProfiles[reply.author._id]} />))}
                </div>
            </div>

        </div>
        
    );
}

export default Message;