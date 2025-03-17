import './MessageCreate.css'
import { useNavigate } from 'react-router-dom'

function MessageCreate() {
    const navigate = useNavigate();

    function exitMessage(){
        navigate(-1);
    }

    return (
        <div className="container">
            <div className='exit-message-create-btn-container'>
                <button className='exit-btn' onClick={exitMessage}>Back to Home</button>
            </div>
            <div className="card">
                <h1>Create a Message</h1>
                <div className='title-and-input'>
                    <p>Enter a Title</p>
                    <input className='input-field' type="text" placeholder="Title"></input>
                </div>
                <div className='title-and-input'>
                    <p>Enter your Message</p>
                    <textarea className='input-field' type="text" placeholder="Message"></textarea>
                </div>
                <div className='title-and-input'>
                    <p>Add an image</p>
                    <input type="file"></input>
                </div>
            </div>
        </div>
    );
}

export default MessageCreate;