import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PropertyDetailPage.css";
import {
    FaMapMarkerAlt, FaRupeeSign, FaBed, FaBath, FaRulerCombined,
    FaPaw, FaSchool, FaBus, FaUser, FaCouch
} from "react-icons/fa";

const PropertyDetailPage = () => {
    const [property, setProperty] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const response = await fetch(`http://localhost:9090/api/property/property/${id}`);
                const data = await response.json();
                if (data.property) {
                    setProperty(data.property);
                }
            } catch (error) {
                console.error("Error fetching property details:", error);
            }
        };
        fetchProperty();
    }, [id]);

    if (!property) {
        return <div className="loading">Loading...</div>;
    }

    const {
        name, location, price, images, bedrooms, washrooms, hallSize,
        nearbyLocation, nearestStation, status, floorType, petPolicy, description, owner
    } = property;

    // Handle Token Payment Click
    const handleTokenPayment = () => {
        navigate(`/tokenpayment`); // Navigate to the new page
    };
    
    return (
        <div className="property-container">
            <div className="property-card">
                {/* LEFT SECTION - IMAGES */}
                <div className="left-section">
                    <div className="main-image-container">
                        <img className="main-image" src={images?.length ? images[0] : "/images/default-image.png"} alt="Property" />
                    </div>

                    <div className="thumbnails">
                        {images?.slice(0, 3).map((img, index) => (
                            <img key={index} src={img} alt={`Thumbnail ${index + 1}`} className="thumbnail" />
                        ))}
                        {images?.length > 3 && (
                            <div className="cardhove"
                                style={{
                                    width: "100px",
                                    height: "80px",
                                    borderRadius: "5px",
                                    backgroundImage: `url(${images[0]})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontWeight: "bold",
                                    color: "white",
                                }}
                            >
                                +{images.length - 3} More
                            </div>
                        )}
                    </div>

                    {/* Property Info */}
                    <div className="property-info">
                        <h1>{name}</h1>
                        <p className="location"><FaMapMarkerAlt /> {location}</p>
                        <p className="price"><FaRupeeSign /> {price}</p>

                        {/* Description Card */}
                        <div className="description-card">
                            <h2>Property Details</h2>
                            <p>{description || "No Description Available"}</p>
                        </div>

                        {/* Buttons: Token Payment & Contact Owner */}
                        <div className="button-group">
                            <button className="token-payment-btn" onClick={handleTokenPayment}>
                                Pay Token Amount
                            </button>
                            <button className="contact-owner-btn">
                                Contact Owner
                            </button>
                        </div>
                    </div>

                    {/* Owner Info */}
                    {/* <div className="owner-info">
                        <FaUser className="owner-icon" />
                        <p>{owner?.name || "Unknown Owner"}</p>
                    </div> */}
                </div>

                {/* RIGHT SECTION - DETAILS */}
                <div className="right-section">
                    <div className="info-card">
                        <h2>General</h2>
                        <p><FaCouch /> Floor Type: {floorType}</p>
                        <p><FaPaw /> Pet Policy: {petPolicy || "Not Allowed"}</p>
                        <p>📌 Status: {status}</p>
                    </div>

                    <div className="info-card">
                        <h2>Sizes</h2>
                        {bedrooms?.count > 0 && <p><FaBed /> {bedrooms.count} Beds</p>}
                        {washrooms?.count > 0 && <p><FaBath /> {washrooms.count} Baths</p>}
                        {hallSize && <p><FaRulerCombined /> {hallSize} sqft Hall</p>}
                    </div>

                    <div className="info-card">
                        <h2>Nearby Places</h2>
                        {nearbyLocation?.name && <p><FaSchool /> {nearbyLocation.name} - {nearbyLocation.distance} away</p>}
                        {nearestStation?.name && <p><FaBus /> {nearestStation.name} - {nearestStation.distance} away</p>}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetailPage;
