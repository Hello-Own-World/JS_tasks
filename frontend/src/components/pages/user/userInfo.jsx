import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../../App';
import Button from '../../common/button';
import Card from '../../common/card';
import { getToken } from '../../logic/auth';
import { clearLocalUserInfo, getLocalItem } from '../../logic/localStorage';
import { tryGetUserInfo } from '../../logic/requests';
import classes from './UserInfo.module.css';

const UserInfo = (props) => {
  const userId = getLocalItem('UserId');
  const token = getToken();

  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      setLoading(true);
      tryGetUserInfo(userId).then((resp) => {
        setResponse(resp.data);
        setLoading(false);
      });
    }
  }, []);

  const [username, setUsername] = useContext(UserContext);

  const logout = () => {
    setUsername('Guest');
    clearLocalUserInfo();
    return navigate('/home');
  };

  return (
    <div>
      {token && userId ? (
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
        <div class='alert alert-warning'>
          <strong>Warning!</strong> You are logged in as Guest.{' '}
          <a href='/login' class='alert-link'>
            Log in page
          </a>
        </div>
      )}
      {loading ? (
        <div className={classes.spinner}>
          <div class='spinner-border text-light'></div>
        </div>
      ) : null}
    </div>
  );
};

export default UserInfo;
