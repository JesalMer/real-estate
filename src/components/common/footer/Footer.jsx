import React from "react"
import { footer } from "../../data/Data"
import "./footer.css"
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <section className='footerContact'>
        <div className='container'>
          <div className='send flex'>
            <div className='text'>
              <h1>Do You Have Questions ?</h1>
              <p>We'll help you to grow your career and growth.</p>
            </div>
           
            <Link to="/contact"> <button className='btn5'>Contact Us Today</button></Link>
          </div>
        </div>
      </section>
      <footer>
        <div className='container'>
          <div className='box'>
            <div className='logo'>
              <img src='../images/logo-light.png' alt='' />
              <h2>Do You Need Help With Anything?</h2>
              <p>Receive updates, hot deals, tutorials, discounts sent straight in your inbox every month</p>

              <div className='input flex'>
                <input type='text' placeholder='Email Address' />
                <button>Subscribe</button>
              </div>
            </div>
          </div>

          {footer.map((val, index) => (
            <div className='box' key={index}> {/* Add key here for each box */}
              <h3>{val.title}</h3>
              <ul>
                {val.text.map((items, subIndex) => (  /* Add key for each li element */
                  <li key={subIndex}> {/* key added here */}
                    {items.list}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className='legal'>
        <span>© 2021 RentUP. Designed By GorkCoder.</span>
      </div>
    </>
  )
}

export default Footer
