import React, { useState } from 'react';
import { Form, redirect } from 'react-router-dom';
import axios from 'axios';

import Card from '../../UI/Card';
import Button from '../../UI/Button';
import ErrorModal from '../../UI/ErrorModal';

import classes from './login.module.css';

const Login = () => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState();

  function submitHandler(event) {
    if (login.trim().length === 0 || pass.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter all data'
      });

      event.preventDefault(); // preventing page from reloading
      return;
    }

    const inputData = {
      login: login,
      pass: pass
    };

    // manually clearing fields
    setLogin('');
    setPass('');

    console.log(inputData);
  }

  const loginInputHandler = (event) => {
    setLogin(event.target.value);
  };

  const passInputHandler = (event) => {
    setPass(event.target.value);
  };

  const errorHandler = (event) => {
    setError(null);
  };

  return (
    <div>
      <h1 className={classes.h1}>Login</h1>
      {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler} />}
      <Card className={classes.input}>
        <Form method="post" onSubmit={submitHandler}>
          <label>Login:</label>
          <input onChange={loginInputHandler} value={login} type="email" name="login"></input>
          <br></br>
          <label>Password:</label>
          <input onChange={passInputHandler} value={pass} type="password" name="pass"></input>
          <br></br>
          <Button type="submit">Login</Button>
        </Form>
      </Card>
    </div>
  );
};

export async function action({ request }) {
  console.log('ACTION LOGIN METHOD INVOKED');

  const data = await request.formData();

  const authData = {
    login: data.get('login'),
    pass: data.get('pass')
  };

  axios
    .post('http://localhost:3000/api/user/login', authData, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((data) => {
      console.log(data);
      console.log(data.data.token);
      console.log(data.data.userId);
      localStorage.setItem('AccessToken', 'Bearer ' + data.data.token);
      localStorage.setItem('UserId', data.data.userId);
      localStorage.setItem('Login', data.data.login);
    })
    .catch((error) => console.log(error));

  return redirect('/home');
}

export default Login;
