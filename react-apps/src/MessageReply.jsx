import './MessageReply.css'

function MessageReply({ reply, profile }) {

    const profileImageUrl = profile?.profilePicture 
        ? `http://localhost:5050${profile.profilePicture}` 
        : "https://placehold.co/300";

    // Timestamps
    function formatDate(timestamp) {
        const date = new Date(timestamp);
        return date.toLocaleString();
    }

    return (
        <div className='reply-container'>
            <div className='reply-pic-and-name'>
                <img src={profileImageUrl} className='reply-profile-pic' alt="Reply Author"/>
                <p>{profile?.username || 'Anonymous'}</p>
            </div>
            <p className='timestamp'>{formatDate(reply.createdAt)}</p>
            <p className='reply'> {reply.content}</p>
        </div>
    );
}

export default MessageReply;