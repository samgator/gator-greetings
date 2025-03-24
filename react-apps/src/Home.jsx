import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import MessagePreview from './MessagePreview.jsx'

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
                <button style={{width: "auto"}}onClick={logout}>Logout</button>
            </div>
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
        
    );
}

export default Home;