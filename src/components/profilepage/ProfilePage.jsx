import React, { useState, useEffect } from "react";
import "./ProfilePage.css";

const UserProfile = () => {
    const [userProfile, setUserProfile] = useState({
        imageUrl: "https://www.pngkit.com/png/detail/126-1262807_instagram-default-profile-picture-png.png",
        name: "",
        email: "",
        phone: "",
    });

    const [editMode, setEditMode] = useState(false);
    const [editProfile, setEditProfile] = useState(userProfile);
    const [user, setUser] = useState("");
    const [loading, setLoading] = useState(true); // Loading state to show feedback during data fetch
    const [error, setError] = useState(""); // Error state to handle potential errors

    useEffect(() => {
        try {
            // Retrieve user data from localStorage when the component mounts
            const storedUser = localStorage.getItem("user");
            if (storedUser) {
                setUser(storedUser); // Assuming user data is stored as a JSON string
            }
        } catch (error) {
            console.error("Error parsing user data from localStorage", error);
        }
    }, [user]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                setLoading(true); // Set loading to true before fetching data
                const response = await fetch(`http://localhost:9090/api/user/${user}`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const userData = await response.json();
                const { name, mobile, email } = userData.data;

                setUserProfile({
                    imageUrl: "https://www.pngkit.com/png/detail/126-1262807_instagram-default-profile-picture-png.png",  // No image URL in the response
                    name: name,
                    email: email,
                    phone: mobile,
                    listedProperties: [],  // Default empty array
                    ownedProperties: [],   // Default empty array
                });

                setEditProfile({
                    imageUrl: "https://www.pngkit.com/png/detail/126-1262807_instagram-default-profile-picture-png.png",  // No image URL in the response
                    name: name,
                    email: email,
                    phone: mobile,
                    listedProperties: [],  // Default empty array
                    ownedProperties: [],   // Default empty array
                });

                setError(""); // Reset error if data is fetched successfully
            } catch (err) {
                setError("Error fetching user data. Please try again later."); // Handle error
                console.error("Error fetching user data:", err);
            } finally {
                setLoading(false); // Set loading to false after the fetch attempt
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditProfile({ ...editProfile, [name]: value });
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setEditProfile((prev) => ({ ...prev, imageUrl }));
        }
    };

    const handleSave = () => {
        if (!editProfile.name || !editProfile.email || !editProfile.phone) {
            alert("All fields are required!");
            return;
        }
        setUserProfile({ ...editProfile });
        setEditMode(false);
    };

    const handleReset = () => {
        setEditProfile(userProfile);
    };

    return (
        <div className="user-profile-container">
            <h1 className="profile-header">User Profile</h1>
            {loading ? (
                <div>Loading...</div> // Show loading message when data is being fetched
            ) : error ? (
                <div className="error-message">{error}</div> // Show error if any
            ) : (
                <div className="profile-content">
                    <div className="profile-image-container">
                        <img src={userProfile.imageUrl} alt="User" className="profile-image" />
                        {editMode && (
                            <div className="image-upload-wrapper">
                                <input
                                    type="file"
                                    id="fileUpload"
                                    onChange={handleImageUpload}
                                    className="image-upload-input"
                                />
                                <label htmlFor="fileUpload">Upload</label>
                            </div>
                        )}
                    </div>
                    <div className="profile-details">
                        <input
                            type="text"
                            name="name"
                            value={editProfile.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your name"
                        />
                        <input
                            type="email"
                            name="email"
                            value={editProfile.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email"
                        />
                        <input
                            type="text"
                            name="phone"
                            value={editProfile.phone}
                            onChange={handleChange}
                            required
                            placeholder="Enter your phone number"
                        />

                        <div className="button-container">
                            {/* <button className="save-button" onClick={handleSave}>
                                Save
                            </button> */}
                            <button className="edit-button" onClick={() => setEditMode(true)}>
                                Edit
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {editMode && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Edit Profile</h2>
                        <form>
                            <label>
                                Profile Image:
                                <input type="file" onChange={handleImageUpload} />
                            </label>
                            <label>
                                Name:
                                <input
                                    type="text"
                                    name="name"
                                    value={editProfile.name}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your name"
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={editProfile.email}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your email"
                                />
                            </label>
                            <label>
                                Phone:
                                <input
                                    type="text"
                                    name="phone"
                                    value={editProfile.phone}
                                    onChange={handleChange}
                                    required
                                    placeholder="Enter your phone number"
                                />
                            </label>
                            <div className="edit-buttons">
                                {/* <button type="button" className="save-button" onClick={handleSave}>
                                    Save
                                </button> */}
                                <button type="button" className="reset-button" onClick={handleReset}>
                                    Reset
                                </button>
                                <button type="button" className="cancel-button" onClick={() => setEditMode(false)}>
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
