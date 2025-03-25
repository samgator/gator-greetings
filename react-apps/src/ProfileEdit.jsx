import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Profile.css'

function ProfileEdit({ user, setUser }) {
    const [username, setUsername] = useState(user?.username || "");
    const [bio, setBio] = useState(user?.bio || "");
    const [image, setImage] = useState(user?.image || "");
    const navigate = useNavigate();

    async function handleSave() {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/api/user/update", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            },
            body: JSON.stringify({ username, bio, image })
        });

        const data = await response.json();
        if (response.ok) {
            setUser(data.user); // Update state
            localStorage.setItem("user", JSON.stringify(data.user)); // Store in local storage
            navigate("/home/profile"); // Redirect back to profile
        } else {
            alert("Error updating profile");
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
                    value={image} 
                    onChange={(e) => setImage(e.target.value)} 
                    placeholder="Paste image URL"
                />

                <div className="button-group">
                    <button onClick={handleSave} className="save-btn">Save</button>
                    <button onClick={() => navigate("/home/profile")} className="cancel-btn">Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default ProfileEdit;
