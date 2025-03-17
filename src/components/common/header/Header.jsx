import React, { useState,useEffect } from "react"
import "./header.css"
import { nav } from "../../data/Data"
import { Link } from "react-router-dom"

const Header = () => {
  const [navList, setNavList] = useState(false);
  const [user ,setUser] = useState("");
  useEffect(() => {
    try {
      // Retrieve user data from localStorage when the component mounts
      const storedUser = localStorage.getItem("user");
      console.log("u", storedUser)
      if (storedUser) {
        setUser(storedUser); // Assuming user data is stored as a JSON string
      }
    } catch (error) {
      console.error("Error parsing user data from localStorage", error);
    }
  }, [user]);

  return (
    <>
      <header>
        <div className='container flex'>
          <div className='logo'>
            <img src='./images/dreamkey.png' alt='dreamkey' />
            
          </div>
          <div className='nav'>
            <ul className={navList ? "small" : "flex"}>
              {nav.map((list, index) => (
                <li key={index}>
                  <Link to={list.path}>{list.text}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className='button flex'>
            {/* <h4>
              {user}
            </h4> */}
            <Link to="/signup">
              <button className='btn1'>
                <i className='fa fa-sign-out'></i> Sign Up
              </button></Link>
            <Link to="/Login"> <button className='btn1'>
              <i className='fa fa-sign-out'></i> Log In
            </button></Link>
            <Link to="/ProfilePage"> <button className='btn2'>
              <i className='fa fa-sign-out'></i>Profile
            </button></Link>
          </div>

          <div className='toggle'>
            <button onClick={() => setNavList(!navList)}>{navList ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}</button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Header
