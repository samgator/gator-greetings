import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    author: { type:mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
    content: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Message'}]
});

const Message = mongoose.model("Message", messageSchema);

export default Message;