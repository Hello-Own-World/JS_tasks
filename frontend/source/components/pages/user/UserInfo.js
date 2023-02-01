import React, { useEffect, useState } from 'react';

import classes from './UserInfo.module.css';
import Card from '../../UI/Card';

import axios from 'axios';

const UserInfo = (props) => {
  const userId = localStorage.getItem('UserId');

  if (!userId) {
    console.log('You are not logged in');
  }

  const [response, setResponse] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/user/${userId}`).then((resp) => {
      setResponse(resp.data);
    });
  }, []);

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
      </Card>
    </div>
  );
};

async function getUserData(userId) {
  const response = await axios.get(`http://localhost:3000/api/user/${userId}`);
  return response;
}

export default UserInfo;
