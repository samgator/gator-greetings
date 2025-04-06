import './MessageReply.css'

function MessageReply({ reply, profile }) {

    const profileImageUrl = profile?.profilePicture 
        ? `http://localhost:5050${profile.profilePicture}` 
        : "https://placehold.co/300";

    return (
        <div className='reply-container'>
            <div className='reply-pic-and-name'>
                <img src={profileImageUrl} className='reply-profile-pic' alt="Reply Author"/>
                <p>{profile?.username || 'Anonymous'}</p>
            </div>
            <p className='reply'> {reply.content}</p>
        </div>
    );
}

export default MessageReply;