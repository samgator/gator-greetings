import './MessageReply.css'

function MessageReply() {
    return (
        <div className='reply-container'>
            <div className='reply-pic-and-name'>
                <img src='/src/assets/logo.png' className='reply-profile-pic'alt="Reply Author"/>
                <p>{"Reply Author"}</p>
            </div>
            <p className='reply'>This is the content of the reply!</p>
        </div>
    );
}

export default MessageReply;