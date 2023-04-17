import React, { useEffect } from 'react';
import footerimg from '../../Images/evangadi-logo-footer-white.png';
import './Footer.css';
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';

function Footer() {
  return (
    <div>
      {/* Footer section  */}
      <footer className="container-fluid footer">
        <section className="row">
          <div className="first col-md-4">
            <div className="footer-logos">
              <a className="navbar-brand mx-5 px-2" href="/">
                <img src={footerimg} alt="" />
              </a>
              <div className="logos mb-4">
                 <FacebookRoundedIcon />
                <InstagramIcon />
                <YouTubeIcon />
              </div>
            </div>
          </div>
          <div className="second col-md-4">
            <ul>
              <h5>Useful Link</h5>
              <li>
                <a href="/">How it works</a>
              </li>
              <li>
                <a href="/">Term of Service</a>
              </li>
              <li>
                <a href="/">Privacy policy</a>
              </li>
            </ul>
          </div>
          <div className="third col-md-4">
            <ul>
              <h5>Contact Us</h5>
              <li>Phone: +1 (123) 456-7890</li>
              <li>Email: info@evangadi.com</li>
            </ul>
          </div>
        </section>

        {/* Footer bottom */}
        <section className="row">
          {/* Left side */}
          <div className="col-md-6 left-side">
            © 2023 Evangadi. All rights reserved.
          </div>
        </section>
      </footer>
    </div>
  );
}
export default Footer