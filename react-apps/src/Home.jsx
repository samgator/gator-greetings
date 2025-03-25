import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import MessagePreview from './MessagePreview.jsx'
import './Home.css'

function Home() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);

    // Fetch messages from the backend
    useEffect(() => {
        async function fetchMessages() {
            try {
                const response = await fetch('http://localhost:5050/messages/fetch');
                const data = await response.json();
                setMessages(data);
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }
        fetchMessages();
    }, []);

    function navigateProfile(){
        navigate('profile');
    }

    function navigateCreateMessage(){
        navigate('message-create')
    }

    function logout() {
        navigate('/')
    }
    return(
        <div className='container'>
            <div>
                <button style={{width:"10vw"}}onClick={navigateProfile}>Go to profile</button>
                <button style={{width:"auto"}}onClick={navigateCreateMessage}>Create a Message</button>
            </div>
            <div className='center-content'>
                <button className='message-btn' onClick={navigateCreateMessage}>
                    <p className='message-btn-content'>Create a Message</p>
                    <img className='message-btn-content' style={{width:'1vw', height:'1vw'}} src='/src/assets/edit_icon.png'/>
                </button>
                <div className="messages-list">
                    {messages.map((msg) => (
                        <MessagePreview 
                            key={msg._id} 
                            id={msg._id} 
                            username={msg.author?.username || 'Unknown'} 
                            title={msg.title} 
                            content={msg.content}
                            image={msg.image || '/src/assets/logo.png'} 
                        />
                    ))}
                </div>
            </div>
            <div className='right-sidebar'>
                <button className='profile-btn' onClick={navigateProfile}>
                    <img style={{width:'4vw'}} src='/src/assets/profile_icon.png'/>
                    <p>Profile</p>
                </button>
            </div>
            
        </div>
        
    );
}

export default Home;