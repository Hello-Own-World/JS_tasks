import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../../core/contexts/userContext';
import Spinner from '../../common/Spinner/spinner';
import AuthApi from '../../../core/logic/authApi';
import UserApi from '../../../core/logic/userApi';

import classes from './userInfoForm.css';

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
    <div id='form'>
      <div className={classes.formGroup}>
        <h1>Login:</h1>
        <span>{response.login}</span>
      </div>
      <div className={classes.formGroup}>
        <h1>First Name:</h1>
        <span>{response.firstName}</span>
      </div>
      <div className={classes.formGroup}>
        <h1>Last Name:</h1>
        <span>{response.lastName}</span>
      </div>
      <div className={classes.formGroup}>
        <h1>Phone Number:</h1>
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
