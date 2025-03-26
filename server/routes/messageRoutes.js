import express from 'express';
import Message from '../models/Message.js';
import upload from "../config/storage.js";
import { gfs, gridfsBucket } from "../config/gridfsConfig.js";

const router = express.Router();

// Post a message
router.post('/post', upload.single("image"), async (req, res) => {
    try {
        const { author, title, content } = req.body;

        let image = req.file ? `/messages/image/${req.file.filename}` : undefined;

        const newMessage = new Message({ author, title, content, image: image || " " });
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

export default router;