import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Notification from './Notification.jsx';
import './NotificationPage.css';

const userId = localStorage.getItem('userId');

function NotificationPage() {
    const [notifications, setNotifications] = useState([]);
    const navigate = useNavigate();

    function navigateHome(){
        navigate(-1);
    }

    useEffect(() => {
        async function fetchNotifications() {
            try {
                const response = await fetch(`http://localhost:5050/notification/${userId}`);
                const data = await response.json();
                setNotifications(data.reverse());
        } catch(error) {
            console.error('Error fetching notifications', error);
        }
    }
    fetchNotifications();
    }, []);
    

    return ( 
        <div className='notifications-container'>
            <button className='exit-notifications-btn' onClick={navigateHome}>Back to Home</button>
            {notifications.length === 0 ? (<p>You have no new notifications.</p>) : (
                notifications.map((noti) => (
                    <Notification key={noti._id} notification={noti.content} source={noti.context.toString()} id={noti._id}/>
                ))
            )}
        </div>
    );
};

export default NotificationPage;