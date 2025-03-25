import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css'

function ProfileEdit({ user, setUser }) {
    const [username, setUsername] = useState(user?.username || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [profilePicture, setProfilePicture] = useState(user?.profilePicture || "");
    const navigate = useNavigate();
    // Modified to access _id instead of userId
    const userId = localStorage.getItem("userId");

    async function handleSave() {
        if (!userId) {
            alert("User ID is missing. Please log in again.");
            return;
        }

        const token = localStorage.getItem("token");

        const formData = new FormData();
        formData.append("username", username);
        formData.append("bio", bio);

        if (profilePicture) {
            formData.append("profilePicture", profilePicture);
        }

        const response = await fetch(`http://localhost:5050/profile/update/${userId}`, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`
            },
            body: formData,
        });

        const data = await response.json();
       

        if (response.ok) {
            alert("Profile updated successfully!");
            navigate("/home/profile"); // Redirect back to profile
        } else {
            alert(`Error updating profile: ${data.message || "Unknown error"}`);
        }
    }

    return (
        <div className="profile-edit-container">
            <h1>Edit Profile</h1>
            <div className="edit-form">
                <label>Username:</label>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Enter new username"
                />

                <label>Bio:</label>
                <textarea 
                    value={bio} 
                    onChange={(e) => setBio(e.target.value)} 
                    placeholder="Write something about yourself"
                ></textarea>

                <label>Profile Image Upload:</label>
                <input 
                type="file" 
                accept="image/*" 
                onChange={(e) => setProfilePicture(e.target.files[0])} 
                />

                <div className="button-group">
                    <button onClick={handleSave} className="save-btn">Save</button>
                    <button onClick={() => navigate("/home/profile")} className="cancel-btn">Go Back</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileEdit;
