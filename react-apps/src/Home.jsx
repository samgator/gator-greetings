import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MessagePreview from './MessagePreview.jsx';
import './Home.css';

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

    function navigateProfile() {
        navigate('profile');
    }

    function navigateCreateMessage() {
        navigate('message-create');
    }

    function navigateLogin() {
        navigate('/');
    }

    return (
        <div className="home-container">
            <div className="left-sidebar">
                {/* Sidebar content */}
            </div>
            <div className="center-content">
                <button className="message-btn" onClick={navigateCreateMessage}>
                    <p className="message-btn-content">Create a Message</p>
                    <img
                        className="message-btn-content"
                        style={{ width: '1vw', height: '1vw' }}
                        src="/src/assets/edit_icon.png"
                    />
                </button>
                <div className="messages-list">
                    {messages.map((msg) => (
                        <MessagePreview
                            key={msg._id}
                            id={msg._id}
                            title={msg.title}
                            content={msg.content}
                            image={`http://localhost:5050${msg.image}` || '/src/assets/logo.png'}
                            author={msg.author}
                        />
                    ))}
                </div>
            </div>
            <div className="right-sidebar">
                <button className="logout-btn" onClick={navigateLogin}>
                    <img style={{ width: '3.5vw' }} src="/src/assets/logout_icon.png" />
                    <p className="message-btn-content">Logout</p>
                </button>
                <button className="profile-btn" onClick={navigateProfile}>
                    <img style={{ width: '4vw' }} src="/src/assets/profile_icon.png" />
                    <p>Profile</p>
                </button>
            </div>
        </div>
    );
}

export default Home;