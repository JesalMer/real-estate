import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Heading from "../../common/Heading";
import "./hero.css";

const Hero = () => {
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  const navigate = useNavigate();


  
  const handleSearch = (e) => {
    e.preventDefault();

    // Build query params
    const queryParams = new URLSearchParams();
    if (location) queryParams.append("location", location);
    if (propertyType) queryParams.append("propertyType", propertyType);
    if (bedrooms) queryParams.append("bedrooms", bedrooms);
    if (minPrice) queryParams.append("minPrice", minPrice);
    if (maxPrice) queryParams.append("maxPrice", maxPrice);

    // Navigate to PropertyList page with search query
    navigate(`/properties?${queryParams.toString()}`);
  };

  return (
    <section className="hero">
      <div className="hero-overlay">
        <div className="container">
          <Heading title="Search Your Next Home" subtitle="Find new & featured properties in your local city." />
          {/* ✅ Search Form */}
          <form className="search-form" onSubmit={handleSearch}>
            <div className="box">
              <label>City/Street</label>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input"
              />
            </div>
            <div className="box">
              <label>Property Type</label>
              <select value={propertyType} onChange={(e) => setPropertyType(e.target.value)} className="input">
                <option value="">Select Type</option>
                <option value="House">House</option>
                <option value="Flat">Flat</option>
              </select>
            </div>
            <div className="box">
              <label>Bedrooms</label>
              <input
                type="number"
                placeholder="No. of Bedrooms"
                value={bedrooms.count}
                onChange={(e) => setBedrooms(e.target.value)}
                className="input"
                min="1"
              />
            </div>
            <div className="box">
              <label>Min Price</label>
              <input
                type="number"
                placeholder="Min Price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                className="input"
                min="0"
              />
            </div>
            <div className="box">
              <label>Max Price</label>
              <input
                type="number"
                placeholder="Max Price"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="input"
                min="0"
              />
            </div>
            <button type="submit" className="btn-search">
              <i className="fa fa-search"></i> Search
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Hero;
