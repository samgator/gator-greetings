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

        console.log("Sending update request with:", { username, bio, profilePicture, userId });

        const response = await fetch(`http://localhost:5050/profile/update/${userId}`, { 
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ username, bio, profilePicture }) 
        });

        const data = await response.json();
        console.log("Response from server:", data);

        if (response.ok) {
            setUser(data.profile); // Update user state with the updated profile
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

                <label>Profile Image URL:</label>
                <input 
                    type="text" 
                    value={profilePicture} // Updated field name
                    onChange={(e) => setProfilePicture(e.target.value)} // Updated field name
                    placeholder="Paste image URL"
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
