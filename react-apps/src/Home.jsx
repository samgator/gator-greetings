import { useNavigate } from 'react-router-dom'
import Message from './Message.jsx'

function Home() {
    const navigate = useNavigate();

    function navigateProfile(){
        navigate('profile');
    }
    return(
        <div className='container'>
            <button style={{width:"10vw"}}onClick={navigateProfile}>Go to profile</button>
            <Message username='test-user' title='Test Message Test Message Test Message Test Message Test Message Test Message Test Message' image='/src/assets/logo.png'/>
        </div>
        
    );
}

export default Home;