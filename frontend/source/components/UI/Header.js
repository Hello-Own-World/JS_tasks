import React from 'react';

import classes from './Header.module.css';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className={classes.headerDiv}>
      <h1 className={classes.h1}>
        <Link to={'/'} className={classes.noUnderscore}>
          Chat app
        </Link>
      </h1>

      <div className={classes.routerDiv}>
        <ul className={classes.ul}>
          <li className={classes.li}>
            <Link to={'/login'} className={classes.noUnderscore}>
              Login
            </Link>
          </li>
          <li className={classes.li}>
            <Link to={'/register'} className={classes.noUnderscore}>
              Register
            </Link>
          </li>
          <li className={classes.li}>
            <Link to={'/chat'} className={classes.noUnderscore}>
              Chat
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
