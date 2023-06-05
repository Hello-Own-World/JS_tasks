import React, { useState } from 'react';

import classes from './register.css';

import RegisterForm from '../../../components/forms/registerForm/registerForm';

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

          <RegisterForm id='form' setError={setError} />

          <p>
            Already have an account?{' '}
            <a id='loginLink' href='/login'>
              Log in
            </a>
          </p>
        </div>
      </main>
    </div>
  );
};

export default Register;
