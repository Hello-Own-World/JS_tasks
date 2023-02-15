import React, { useState } from 'react';
import ErrorModal from '../../components/common/errorModal';
import LoginForm from '../../components/forms/loginForm';

import classes from './login.module.css';

const Login = () => {
  const [error, setError] = useState();

  const errorHandler = (event) => {
    setError(null);
  };

  return (
    <div>
      <h1 className={classes.h1}>Login</h1>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <LoginForm setError={setError} />
    </div>
  );
};

export default Login;
