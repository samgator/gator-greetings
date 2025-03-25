import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    username: { type: String, required: true },
    bio: { type: String, default: "" },
    profilePicture: { type: String, default: "" }, // Store image URL or file path
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;