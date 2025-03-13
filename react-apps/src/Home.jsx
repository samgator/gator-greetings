import { useNavigate } from 'react-router-dom'

function Home() {
    const navigate = useNavigate();

    function navigateProfile(){
        navigate('profile');
    }
    return(
        <div className='container'>
            <h1>This is the temp home page</h1>
            <button style={{width:"10vw"}}onClick={navigateProfile}>Go to profile</button>
        </div>
        
    );
}

export default Home;