import React, { useState, useContext, useEffect } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import axios from 'axios';

import Card from '../../common/card';
import Button from '../../common/button';
import ErrorModal from '../../common/errorModal';
import { UserContext } from '../../../App';

import classes from './login.module.css';

const Login = () => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState();
  const [errorLogin, setErrorLogin] = useState();

  const [username, setUsername] = useContext(UserContext);

  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
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

    setLogin('');
    setPass('');

    console.log(inputData);

    axios
      .post('http://localhost:3000/api/user/login', inputData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((data) => {
        setErrorLogin(null);
        localStorage.setItem('AccessToken', 'Bearer ' + data.data.token);
        localStorage.setItem('UserId', data.data.userId);
        localStorage.setItem('Login', data.data.login);
        setUsername(data.data.login);
        const expiration = new Date();
        expiration.setHours(expiration.getHours() + 1);
        localStorage.setItem('tokenExpiration', expiration.toISOString());
        return navigate('/home');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorLogin('Wrong input');
          console.log(errorLogin);
          return null;
        }
      });
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
        <Form onSubmit={submitHandler}>
          <label>Login:</label>
          <input onChange={loginInputHandler} value={login} type="email" name="login"></input>
          <br></br>
          <label>Password:</label>
          <input onChange={passInputHandler} value={pass} type="password" name="pass"></input>
          <br></br>
          <Button type="submit">Login</Button>
        </Form>
        {errorLogin ? <label className={classes.errorMsg}>{errorLogin}</label> : null}
      </Card>
    </div>
  );
};

export default Login;
