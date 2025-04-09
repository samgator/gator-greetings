import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
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

    {/*Dropdown menu useState*/}
    const [isOpen, setIsOpen] = useState(false);
    
    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    return (
        <div className="home-container">
            <div className="left-sidebar">
                <button className="message-btn" onClick={navigateCreateMessage}>
                    <img
                        className="message-btn-content"
                        style={{ width: '2vw', height: '2vw' }}
                        src="/src/assets/edit_icon.png"
                    />
                    <p className="message-btn-content">Message</p>
                </button>
                <Dropdown onToggle={handleToggle}>
                    <Dropdown.Toggle className="topics-dropdown">
                        Explore Topics
                    </Dropdown.Toggle>

                    {isOpen && (
                        <Dropdown.Menu className="topics-dropdown-content">
                            <Dropdown.Item className="topic-item" href='#/'>Academics</Dropdown.Item>
                            <Dropdown.Item className="topic-item" href='#/'>Clubs</Dropdown.Item>
                            <Dropdown.Item className="topic-item" href='#/'>Extracurriculars</Dropdown.Item>
                            <Dropdown.Item className="topic-item" href='#/'>Housing</Dropdown.Item>
                            <Dropdown.Item className="topic-item" href='#/'>Meal Plan</Dropdown.Item>
                            <Dropdown.Item className="topic-item" href='#/'>Social Events</Dropdown.Item>
                            <Dropdown.Item className="topic-item" href='#/'>Sports</Dropdown.Item>
                            <Dropdown.Item className="topic-item" href='#/'>Other</Dropdown.Item>
                        </Dropdown.Menu>
                    )}
                </Dropdown>
            </div>
            <div className="center-content">
                <div className="messages-list">
                    {messages.map((msg) => (
                        <MessagePreview
                            key={msg._id}
                            id={msg._id}
                            title={msg.title}
                            content={msg.content}
                            image={`http://localhost:5050${msg.image}` || '/src/assets/logo.png'}
                            author={msg.author} 
                            timestamp={msg.createdAt} 
                            likes={msg.likes} //Replace with likes from DB
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