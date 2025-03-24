import './Profile.css'
import { useNavigate } from 'react-router-dom'

function Profile({username, bio}) {
    const navigate = useNavigate();

    function exitProfile(){
        navigate(-1);
    }

    function editProfile() {
        
    }
    return ( 
        <div className="container">
            <div className='exit-btn-container'>
                <button className='exit-btn' onClick={exitProfile}>X</button>
            </div>
            <div className="card" style={{display: "flex", width: "50vw"}}>
                <div className="column">
                <img src="https://placehold.co/300" className="profilePic"/>    
                </div>
                <div className="column">
                    <button onClick = {editProfile}>Edit Profile</button>
                    <h1 className="title">{username}'s Profile</h1> 
                    <h2 className="bio-title">Bio:</h2>
                    <div className = "bio"></div>
                </div>
            </div>
        </div>
    );
}

export default Profile;