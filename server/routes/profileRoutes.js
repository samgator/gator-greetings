import express from 'express';
import Profile from '../models/Profile.js';

// Fetch Profile
router.get("/:userId", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select("-password"); // Exclude password
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});


// update profiles
router.put("/update", authMiddleware, async (req, res) => {
    try {
        const { username, bio, image } = req.body;
        const user = await User.findById(req.user.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.username = username || user.username;
        user.bio = bio || user.bio;
        user.image = image || user.image;
        await user.save();

        res.json({ message: "Profile updated", user });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
