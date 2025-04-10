import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
    content: { type: String, required: true },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

const messageSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, default: "" },
    replies: {type: [replySchema], default: []},
    likes: { type: Number, default: 0 },
    likedBy: { type: [mongoose.Schema.Types.ObjectId], ref: 'User', default: [] },
    topic: { type: String, default: ""}
}, {
    timestamps: true
});


const Message = mongoose.model("Message", messageSchema);

export default Message;