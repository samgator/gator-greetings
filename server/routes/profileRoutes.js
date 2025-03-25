import express from 'express';
import Profile from '../models/Profile.js';
import upload from "../config/storage.js";
import mongoose from 'mongoose';
import { gfs } from "../config/gridfsConfig.js";

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
        const { userId } = req.params;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);
        const profile = await Profile.findOne({ userId: userObjectId });

        if (!profile) {
            return res.status(404).json({ message: "Profile not found" });
        }

        res.json(profile);
    } catch (error) {
        console.error("Error fetching profile:", error.message);
        res.status(500).json({ message: "Server error" });
    }
});


// update profiles
router.put("/update/:userId", async (req, res) => {
    try {
        const { username, bio } = req.body;
        const userId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ message: "Invalid user ID format" });
        }

        const userObjectId = new mongoose.Types.ObjectId(userId);

        let profilePicture = req.file ? `/profile/image/${req.file.filename}` : undefined;

        const updateData = { username, bio };
        if (profilePicture) updateData.profilePicture = profilePicture;

        const updatedProfile = await Profile.findOneAndUpdate(
            { userId: userObjectId }, 
            updateData,
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

// Upload Profile Picture
router.post("/upload", upload.single("profilePic"), (req, res) => {
    res.json({ file: req.file });
  });

// Fetch Profile Picture by Filename
router.get("/image/:filename", async (req, res) => {
    try {
      const file = await gfs.files.findOne({ filename: req.params.filename });
  
      if (!file) {
        return res.status(404).json({ message: "File not found" });
      }
  
      const readStream = gfs.createReadStream(file.filename);
      readStream.pipe(res);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

export default router;