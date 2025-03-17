import { useNavigate } from 'react-router-dom'
import MessagePreview from './MessagePreview.jsx'

function Home() {
    const navigate = useNavigate();

    function navigateProfile(){
        navigate('profile');
    }

    function navigateCreateMessage(){
        navigate('message-create')
    }

    return(
        <div className='container'>
            <div>
                <button style={{width:"10vw"}}onClick={navigateProfile}>Go to profile</button>
                <button style={{width:"auto"}}onClick={navigateCreateMessage}>Create a Message</button>
            </div>
            
            <MessagePreview username='Test User' title='Test Title' image='/src/assets/logo.png'/>
        </div>
        
    );
}

export default Home;