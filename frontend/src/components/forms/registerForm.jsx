import React, { useState } from 'react';
import Button from '../../components/common/button';
import Card from '../../components/common/card';
import UserApi from '../../core/logic/userApi';
import { clearForm } from '../../core/logic/utils';

import classes from './registerForm.module.css';

const RegisterForm = ({ setError }) => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const setFormFields = {
    setLogin,
    setPass,
    setFirstName,
    setLastName,
    setPhone,
  };

  const loginInputHandler = (event) => {
    setLogin(event.target.value);
  };

  const passInputHandler = (event) => {
    setPass(event.target.value);
  };

  const firstNameInputHandler = (event) => {
    setFirstName(event.target.value);
  };

  const lastNameInputHandler = (event) => {
    setLastName(event.target.value);
  };

  const phoneInputHandler = (event) => {
    setPhone(event.target.value);
  };

  async function submitHandler(event) {
    event.preventDefault();
    if (
      login.trim().length === 0 ||
      pass.trim().length === 0 ||
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      phone.trim().length === 0
    ) {
      setError({
        title: 'Invalid input',
        message: 'Please enter all data',
      });
      return;
    }

    const inputData = {
      login: login,
      pass: pass,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
    };

    UserApi.Register(inputData)
      .then((data) => console.log(data))
      .catch((error) => {
        console.error(error);
      });

    clearForm(setFormFields);
  }
  return (
    <div>
      <form method='post' onSubmit={submitHandler}>
        <div className={classes.formGroup}>
          <label for='login'>Login:</label>
          <input onChange={loginInputHandler} value={login} type='email' name='login' id='login' required />
        </div>

        <div className={classes.formGroup}>
          <label for='password'>Password:</label>
          <input onChange={passInputHandler} value={pass} type='password' name='pass' id='password' required />
        </div>
        <div className={classes.formGroup}>
          <label for='firstname'>First Name:</label>
          <input
            onChange={firstNameInputHandler}
            value={firstName}
            type='text'
            name='firstName'
            id='firstname'
            required
          />
        </div>
        <div className={classes.formGroup}>
          <label for='lastname'>Last Name:</label>
          <input onChange={lastNameInputHandler} value={lastName} type='text' name='lastName' id='lastname' required />
        </div>
        <div className={classes.formGroup}>
          <label for='phonenumber'>Phone Number:</label>
          <input onChange={phoneInputHandler} value={phone} type='tel' name='phone' id='phonenumber' required />
        </div>
        <div className={classes.formGroup}>
          <button type='submit' class='button'>
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;
