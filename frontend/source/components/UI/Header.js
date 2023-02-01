import React, { useEffect } from 'react';

import classes from './Header.module.css';

import { useState } from 'react';

import { Link } from 'react-router-dom';

import { Outlet } from 'react-router-dom';

const Header = (props) => {
  const [account, setAccount] = useState('Guest');

  useEffect(() => {
    if (localStorage.getItem('Login')) {
      setAccount(localStorage.getItem('Login'));
      console.log('set new account name');
    }
  }, []);

  return (
    <div>
      <div className={classes.headerDiv}>
        <h1 className={classes.h1}>
          <Link to={'/home'} className={classes.noUnderscore}>
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

        <div className={classes.userCircle}>
          <img
            className={classes.img}
            src={require('/source/images/userIcon.png').default}
            alt="Avatar"
          />
          <p className={classes.h1}>
            <Link to={'/userInfo'} className={classes.noUnderscore}>
              {account}
            </Link>
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
