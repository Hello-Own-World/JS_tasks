import React, { useContext, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../core/contexts/userContext';
import AuthApi from '../core/logic/authApi';

import classes from './Header.module.css';

const Header = (props) => {
  const { username, setUsername } = useContext(UserContext);

  useEffect(() => {
    const prevLog = AuthApi.getPrevLogin();
    if (prevLog) {
      setUsername(prevLog);
    }
  });

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
          <img className={classes.img} src={require('../images/userIcon.png').default} alt='Avatar' />
          <p className={classes.h1}>
            <Link to={'/userInfo'} className={classes.noUnderscore}>
              {username}
            </Link>
          </p>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Header;
