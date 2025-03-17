import './Message.css'
function Message({username, title, content, image}) {
    return (
        <button className='preview'>
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

export default Message;