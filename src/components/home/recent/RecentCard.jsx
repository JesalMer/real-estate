import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RecentCard = () => {
  // Set up state to store properties
  const [properties, setProperties] = useState([]);

  // Fetch the properties from the API when the component mounts
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch("http://localhost:9090/api/property/property/");
        const data = await response.json();
        setProperties(data.properties.slice(0, 9)); // Show only the 9 most recent properties
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  return (
    <>
      <div className="content grid-container mtop">
        {properties.map((property, index) => {
          const { name, location, price, type, _id, images, bedrooms } = property; // Destructure property details

          return (
            <div className="box shadow" key={index}>
              <div className="img">
                {/* Use the first image in the property images array */}
                <img src={images[0] || "../images/default-image.png"} alt={name} />
              </div>

              {/* Property Type Below Image */}
              <div className="category flex">
                <span
                  style={{
                    background: type === "For Sale" ? "#25b5791a" : "#ff98001a",
                    color: type === "For Sale" ? "#25b579" : "#ff9800",
                  }}
                >
                  {type}
                </span>
              </div>

              <div className="text">
                <h4 style={{ marginBottom: "8px" }}>{name}</h4> {/* Added space below name */}
                
                <p style={{ marginBottom: "6px" }}>
                  <i className="fa fa-location-dot"></i> {location}
                </p>

                {/* Bedrooms Section Below Location with Some Spacing */}
                {bedrooms?.count && (
                  <div className="bedrooms" style={{ marginBottom: "8px", display: "flex", alignItems: "center" }}>
                    <i className="fa fa-bed" style={{ marginRight: "5px", color: "#25b579" }}></i> 
                    {bedrooms.count} Bedrooms
                  </div>
                )}
              </div>

              <div className="button flex">
               <div className="price-container">
              <span className="price">{price}</span>
            </div>
            <div className="button">
              <Link to={`/property/${_id}`}>
                <button className="btn-more-info">More Info</button>
              </Link>
            </div>


              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default RecentCard;
