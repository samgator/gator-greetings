import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import MessagePreview from './MessagePreview.jsx';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const [messages, setMessages] = useState([]);
    const [selectedTopic, setSelectedTopic] = useState('All Topics');
    const [sortBy, setSortBy] = useState('Recent');
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [searchTimeout, setSearchTimeout] = useState(null);

    // Fetch messages from the backend
    useEffect(() => {
        async function fetchMessages() {
            try {
                const response = await fetch('http://localhost:5050/messages/fetch');
                const data = await response.json();
                setMessages(data.reverse());
            } catch (error) {
                console.error('Error fetching messages:', error);
            }
        }
        fetchMessages();
    }, []);

    function navigateProfile() {
        navigate('profile');
    }

    function navigateNotifications() {
        navigate('notifications');
    }

    function navigateCreateMessage() {
        navigate('message-create');
    }

    async function handleLogout() {
        try {
            await fetch('http://localhost:5050/logout', { method: 'POST', credentials: 'include' });
        } catch (error) {
            console.error('Error logging out:', error);
        }
        // Clear cache
        localStorage.clear();
        sessionStorage.clear();
        navigate("/", { replace: true });
    }

    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Clear existing timeout
        if (searchTimeout) {
            clearTimeout(searchTimeout);
        }

        // Set new timeout
        setSearchTimeout(
            setTimeout(async () => {
                try {
                    let response;
                    if (query.trim() === '') {
                        const response = await fetch('http://localhost:5050/messages/fetch');
                        const data = await response.json();
                        setMessages(data.reverse());
                        return;
                    } else {
                        response = await fetch(`http://localhost:5050/messages/search/${query}`);
                    }

                    if (response.ok) {
                        const data = await response.json();
                        setMessages(data);
                    } else {
                        if (response.status === 404) {
                            setMessages([]);
                        }
                    }
                } catch (error) {
                    console.error('Error fetching messages:', error);
                }
            }, 100) // 100ms delay
        );
    };

    {/*Dropdown menu useState*/}
    const [isOpen, setIsOpen] = useState(false);
    
    const handleToggle = () => {
        setIsOpen(!isOpen);
    }

    const handleSelectTopic = (topic) => {
        setSelectedTopic(topic);
        setIsOpen(false);
    }

    const handleSortBy = () => {
        if(sortBy == 'Recent'){
            setSortBy('Likes');
        }
        else{
            setSortBy('Recent');
        }
    }

    const topics = [ 'Choose A Topic','All Topics','Academics','Clubs','Extracurriculars','Housing','Meal Plan','Social Events','Sports','Other' ];

    const filteredMessages = selectedTopic === 'All Topics' 
        ? messages 
        : messages.filter((msg) => msg.topic === selectedTopic);

    const sortedMessages = sortBy === 'Likes'
        ? [...filteredMessages].sort((a, b) => b.likes - a.likes)
        : filteredMessages;

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

                <button className="sort-by-btn" onClick={handleSortBy}>
                    <p>Sorted by</p>
                    <p>{sortBy}</p>
                </button>

                <Dropdown onToggle={handleToggle}>
                    <Dropdown.Toggle className="topics-dropdown">
                        {selectedTopic}
                    </Dropdown.Toggle>
                    {isOpen && (
                        <Dropdown.Menu className="topics-dropdown-content" show={isOpen}>
                        {topics.map((topic) => (
                            <Dropdown.Item key={topic} className="topic-item" onClick={() => handleSelectTopic(topic)}> {topic} </Dropdown.Item>
                        ))}
                    </Dropdown.Menu>
                    )}
                    
                </Dropdown>

            </div>
            <div className="center-content">
                <div className="search-navbar">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search messages..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="messages-list">
                    {sortedMessages.map((msg) => (
                        <MessagePreview
                            key={msg._id}
                            id={msg._id}
                            title={msg.title}
                            content={msg.content}
                            image={`http://localhost:5050${msg.image}` || '/src/assets/logo.png'}
                            author={msg.author} 
                            timestamp={msg.createdAt} 
                            likes={msg.likes}
                        />
                    ))}
                </div>
                
            </div>
            <div className="right-sidebar">
                <button className="logout-btn" onClick={handleLogout}>
                    <img style={{ width: '3.5vw' }} src="/src/assets/logout_icon.png" />
                    <p className="message-btn-content">Logout</p>
                </button>
                <button className="profile-btn" onClick={navigateProfile}>
                    <img style={{ width: '4vw' }} src="/src/assets/profile_icon.png" />
                    <p>Profile</p>
                </button>
                <button className="notifications-btn" onClick={navigateNotifications}>
                    <img style={{ width: '3vw' }} src="/src/assets/notif_icon.png" />
                    <p className='notifs-text'>Notifications</p>
                </button>
            </div>
        </div>
    );
}

export default Home;