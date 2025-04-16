import express from 'express';
import Message from '../models/Message.js';
import Notification from '../models/Notification.js';
import Profile from '../models/Profile.js';
import User from '../models/User.js';
import upload from "../config/storage.js";
import { gfs, gridfsBucket } from "../config/gridfsConfig.js";

const router = express.Router();

// Post a message
router.post('/post', upload.single("image"), async (req, res) => {
    try {
        const { author, title, content, topic } = req.body;

        let image = req.file ? `/messages/image/${req.file.filename}` : undefined;

        const newMessage = new Message({ author, title, content, image: image || " ", topic });
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

// fetch by ID
router.get('/:id', async (req, res) => {
    try {
        const message = await Message.findById(req.params.id).populate('author', 'username');
        if (!message) {
            return res.status(404).json({ error: 'Message not found' });
        }
        res.json(message);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch message.' });
    }
});

// Upload Message Picture
router.post("/upload", upload.single("image"), (req, res) => {
    res.json({ file: req.file });
  });

// Fetch Message Picture by Filename
router.get("/image/:filename", async (req, res) => {
    try {
        
        const file = await gfs.files.findOne({ filename: req.params.filename });

        if (!file) {
            return res.status(404).json({ message: "File not found" });
        }

        const readStream = gridfsBucket.openDownloadStream(file._id);
        res.set('Content-Type', file.contentType);
        readStream.pipe(res);

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Post reply
router.post('/:id/replies', async (req, res) => {
    const { id } = req.params;
    const { replyContent, authorId } = req.body;

    try {
        const message = await Message.findById(id);
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        const reply = {
            content: replyContent,
            author: authorId,
            createdAt: new Date(),
        };

        message.replies.push(reply);
        await message.save();

        // Create a notification (unless user replies to themselves)
        if (authorId !== message.author.toString()) {
            
            const senderProfile = await Profile.findOne({ userId: authorId });
            const senderName = senderProfile?.username || 'Someone';

            await Notification.create({
                content: `${senderName} replied to your message.`,
                recipient: message.author,
                sender: authorId,
                context: message._id,
            });

        }

        res.status(201).json(reply);
    } catch (error) {
        res.status(500).json({ message: 'Error adding reply', error });
    }
});

router.get('/:id/replies', async (req, res) => {
    const { id } = req.params;

    try {
        const message = await Message.findById(id).populate('replies.author', 'username');
        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        res.status(200).json(message.replies);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching replies', error });
    }
});


export default router;

// Like a message
router.post('/:id/likes', async (req, res) => {
    try {
        const { userId } = req.body;
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({ message: 'Message not found' });
        }

        const hasLiked = message.likedBy.includes(userId);

        if (hasLiked) {
            // Unlike
            message.likes -= 1;
            message.likedBy = message.likedBy.filter(id => id.toString() !== userId);
        } else {
            // Like
            message.likes += 1;
            message.likedBy.push(userId);

            // Create a notification (unless user likes their own post)
            if (userId !== message.author.toString()) {
                
                const senderProfile = await Profile.findOne({ userId });
                const senderName = senderProfile?.username || 'Someone';

                await Notification.create({
                    content: `${senderName} liked your message.`,
                    recipient: message.author,
                    sender: userId,
                    context: message._id,
                });
                
            }
        }

        await message.save();
        res.json(message);
    } catch (error) {
        console.error('Error updating like:', error);
        res.status(500).json({ message: 'Server error' });
    }
});


router.get('/search/:query', async (req, res) => {
    try {
        const { query } = req.params;

        if (!query || query.trim() === "") {
            const messages = await Message.find()
                .populate('author', 'username')
                .sort({ createdAt: -1 });
            return res.json(messages);
        }

        // Search by username through Profile
        const profile = await Profile.findOne({ 
            username: { $regex: new RegExp(query, 'i') }
        });

        // Create OR conditions for search
        const searchConditions = [
            { title: { $regex: new RegExp(query, 'i') } },
            { topic: { $regex: new RegExp(query, 'i') } }
        ];

        // Add author condition if profile found
        if (profile) {
            searchConditions.push({ author: profile.userId });
        }

        const messages = await Message.find({ $or: searchConditions })
            .populate('author', 'username')
            .sort({ createdAt: -1 });

        res.json(messages);
    } catch (error) {
        console.error('Error searching messages:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

