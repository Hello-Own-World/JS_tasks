import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../../App';
import Button from '../../common/button';
import Card from '../../common/card';
import { getLocalItem } from '../../logic/localStorage';
import { tryGetUserInfo } from '../../logic/requests';
import classes from './UserInfo.module.css';

const UserInfo = (props) => {
  const userId = getLocalItem('UserId');

  if (!userId) {
    console.log('You are not logged in');
    return <h1 className={classes.h1}>You are not logged in</h1>;
  }

  const [response, setResponse] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    tryGetUserInfo(userId).then((resp) => {
      setResponse(resp.data);
    });
  }, []);

  const [value, setUsername] = useContext(UserContext);

  const logout = () => {
    setUsername('Guest');
    localStorage.clear();
    console.log('Local storage was cleared');
    return navigate('/home');
  };

  return (
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
  );
};

export default UserInfo;
