import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    googleId: { type: String, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    profilePicture: { type: String }
});

export default userSchema;