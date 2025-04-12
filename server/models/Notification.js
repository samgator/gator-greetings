import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    content: { type: String, required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    sender: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: "null" },
    context: { type: mongoose.Schema.Types.ObjectId, required: true }, // The object ID for the message that generated the notification
    createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;