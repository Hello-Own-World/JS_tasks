import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../components/common/button';
import Card from '../../components/common/card';
import { UserContext } from '../../core/contexts/userContext';
import AuthApi from '../../core/logic/authApi';
import UserApi from '../../core/logic/userApi';
import classes from './UserInfo.module.css';


const UserInfo = (props) => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(true);
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

  const { setUsername } = useContext(UserContext);

  const logout = () => {
    console.log('set username guest triggered');
    setUsername('Guest');
    AuthApi.clearLocalUserInfo();
    return navigate('/home');
  };

  return (
    <div>
      {UserApi.IsLoggedIn() ? (
        <div>
          <h1 className={classes.h1}>User info:</h1>
          <Card className={classes.input}>
            <h2>Login:</h2>
            <p>{response.login}</p>
            <h2>First name:</h2>
            <p>{response.firstName}</p>
            <h2>Last name:</h2>
            <p>{response.lastName}</p>
            <h2>Phone:</h2>
            <p>{response.phone}</p>
            <Button onClick={logout}>Log out</Button>
          </Card>
        </div>
      ) : (
        <div className='alert alert-warning'>
          <strong>Warning!</strong> You are logged in as Guest.{' '}
          <a href='/login' className='alert-link'>
            Log in page
          </a>
        </div>
      )}
      {loading ? (
        <div className={classes.spinner}>
          <div className='spinner-border text-light'></div>
        </div>
      ) : null}
    </div>
  );
};

export default UserInfo;
