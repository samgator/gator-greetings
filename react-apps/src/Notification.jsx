import './NotificationPage.css'

function Notification({notification}) {
    return ( 
        <div className='notification-container'>
            <p className='notification'>{notification}</p>
            <p className='return-message'>(Click to view message)</p>
        </div>
    );
}

export default Notification;