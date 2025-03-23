import mongoose from 'mongoose';

const profileSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    bio: { type: String, required: true},
    image: { type: String }, // Store image URL or file path
}, {
    timestamps: true
});

const Profile = mongoose.model("Profile", profileSchema);

export default Profile;