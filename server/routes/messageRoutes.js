import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// Post a message
router.post('/post', async (req, res) => {
    try {
        const { author, title, content } = req.body;
        const newMessage = new Message({ author, title, content });
        await newMessage.save();

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ error: 'Failed to post message', details: error.message });
    }
});

// Fetch messages
router.get('/fetch', async (req, res) => {
    try {
        const messages = await Message.find().sort({ timestamp: -1 }).populate('author', 'username');
        res.json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch messages.' });
    }
});

// Post a comment
router.post('/comment/:messageId', async (req, res) => {
    try {
        const { author, content } = req.body;
        const parentMessage = await Message.findById(req.params.messageId);

        if (!parentMessage) {
            return res.status(404).json({ error: 'Message not found.'});
        }

        const newComment = new Message({ author, content });
        await newComment.save();

        parentMessage.comments.push(newComment._id);
        await parentMessage.save();

        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to post comment' });
    }
});

export default router;