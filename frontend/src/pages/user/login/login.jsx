import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import WarningMsg from '../../../components/common/warningMsg/warningMsg';
import LoginForm from '../../../components/forms/loginForm/loginForm';

import classes from './login.css';

const Login = ({ socket }) => {
  const [error, setError] = useState();

  const { state } = useLocation();

  const errorHandler = (event) => {
    setError(null);
  };

  return (
    <main className={classes.wrapper}>
      <div className={classes.loginContainer}>
        <h1 id='heading'>Login</h1>
        {state && state.notAuthorised ? <WarningMsg /> : null}
        <LoginForm id='form' setError={setError} socket={socket} />
        <p>
          Don't have an account?
          <a id='link' href='/register'>
            Sign up
          </a>
        </p>
      </div>
    </main>
  );
};

export default Login;
