import React, { useContext, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { UserContext } from '../../core/contexts/userContext';
import AuthApi from '../../core/logic/authApi';
import UserApi from '../../core/logic/userApi';

import Button from '../../components/common/button';
import Card from '../../components/common/card';
import ErrorModal from '../../components/common/errorModal';

import classes from './login.module.css';

const Login = () => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState();
  const [errorLogin, setErrorLogin] = useState();

  const { setUsername } = useContext(UserContext);
  const navigate = useNavigate();

  function submitHandler(event) {
    event.preventDefault();
    if (login.trim().length === 0 || pass.trim().length === 0) {
      setError({
        title: 'Invalid input',
        message: 'Please enter all data',
      });
      return;
    }

    const inputData = {
      login: login,
      pass: pass,
    };

    UserApi.Login(inputData)
      .then((data) => {
        setErrorLogin(null);
        setUsername(data.data.login);
        AuthApi.setLocalUserInfo(data.data.token, data.data.userId, data.data.login);
        return navigate('/home');
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorLogin('Wrong input');
          return null;
        }
      });

    setLogin('');
    setPass('');
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
          <input onChange={loginInputHandler} value={login} type='email' name='login'></input>
          <br />
          <label>Password:</label>
          <input onChange={passInputHandler} value={pass} type='password' name='pass'></input>
          <br />
          <Button type='submit'>Login</Button>
        </Form>
        {errorLogin ? <label className={classes.errorMsg}>{errorLogin}</label> : null}
      </Card>
    </div>
  );
};

export default Login;
