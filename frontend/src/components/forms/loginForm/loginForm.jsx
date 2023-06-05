import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../core/contexts/userContext';
import AuthApi from '../../../core/logic/authApi';
import UserApi from '../../../core/logic/userApi';
import { clearForm } from '../../../core/logic/utils';
import classes from './loginForm.css';

const LoginForm = ({ setError, socket }) => {
  const [login, setLogin] = useState('');
  const [pass, setPass] = useState('');
  const [errorLogin, setErrorLogin] = useState();

  const { username, setUsername } = useContext(UserContext);

  const setFormFields = {
    setLogin,
    setPass,
  };
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

        const sessionId = localStorage.getItem('sessionId');

        socket.auth = { sessionId, username: data.data.login };
        socket.connect();
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          setErrorLogin('Wrong input');
          return null;
        }
        console.error(error);
      });

    clearForm(setFormFields);

    return navigate('/home');
  }

  const loginInputHandler = (event) => {
    setLogin(event.target.value);
  };

  const passInputHandler = (event) => {
    setPass(event.target.value);
  };

  return (
    <div id='form'>
      <form onSubmit={submitHandler}>
        <div className={classes.formGroup}>
          <label htmlFor='login'>Login:</label>
          <input onChange={loginInputHandler} value={login} type='email' id='login' name='login' required />
        </div>
        <div className={classes.formGroup}>
          <label htmlFor='password'>Password:</label>
          <input onChange={passInputHandler} value={pass} type='password' id='password' name='password' required />
        </div>
        <div className={classes.formGroup}>
          <button type='submit' className={classes.button}>
            Login
          </button>
        </div>
      </form>
      {errorLogin ? <label className={classes.errorMsg}>{errorLogin}</label> : null}
    </div>
  );
};

export default LoginForm;
