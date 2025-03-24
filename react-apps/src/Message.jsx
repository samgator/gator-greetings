import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './Message.css'

function Message() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [message, setMessage] = useState(null);

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

    const exitMessage = () => {
        navigate('/home');
    };

    if (!message) {
        return <p>Loading...</p>;
    }

    return ( 
        <div className='container'>
            <div className='exit-message-btn-container'>
                <button className='exit-btn' onClick={exitMessage}>Back to Home</button>
            </div>
            <div className='message-container'>
                <div className='pic-and-name'>
                    <img className='profile-pic' src={message.image || '/src/assets/logo.png'} alt="Message" />
                    <p>{message.author?.username || 'Unknown'}</p>
                </div>
                <div className='message-content'>
                    <div className='preview-content'>
                        <h1 className='preview-title'>{message.title}</h1>
                        <img className='preview-pic' src={message.image || '/src/assets/logo.png'} alt="Message"/>
                    </div>
                    <p className='message'>{message.content}</p>
                </div>
            </div>
        </div>
        
    );
}

export default Message;