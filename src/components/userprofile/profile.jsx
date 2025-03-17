import React, { useState, useEffect } from "react";
import "./ProfilePage.css";

const UserProfile = () => { // Accept userId as a prop
    const [userProfile, setUserProfile] = useState({
        imageUrl: "",
        name: "",
        email: "",
        phone: "",
        listedProperties: [], // Default empty array for listed properties
        ownedProperties: [], // Default empty array for owned properties
    });
    const [editMode, setEditMode] = useState(false);
    const [editProfile, setEditProfile] = useState(userProfile);
    const [selectedProperty, setSelectedProperty] = useState(null);

    // Fetch user data by userId from API on component mount
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:9001/api/user/67d30e97d85269be6cff4a22`);
                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }
                const userData = await response.json();
                setUserProfile({
                    imageUrl: userData.data.imageUrl || "", // Set default image if not available
                    name: userData.data.name,
                    email: userData.data.email,
                    phone: userData.data.mobile, // Use the 'mobile' field from response
                    listedProperties: [], // Assuming no listed properties in the response
                    ownedProperties: [], // Assuming no owned properties in the response
                });
                setEditProfile({
                    imageUrl: userData.data.imageUrl || "",
                    name: userData.data.name,
                    email: userData.data.email,
                    phone: userData.data.mobile, // Use the 'mobile' field from response
                    listedProperties: [], // Default empty array
                    ownedProperties: [], // Default empty array
                });
            } catch (err) {
                console.error("Error fetching user data:", err);
            }
        };

        fetchUserData();
    }, []); // Run this effect only once on mount

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
        <div className="user-profile-container expanded-profile-container">
            <h1 className="profile-header">User Profile</h1>
            <div className="profile-content">
                <div className="profile-image-container">
                    <img src={userProfile.imageUrl} alt="User" className="profile-image" />
                    {editMode && (
                        <div className="image-upload-wrapper">
                            <input type="file" id="fileUpload" onChange={handleImageUpload} className="image-upload-input" />
                            <label htmlFor="fileUpload">Upload</label>
                        </div>
                    )}
                </div>
                <div className="profile-details">
                    <input type="text" name="name" value={editProfile.name} onChange={handleChange} required placeholder="Enter your name" />
                    <input type="email" name="email" value={editProfile.email} onChange={handleChange} required placeholder="Enter your email" />
                    <input type="text" name="phone" value={editProfile.phone} onChange={handleChange} required placeholder="Enter your phone number" />
                    
                    <div className="button-container">
                        <button className="save-button" onClick={handleSave}>Save</button>
                        <button className="edit-button" onClick={() => setEditMode(true)}>Edit</button>
                    </div>
                </div>
            </div>
{/* 
            <div className="properties-section expanded-properties">
                <div className="property-list">
                    <h2>Listed Properties</h2>
                    {userProfile.listedProperties.length === 0 ? <p>No properties listed yet.</p> : (
                        <ul>
                            {userProfile.listedProperties.map((property, index) => (
                                <li key={property.id || index} onClick={() => setSelectedProperty(property)} className="property-item">
                                    {property.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div> */}
{/* 
                <div className="property-list">
                    <h2>Owned Properties</h2>
                    {userProfile.ownedProperties.length === 0 ? <p>No owned properties yet.</p> : (
                        <ul>
                            {userProfile.ownedProperties.map((property, index) => (
                                <li key={property.id || index} onClick={() => setSelectedProperty(property)} className="property-item">
                                    {property.title}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div> */}

            {selectedProperty && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>{selectedProperty.title}</h2>
                        <p>{selectedProperty.details}</p>
                        <button className="close-button" onClick={() => setSelectedProperty(null)}>Close</button>
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
                                <input type="text" name="name" value={editProfile.name} onChange={handleChange} required placeholder="Enter your name" />
                            </label>
                            <label>
                                Email:
                                <input type="email" name="email" value={editProfile.email} onChange={handleChange} required placeholder="Enter your email" />
                            </label>
                            <label>
                                Phone:
                                <input type="text" name="phone" value={editProfile.phone} onChange={handleChange} required placeholder="Enter your phone number" />
                            </label>
                            <div className="edit-buttons">
                                <button type="button" className="save-button" onClick={handleSave}>Save</button>
                                <button type="button" className="reset-button" onClick={handleReset}>Reset</button>
                                <button type="button" className="cancel-button" onClick={() => setEditMode(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
