import React, { useState, useEffect } from 'react';

import axios from 'axios';

import classes from './chat.module.css';

import Header from '../../UI/Header';
import Message from '../../UI/message';

const Chat = () => {
  const [response, setResponse] = useState([]);
  const token = localStorage.getItem('AccessToken');

  if (!token) {
    console.log('Absent access token');
    return <h1 className={classes.h1}>You must login to view global chat </h1>;
  }

  console.log(token + 'token');

  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/chat`, { headers: { Authorization: `${token}` } })
      .then((resp) => {
        setResponse(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  response.map((el) => console.log(el));

  return (
    <div>
      <h1 className={classes.h1}>Chat</h1>
      <div>
        {response.map((el) => {
          return (
            <div>
              <Message
                message={el.body}
                username={el.author.login}
                time={new Date(el.updatedAt).toJSON()}></Message>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
