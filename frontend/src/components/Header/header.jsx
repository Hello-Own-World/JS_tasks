import React, { useContext, useEffect } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { UserContext } from '../../core/contexts/userContext';
import AuthApi from '../../core/logic/authApi';

import classes from './Header.css';

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
      <header className={classes.headerDiv}>
        <h1 className={classes.logo}>
          <Link to={'/home'} className={classes.noUnderscore}>
            Chat app
          </Link>
        </h1>

        <div className={classes.routerDiv}>
          <Link to={'/login'} className={classes.noUnderscore}>
            Login
          </Link>

          <Link to={'/register'} className={classes.noUnderscore}>
            Register
          </Link>

          <Link to={'/chat'} className={classes.noUnderscore}>
            Chat
          </Link>
        </div>

        <div className={classes.userCircle}>
          <span className={classes.username}>
            <Link to={'/userInfo'} className={classes.noUnderscore}>
              {username}
            </Link>
          </span>
          <img className={classes.img} src={require('../../images/image1.png').default} alt='Avatar' />
        </div>
      </header>
      <div className={classes.mainContent}>
        <Outlet />
      </div>

      <footer>
        <p>&copy; 2023 Chat App. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Header;
