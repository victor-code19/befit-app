import { useState } from 'react';
import { NavLink, Link, useLoaderData, Form } from 'react-router-dom';
import { isAdminLogged } from '../../../utils/auth';

import Cart from '../../UI/Cart/Cart';
import CartButton from '../../UI/Cart/CartButton';

import logo from '../../../assets/logo-befit.png';

import classes from './MainNavigation.module.css';

const activeClassHandler = ({ isActive }) => {
  return isActive ? classes.active : undefined;
};

const MainNavigation = () => {
  const [navbar, setNavbar] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);

  const changeNavbar = () => {
    if (window.scrollY > 0) {
      setNavbar(true);
    } else {
      setNavbar(false);
    }
  };

  const showCartHandler = () => {
    setShowCartModal(true);
  };

  const closeCartHandler = () => {
    setShowCartModal(false);
  };

  window.addEventListener('scroll', changeNavbar);

  const token = useLoaderData();
  const isAdminAuthenticated = isAdminLogged();

  const authActions = token ? (
    <>
      <CartButton onClick={showCartHandler} />
      <Form action="/logout" method="post">
        <button className={classes.logout__btn}>Logout</button>
      </Form>
    </>
  ) : (
    <>
      <Link to="/login" className={classes.login__btn}>
        Login
      </Link>
      <Link to="/signup" className={classes.signin__btn}>
        Sign up
      </Link>
    </>
  );

  return (
    <header className={`${classes.header} ${navbar && classes.scrolled}`}>
      <img className={classes.logo} src={logo} alt="Logo" />
      <nav>
        <ul className={classes.nav__links}>
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
            <div className={classes.dropdown}>
              <Link title="Calculators">Calculators</Link>
              <ul>
                <li>
                  <NavLink to="/calculators/bmi" className={activeClassHandler}>
                    BMI
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/calculators/bmr" className={activeClassHandler}>
                    BMR
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <NavLink to="/exercises" title="Exercises" className={activeClassHandler}>
              Exercises
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" title="Contact Us" className={activeClassHandler}>
              Contact Us
            </NavLink>
          </li>
          {token && isAdminAuthenticated && (
            <li>
              <NavLink to="/blog/add" title="Add Post" className={activeClassHandler}>
                Add Post
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
      {authActions}
      {showCartModal && <Cart onClose={closeCartHandler} />}
    </header>
  );
};

export default MainNavigation;
