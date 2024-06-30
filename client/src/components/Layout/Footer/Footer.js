import { NavLink } from "react-router-dom";

import Newsletter from "./Newsletter";
import { SocialIcon } from "react-social-icons";

import classes from "./Footer.module.css";

const activeClassHandler = ({ isActive }) => {
  return isActive ? classes.active : undefined;
};

const Footer = () => {
  return (
    <footer className={classes.footer}>
      <div className={classes.footer__icons}>
        <SocialIcon url="https://facebook.com" />
        <SocialIcon url="https://instagram.com" />
        <SocialIcon url="https://youtube.com" />
        <SocialIcon url="https://twitter.com" />
      </div>
      <div className={classes.footer__navigation}>
        <ul>
          <li>
            <NavLink to="/" title="Home" className={activeClassHandler}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" title="About Us" className={activeClassHandler}>
              About Us
            </NavLink>
          </li>
          <li>
            <NavLink to="/offer" title="Offer" className={activeClassHandler}>
              Offer
            </NavLink>
          </li>
          <li>
            <NavLink to="/blog" title="Blog" className={activeClassHandler}>
              Blog
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" title="Contact Us" className={activeClassHandler}>
              Contact Us
            </NavLink>
          </li>
        </ul>
      </div>
      <Newsletter />
      <div className={classes.line}></div>
      <div className={classes.copyrights}>
        <p>Copyright ©2023 All rights reserved.</p>
        <p>Designed and created by: Wiktor Mruk</p>
      </div>
    </footer>
  );
};

export default Footer;
