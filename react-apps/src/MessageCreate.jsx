import './MessageCreate.css'
import { useNavigate } from 'react-router-dom'
import React, { useState } from 'react';

function MessageCreate() {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState('');
    const [topic, setTopic] = useState('Academics');

    function exitMessage(){
        navigate(-1);
    }

    async function handleSubmit() {
        if (!title || !content) return alert('Title and message are required.');

        const userId = localStorage.getItem('userId');
        if (!userId) return alert('User is not logged in.');

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("author", userId);
        formData.append("title", title);
        formData.append("content", content);
        formData.append("topic", topic);

        if (image) {
            formData.append("image", image);
        }

        try {
            const response = await fetch('http://localhost:5050/messages/post', {
                method: 'POST',
                headers: {
                    "Authorization": `Bearer ${token}`
                },
                body: formData,
            });

            if (response.ok) {
                navigate('/home'); // navigate back after posting
            } else {
                const errorData = await response.json(); 
                console.error('Failed to post message.', errorData);
                alert(`Failed to post message: ${errorData.details || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error posting message:', error);
            alert(`Error posting message: ${error.message}`);
        }
    }

    const topics = [
        'Academics',
        'Clubs',
        'Extracurriculars',
        'Housing',
        'Meal Plan',
        'Social Events',
        'Sports',
        'Other'
    ];

    return (
        <div className="container">
            <div className='exit-message-create-btn-container'>
                <button className='exit-btn' onClick={exitMessage}>Back to Home</button>
            </div>
            <div className="card">
                <h1>Create a Message</h1>
                <div className='title-and-input'>
                    <p>Enter a Title</p>
                    <input className='input-field' type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                </div>
                <div className='title-and-input'>
                    <p>Enter your Message</p>
                    <textarea className='input-field' placeholder="Message" value={content} onChange={(e) => setContent(e.target.value)} />
                </div>
                <div className='title-and-input'>
                    <p>Select a Topic</p>
                    <select
                        className='input-field'
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                    >
                        {topics.map(t => (
                            <option key={t} value={t}>{t}</option>
                        ))}
                    </select>
                </div>
                <div className='title-and-input'>
                    <p>Add an image</p>
                    <input 
                    type="file" 
                    accept="image/*" 
                    onChange={(e) => setImage(e.target.files[0])} 
                />
                </div>
                <button className="submit-btn" onClick={handleSubmit}>Post</button>
            </div>
        </div>
    );
}

export default MessageCreate;