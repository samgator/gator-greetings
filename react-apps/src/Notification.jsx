import { useNavigate } from 'react-router-dom';
import './NotificationPage.css'

function Notification({notification, source, id}) {
    const navigate = useNavigate();

    function navigateSource(){
        //function to navigate to notification's source message
        navigate(`../message/${source}`);
    }

    // delete notificaiton
    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:5050/notification/${id}`, {
                method: 'DELETE',
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete');
            }
    
            console.log(data.message); 
            onDelete(id);
        } catch (error) {
            console.error('Error deleting notification:', error.message);
        }
    };

    return ( 
        <div className='notification-container' onClick={() => {handleDelete(); navigateSource();}}>
            <p className='notification'>{notification}</p>
            <p className='return-message'>(Click to view message)</p>
        </div>
    );
}

export default Notification;