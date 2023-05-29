import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../core/contexts/userContext';
import Spinner from '../common/spinner';
import AuthApi from '../../core/logic/authApi';
import UserApi from '../../core/logic/userApi';

import Button from '../../components/common/button';
import Card from '../../components/common/card';

import classes from './userInfoForm.module.css';

const UserInfoForm = ({ socket }) => {
  const [response, setResponse] = useState(true);
  const [loading, setLoading] = useState(false);

  const { setUsername } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (UserApi.IsLoggedIn()) {
      setLoading(true);
      UserApi.GetUserInfo()
        .then((resp) => {
          setResponse(resp.data);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  const logout = () => {
    setUsername('Guest');
    AuthApi.clearLocalUserInfo();
    socket.disconnect();
    return navigate('/home');
  };

  return (
    <div>
      <div className={classes.formGroup}>
        <label for='login'>Login:</label>
        <span>{response.login}</span>
      </div>
      <div className={classes.formGroup}>
        <label for='firstName'>First Name:</label>
        <span>{response.firstName}</span>
      </div>
      <div className={classes.formGroup}>
        <label for='lastName'>Last Name:</label>
        <span>{response.lastName}</span>
      </div>
      <div className={classes.formGroup}>
        <label for='phoneNumber'>Phone Number:</label>
        <span>{response.phone}</span>
      </div>
      <div className={classes.formGroup}>
        <button onClick={logout} type='submit' class='button'>
          Logout
        </button>
      </div>

      <Spinner loading={loading} />
    </div>
  );
};

export default UserInfoForm;
