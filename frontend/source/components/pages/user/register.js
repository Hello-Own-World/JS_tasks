import React, { useState } from 'react';

import Card from '../../UI/Card';
import Button from '../../UI/Button';
import ErrorModal from '../../UI/ErrorModal';
import Header from '../../UI/Header';

import classes from './register.module.css';

const Register = () => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState();

  function submitHandler(event) {
    event.preventDefault(); // preventing page from reloading

    if (
      login.trim().length === 0 ||
      pass.trim().length === 0 ||
      firstName.trim().length === 0 ||
      lastName.trim().length === 0 ||
      phone.trim().length === 0
    ) {
      setError({
        title: 'Invalid input',
        message: 'Please enter all data'
      });
      return;
    }

    const inputData = {
      login: login,
      pass: pass,
      firstName: firstName,
      lastName: lastName,
      phone: phone
    };

    // manually clearing fields
    setLogin('');
    setPass('');
    setFirstName('');
    setLastName('');
    setPhone('');

    console.log(inputData);
  }

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

  const errorHandler = (event) => {
    setError(null);
  };

  return (
    <div>
      <h1 className={classes.h1}>Register</h1>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <form onSubmit={submitHandler}>
          <label>Login:</label>
          <input onChange={loginInputHandler} value={login} type="email" name="login"></input>
          <br></br>
          <label>Password:</label>
          <input onChange={passInputHandler} value={pass} type="password" name="pass"></input>
          <br></br>
          <label>First name:</label>
          <input
            onChange={firstNameInputHandler}
            value={firstName}
            type="text"
            name="firstName"></input>
          <br></br>
          <label>Last name:</label>
          <input
            onChange={lastNameInputHandler}
            value={lastName}
            type="text"
            name="lastName"></input>
          <br></br>
          <label>Phone number:</label>
          <input onChange={phoneInputHandler} value={phone} type="number" name="phone"></input>
          <br></br>
          <Button type="submit">Register</Button>
        </form>
      </Card>
    </div>
  );
};

export default Register;
