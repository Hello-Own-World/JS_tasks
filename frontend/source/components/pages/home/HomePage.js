import React, { useEffect, useContext } from 'react';
import { UserContext } from '../../../App';

import classes from './HomePage.module.css';

const Home = () => {
  const [value, setUsername] = useContext(UserContext);

  useEffect(() => {
    console.log('Use effect triggered');
    const loggedInUser = localStorage.getItem('Login');
    if (loggedInUser) {
      setUsername(loggedInUser);
    }
  }, []);

  return (
    <div>
      <h1 className={classes.h1}>About Chat App:</h1>
      <p className={classes.p}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
        labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
    </div>
  );
};

export default Home;
