import React, { useEffect, useContext } from 'react';

import classes from './Header.module.css';

import { UserContext } from '../../App';

import { Link } from 'react-router-dom';

import { Outlet } from 'react-router-dom';

const Header = (props) => {
  const [value, setUsername] = useContext(UserContext);

  useEffect(() => {
    const prevLog = localStorage.getItem('Login');
    if (prevLog) {
      setUsername(prevLog);
    }
  });

  console.log(value);

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
              {value}
            </Link>
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
