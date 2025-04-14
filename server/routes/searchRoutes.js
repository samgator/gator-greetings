import express from "express";
import { db } from "../db/connection.js";
import { ObjectId } from "mongodb";
import User from "../models/User.js";
import Profile from '../models/Profile.js';


router.get('/fetch-by-username/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const messages = await Message.find({ author: user._id });
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages by username:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});