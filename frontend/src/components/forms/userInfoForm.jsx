import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../core/contexts/userContext';
import Spinner from '../common/spinner';
import AuthApi from '../../core/logic/authApi';
import UserApi from '../../core/logic/userApi';

import Button from '../../components/common/button';
import Card from '../../components/common/card';

import classes from './userInfoForm.module.css';

const UserInfoForm = () => {
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
    console.log('set username guest triggered');
    setUsername('Guest');
    AuthApi.clearLocalUserInfo();
    return navigate('/home');
  };

  return (
    <div>
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

      <Spinner loading={loading} />
    </div>
  );
};

export default UserInfoForm;
