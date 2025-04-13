import { useNavigate } from 'react-router-dom';
import Notification from './Notification.jsx';
import './NotificationPage.css';

function NotificationPage() {
    const navigate = useNavigate();

    function navigateHome(){
        navigate(-1);
    }

    return ( 
        <div className='notifications-container'>
            <button onClick={navigateHome}>Back to Home</button>
            <Notification notification={"Someone has replied to your message!"}/>
            <Notification notification={"Someone has liked your message!"}/>
        </div>
    );
}

export default NotificationPage;