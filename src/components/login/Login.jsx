import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Change this import
import "./Login.css"; // Import CSS file

const Login = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useHistory
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState(""); // To store error messages

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("pas ", formData);
  
    try {
      const response = await fetch("http://localhost:9090/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      // Wait for the response to be parsed as JSON
      const data = await response.json();
  
      console.log("login response", data); // Log the response data for debugging
  
      // Check if the user exists in the response data
      if (!data.user) {
        return alert("Login failed! Please check your credentials.");
      }
  
      // Assuming your backend returns a token or user info on successful login
      localStorage.setItem("user", data.user._id); // Store token in localStorage if present
      navigate("/"); // Redirect to Dashboard after login
    } catch (error) {
      setErrorMessage(error.message); // Show any errors that occur
    }
  };
  

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2 className="login-title">Login</h2>
        <label className="name">Enter your Email</label>
        <input
          type="email" // Changed to email type for better validation
          name="email" // Fixed the name to match formData
          value={formData.email} // Corrected value binding
          onChange={handleChange}
          className="input-field"
          required
        />
        <label className="password">Enter your password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
          required
        />

        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error messages */}

        <button type="submit" className="login-button">Log In</button>

        <div className="forgot-password">
          <a href="/forgot-password">Forgot Password?</a>
        </div>
      </form>
    </div>
  );
};

export default Login;
