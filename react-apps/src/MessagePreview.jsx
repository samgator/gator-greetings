import { useNavigate } from 'react-router-dom'
import './Message.css'

function MessagePreview({username, title, content, image}) {
    const navigate = useNavigate();

    function displayMessage(){
        navigate('message');
    }

    return (
        <button className='preview' onClick={displayMessage}>
            <div className='pic-and-name'>
                <img className='profile-pic' src='/src/assets/logo.png'/>
                <p>{username}</p>
            </div>
            <div className='preview-content'>
                <h1 className='preview-title'>{title}</h1>
                <img className='preview-pic' src={image}/>
            </div>
        </button>
    );
}

export default MessagePreview;