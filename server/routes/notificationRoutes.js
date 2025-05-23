import express from "express";
import Notification from "../models/Notification.js";
import mongoose from "mongoose";

const router = express.Router();

// create a new notification
router.post('/', async (req, res) => {
    try {
        const { content, recipient, sender, context } = req.body;

        const notification = new Notification({
            content,
            recipient,
            sender: sender || null,
            context
        });

        await notification.save();
        res.status(201).json(notification);
    } catch (err) {
        res.status(500).json({ message: 'Error creating notification', error: err.message })
    }
});

// get all notifications for a recipient
router.get('/:recipientId', async (req, res) => {
    try {
        const notifications = await Notification.find({ recipient: req.params.recipientId });
        res.status(200).json(notifications);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching notifications', error: err.message })
    }
});

// delete a notification by ID
router.delete('/:id', async (req, res) => {
    try {
        const deleted = await Notification.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ message: 'Notification not found' });
        }

        res.status(200).json({ message: 'Notification deleted successfully '});
    } catch (err) {
        res.status(500).json({ message: 'Error deleting notification', error: err.message });
    }
});

// Check if user has a notification
router.get('/has/:recipientId', async(req, res) => {
    const recipientId = req.params.recipientId;

    if(!mongoose.Types.ObjectId.isValid(recipientId)) {
        return res.status(400).json({ error: 'Invalid Recipient ID'});
    }

    try {
        const hasNotifications = await Notification.exists({ recipient: recipientId });

        if(hasNotifications) {
            res.json({ hasNotifications: true });
        } else {
            res.json({ hasNotifications: false });
        }
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;