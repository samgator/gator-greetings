import { useNavigate } from 'react-router-dom';
import './NotificationPage.css'

function Notification({notification, source}) {
    const navigate = useNavigate();

    function navigateSource(){
        //function to navigate to notification's source message
        navigate(`message/${source}`, { relative: 'path' });
    }

    return ( 
        <div className='notification-container' onClick={navigateSource}>
            <p className='notification'>{notification}</p>
            <p className='return-message'>(Click to view message)</p>
        </div>
    );
}

export default Notification;