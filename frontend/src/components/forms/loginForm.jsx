import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../core/contexts/userContext';
import AuthApi from '../../core/logic/authApi';
import UserApi from '../../core/logic/userApi';
import { clearForm } from '../../core/logic/utils';
import Button from '../common/button';
import Card from '../common/card';
import classes from './loginForm.module.css';

const LoginForm = ({ setError }) => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [errorLogin, setErrorLogin] = useState();

  const { setUsername } = useContext(UserContext);

  const navigate = useNavigate();

  const setFormFields = {
    setLogin,
    setPass,
  };

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
      })
      .catch((error) => {
        if (error.response.status === 400) {
          setErrorLogin('Wrong input');
          return null;
        }
      });

    clearForm(setFormFields);
  }

  const loginInputHandler = (event) => {
    setLogin(event.target.value);
  };

  const passInputHandler = (event) => {
    setPass(event.target.value);
  };

  return (
    <Card className={classes.input}>
      <form onSubmit={submitHandler}>
        <label>Login:</label>
        <input onChange={loginInputHandler} value={login} type='email' name='login'></input>
        <br />
        <label>Password:</label>
        <input onChange={passInputHandler} value={pass} type='password' name='pass'></input>
        <br />
        <Button type='submit'>Login</Button>
      </form>
      {errorLogin ? <label className={classes.errorMsg}>{errorLogin}</label> : null}
    </Card>
  );
};

export default LoginForm;
