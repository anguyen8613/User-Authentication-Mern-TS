import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import Logout from '../auth/Logout';
import styles from './Navbar.module.css';

const Navbar: FC = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return null;
  }

  const loggedIn = context.loggedIn;

  return (
    <div className={styles.navContainer}>
      <Link to='/'>Home</Link>
      {loggedIn === false && (
        <>
          <Link to='/register'>Register</Link>
          <Link to='/login'>Log In</Link>
        </>
      )}

      {loggedIn === true && (
        <>
          <Link to='/customers'>Customers</Link>
          <Logout />
        </>
      )}
    </div>
  );
};

export default Navbar;
