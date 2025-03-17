import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FaBed, FaBath, FaMapMarkerAlt } from "react-icons/fa"; // Importing icons
import "./PropertyList.css";

const PropertyList = () => {
  const [properties, setProperties] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`http://localhost:9090/api/search${location.search}`);
        if (!response.ok) throw new Error("Failed to fetch properties");
        const data = await response.json();
        setProperties(data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, [location.search]);

  return (
    <div className="property-list">
      <h2>Search Results</h2>
      {properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="grid">
          {properties.map((property) => (
            <div key={property._id} className="property-card">
              {/* Property Image */}
              <img src={property.images?.[0] || "default-image.jpg"} alt={property.name} />

              {/* Property Details */}
              <div className="property-details">
                <h3>{property.name}</h3>
                <p><FaMapMarkerAlt /> {property.location}</p>

                {/* Icons for Bedrooms and Washrooms */}
                <div className="property-icons">
                  <span><FaBed /> {property.bedrooms.count} Bedroom(s)</span>
                  <span><FaBath /> {property.washrooms.count} Washroom(s)</span>
                </div>

                {/* Price Display */}
                <p className="property-price">${property.price}</p>
                 {/* More Info Link (Bottom Right) */}
                 <div className="more-info">
                            <a href={`/property/${property._id}`} className="more-info-link">More Info →</a>
                        </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PropertyList;
