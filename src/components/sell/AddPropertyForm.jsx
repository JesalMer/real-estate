import { useState } from "react";
import "./AddPropertyForm.css";

export default function AddPropertyForm() {
  const [property, setProperty] = useState({
    name: "",
    type: "House",
    location: "",
    price: "",
    yearBuilt: "",
    floorNumber: "",
    totalFloors: "",
    status: "Available",
    description: "",
    bedrooms: { count: "", size: "" },
    kitchens: { count: "", size: "" },
    hallSize: "",
    washrooms: { count: "", size: "" },
    amenities: { gym: false, swimmingPool: false },
    nearbyLocation: { name: "", distance: "" },
    nearestStation: { name: "", distance: "" },
    parkingSpaces: "",
    floorType: "",
    petPolicy: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [section, key] = name.split(".");
      setProperty((prev) => ({
        ...prev,
        [section]: { ...prev[section], [key]: type === "checkbox" ? checked : value },
      }));
    } else {
      setProperty({ ...property, [name]: value });
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setProperty((prev) => ({ ...prev, images: [...prev.images, ...imageUrls] }));
  };

  const handleSave = async () => {
    // Send the property data to the backend API
    try {
      const response = await fetch("http://localhost:9090/api/property/property", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(property), // Send property data as JSON
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Property details saved:", data);
        // alert("Property details saved successfully!");
        handleReset();  // Reset form after save
      } else {
        throw new Error("Failed to save property");
      }
    } catch (error) {
      console.error("Error saving property:", error);
      alert("An error occurred while saving the property.");
    }
  };

  const handleReset = () => {
    setProperty({
      name: "",
      type: "House",
      location: "",
      price: "",
      yearBuilt: "",
      floorNumber: "",
      totalFloors: "",
      status: "Available",
      description: "",
      bedrooms: { count: "", size: "" },
      kitchens: { count: "", size: "" },
      hallSize: "",
      washrooms: { count: "", size: "" },
      amenities: { gym: false, swimmingPool: false },
      nearbyLocation: { name: "", distance: "" },
      nearestStation: { name: "", distance: "" },
      parkingSpaces: "",
      floorType: "",
      petPolicy: "",
      images: [],
    });
  };

  return (
    <div className="property-form-container">
      <h2>Add Property</h2>
      <div className="form-grid">
        <div>
          <label>Property Name</label>
          <input name="name" value={property.name} onChange={handleChange} />
        </div>
        <div>
          <label>Type</label>
          <select name="type" value={property.type} onChange={handleChange}>
            <option value="House">House</option>
            <option value="Flat">Flat</option>
          </select>
        </div>
      </div>
      <div className="form-grid">
        <div>
          <label>Location</label>
          <input name="location" value={property.location} onChange={handleChange} />
        </div>
        <div>
          <label>Price</label>
          <input type="number" name="price" value={property.price} onChange={handleChange} />
        </div>
      </div>
      <div className="form-grid">
        <div>
          <label>Year Built</label>
          <input type="number" name="yearBuilt" value={property.yearBuilt} onChange={handleChange} />
        </div>
        <div>
          <label>Parking Spaces</label>
          <input type="number" name="parkingSpaces" value={property.parkingSpaces} onChange={handleChange} />
        </div>
      </div>
      {property.type === "Flat" && (
        <div className="form-grid">
          <div>
            <label>Floor Number</label>
            <input type="number" name="floorNumber" value={property.floorNumber} onChange={handleChange} />
          </div>
          <div>
            <label>Total Floors</label>
            <input type="number" name="totalFloors" value={property.totalFloors} onChange={handleChange} />
          </div>
        </div>
      )}
      <div className="form-grid">
        <div>
          <label>Status</label>
          <select name="status" value={property.status} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" value={property.description} onChange={handleChange} />
        </div>
      </div>
      <div className="form-grid">
        <div>
          <label>Bedrooms Count</label>
          <input type="number" name="bedrooms.count" value={property.bedrooms.count} onChange={handleChange} />
        </div>
        <div>
          <label>Bedrooms Size</label>
          <input name="bedrooms.size" value={property.bedrooms.size} onChange={handleChange} />
        </div>
      </div>
      <div className="form-grid">
        <div>
          <label>Kitchens Count</label>
          <input type="number" name="kitchens.count" value={property.kitchens.count} onChange={handleChange} />
        </div>
        <div>
          <label>Kitchens Size</label>
          <input name="kitchens.size" value={property.kitchens.size} onChange={handleChange} />
        </div>
      </div>
      <div className="form-grid">
        <div>
          <label>Hall Size</label>
          <input name="hallSize" value={property.hallSize} onChange={handleChange} />
        </div>
        <div>
          <label>Washrooms Count</label>
          <input type="number" name="washrooms.count" value={property.washrooms.count} onChange={handleChange} />
        </div>
        <div>
          <label>Washrooms Size</label>
          <input name="washrooms.size" value={property.washrooms.size} onChange={handleChange} />
        </div>
      </div>
      <div className="form-grid">
        <div>
          <label>Amenities: Gym</label>
          <input type="checkbox" name="amenities.gym" checked={property.amenities.gym} onChange={handleChange} />
        </div>
        <div>
          <label>Amenities: Swimming Pool</label>
          <input type="checkbox" name="amenities.swimmingPool" checked={property.amenities.swimmingPool} onChange={handleChange} />
        </div>
      </div>
      <div className="form-grid">
        <div>
          <label>Nearby Location Name</label>
          <input name="nearbyLocation.name" value={property.nearbyLocation.name} onChange={handleChange} />
        </div>
        <div>
          <label>Nearby Location Distance</label>
          <input name="nearbyLocation.distance" value={property.nearbyLocation.distance} onChange={handleChange} />
        </div>
      </div>
      <div className="form-grid">
        <div>
          <label>Nearest Station Name</label>
          <input name="nearestStation.name" value={property.nearestStation.name} onChange={handleChange} />
        </div>
        <div>
          <label>Nearest Station Distance</label>
          <input name="nearestStation.distance" value={property.nearestStation.distance} onChange={handleChange} />
        </div>
      </div>
      <div className="form-grid">
        <div>
          <label>Floor Type</label>
          <input name="floorType" value={property.floorType} onChange={handleChange} />
        </div>
        <div>
          <label>Pet Policy</label>
          <input name="petPolicy" value={property.petPolicy} onChange={handleChange} />
        </div>
      </div>
      <div className="form-grid">
        <div>
          <label>Upload Images</label>
          <input type="file" multiple onChange={handleImageUpload} />
        </div>
      </div>
      <div className="button-group">
        <button className="save-button" onClick={handleSave}>Save</button>
        <button className="reset-button" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
}
