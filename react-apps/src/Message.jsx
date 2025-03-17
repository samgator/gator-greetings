import { useNavigate } from 'react-router-dom'
import './Message.css'

function Message({username, title, content, image}) {
    const navigate = useNavigate();

    function exitMessage(){
        navigate(-1);
    }

    return ( 
        <div className='container'>
            <div className='exit-btn-container'>
                <button className='exit-btn' onClick={exitMessage}>Back to Home</button>
            </div>
            <div className='message-container'>
                <div className='pic-and-name'>
                    <img className='profile-pic' src={image}/>
                    <p>{username}</p>
                </div>
                <div className='message-content'>
                    <div className='preview-content'>
                        <h1 className='preview-title'>{title}</h1>
                        <img className='preview-pic' src={image}/>
                    </div>
                    <p className='message'>{content}</p>
                </div>
            </div>
        </div>
        
    );
}

export default Message;