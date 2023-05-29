import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ErrorModal from '../../components/common/errorModal';
import WarningMsg from '../../components/common/warningMsg';
import LoginForm from '../../components/forms/loginForm';

import classes from './login.module.css';

const Login = ({ socket }) => {
  const [error, setError] = useState();

  const { state } = useLocation();

  const errorHandler = (event) => {
    setError(null);
  };

  return (
    <main className={classes.wrapper}>
      <div className={classes.loginContainer}>
        <h1>Login</h1>
        {state && state.notAuthorised ? <WarningMsg /> : null}
        {/* // new warning modal */}
        {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
        {/* // new err modal */}
        <LoginForm setError={setError} socket={socket} />
        <p>
          Don't have an account?
          <a href='/register'>Sign up</a>
        </p>
      </div>

      {/* {state && state.notAuthorised ? <WarningMsg /> : null} */}
      {/* <h1 className={classes.h1}>Login</h1> */}
      {/* {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />} */}
      {/* <LoginForm setError={setError} socket={socket} /> */}
    </main>
  );
};

export default Login;
