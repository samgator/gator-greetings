import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    title: {type: String, required: true },
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message'}],
    image: String,
}, {
    timestamps: true
});

const Message = mongoose.model("Message", messageSchema);

export default Message;