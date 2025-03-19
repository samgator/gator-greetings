import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function MessageDetails() {
    const { id } = useParams();
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

    if (!message) {
        return <p>Loading...</p>;
    }

    return (
        <div className="message-details">
            <h1>{message.title}</h1>
            <p>By: {message.author?.username || 'Unknown'}</p>
            <img src={message.image || '/src/assets/logo.png'} alt="Message" />
            <p>{message.content}</p>
        </div>
    );
}

export default MessageDetails;