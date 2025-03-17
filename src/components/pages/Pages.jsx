import React from "react";
import Header from "../common/header/Header";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Using Routes and Route in React Router v6
import Home from "../home/Home";
import Footer from "../common/footer/Footer";
import About from "../about/About";
import AddPropertyForm from "../sell/AddPropertyForm";
import Blog from "../blog/Blog";
import Services from "../services/Services";
import Contact from "../contact/Contact";
import Signup from "../signup/signup";
import Login from "../login/Login";
import ProfilePage from "../profilepage/ProfilePage";
import ScrollToTop from "../common/ScrollToTop/ScrollToTop";
import PropertyDetailPage from "../sell/PropertyDetailPage"; // Ensure this import is correct
import PropertyList from "../searchbar/PropertyList"; // Ensure this import is correct
import TokenPaymentPage from "../sell/TokenPaymentPage";

const Pages = () => {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes> {/* Using Routes for routing in React Router v6 */}
          <Route path="/" element={<Home />} /> {/* Use element prop */}
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/sell" element={<AddPropertyForm />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          {/* Corrected Route for PropertyDetailPage */}
          <Route path="/property/:id" element={<PropertyDetailPage />} /> 
          <Route path="/properties" element={<PropertyList />} />
          <Route path="/tokenpayment" element={<TokenPaymentPage />} />
        </Routes>
        <Footer />
      </Router>
    </>
  );
};

export default Pages;
