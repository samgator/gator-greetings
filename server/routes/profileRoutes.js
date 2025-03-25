import express from 'express';
import Profile from '../models/Profile.js';

const router = express.Router();

// Create Profile
router.post("/create", async (req, res) => {
    try {
        const { userId, username, bio, profilePicture } = req.body;


        if (!userId) {
            return res.status(400).json({ message: "User ID is required." });
        }

        const existingProfile = await Profile.findOne({ userId });
        if (existingProfile) {
            return res.status(400).json({ message: "Profile already exists." });
        }

        // Create the new profile
        const newProfile = new Profile({
            userId,
            username,
            bio: bio || "", // Default value
            profilePicture: profilePicture || "" // Default value
        });

        await newProfile.save();
        res.status(201).json({ message: "Profile created successfully!", profile: newProfile });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

// Fetch Profile
router.get("/:userId", async (req, res) => {
    try {
        const profile = await Profile.findOne({ userId: req.params.userId });
        if (!profile) {
            return res.status(404).json({ message: "Profile not found." });
        }
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});


// update profiles
router.put("/update/:userId", async (req, res) => {
    try {
        const { username, bio, profilePicture } = req.body;
        const userId = req.params.userId;

        const updatedProfile = await Profile.findOneAndUpdate(
            { userId }, 
            { username, bio, profilePicture },
            { new: true } 
        );

        if (!updatedProfile) {
            return res.status(404).json({ message: "Profile not found." });
        }

        res.status(200).json({ message: "Profile updated successfully!", profile: updatedProfile });

    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
});

export default router;