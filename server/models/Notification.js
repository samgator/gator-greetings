import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema({
    content: { type: String, required: true },
    recipient: { type: mongoose.Schema.Types.ObjectId, required: true },
    sender: {type: mongoose.Schema.Types.ObjectId, default: "Deleted User" },
    createdAt: { type: Date, default: Date.now }
});

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;