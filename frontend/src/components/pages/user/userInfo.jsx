import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../../../App';
import Button from '../../common/button';
import Card from '../../common/card';
import classes from './UserInfo.module.css';

import axios from 'axios';

const UserInfo = (props) => {
  const userId = localStorage.getItem('UserId');

  if (!userId) {
    console.log('You are not logged in');
    return <h1 className={classes.h1}>You are not logged in</h1>;
  }

  const [response, setResponse] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:3000/api/user/${userId}`).then((resp) => {
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
