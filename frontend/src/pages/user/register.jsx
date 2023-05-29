import React, { useState } from 'react';

import ErrorModal from '../../components/common/errorModal';
import classes from './register.module.css';

import RegisterForm from '../../components/forms/registerForm';

const Register = () => {
  const [error, setError] = useState();

  const errorHandler = (event) => {
    setError(null);
  };

  return (
    <div>
      <main className={classes.wrapper}>
        <div className={classes.registerContainer}>
          <h1>Register</h1>
          {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}

          <RegisterForm setError={setError} />

          <p>
            Already have an account? <a href='/login'>Log in</a>
          </p>
        </div>
      </main>

      {/* <h1 className={classes.h1}>Register</h1>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <RegisterForm setError={setError} /> */}
    </div>
  );
};

export default Register;
