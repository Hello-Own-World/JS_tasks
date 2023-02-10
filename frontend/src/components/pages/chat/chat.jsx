import React, { useEffect, useState } from 'react';
import { Form, useNavigate, redirect, Navigate } from 'react-router-dom';
import { getToken } from '../../logic/auth';
import { tryGetMsg, trySendMsg } from '../../logic/requests';

import Button from '../../common/button';
import Card from '../../common/card';
import Message from '../../common/message';

import classes from './chat.module.css';

const Chat = () => {
  const [response, setResponse] = useState([]);
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  const token = getToken();

  if (!token) {
    alert('You are not logged in');
    return navigate('/login');
  }

  useEffect(() => {
    tryGetMsg(token)
      .then((resp) => {
        setResponse(resp.data);
      })
      .catch((err) => console.log(err));
  }, []);

  response.map((el) => console.log(el));

  const msgInputHandler = (event) => {
    setMsg(event.target.value);
  };

  function msgSubmitHandler(event) {
    event.preventDefault();
    if (msg.trim().length === 0) {
      event.preventDefault();
      return;
    }

    const inputData = {
      body: msg,
    };

    // manually clearing fields
    setMsg('');

    console.log(inputData);

    trySendMsg(inputData, token)
      .then((data) => {
        console.log('Successful delivery' + data.status);
      })
      .catch((error) => console.log(error));

    tryGetMsg(token)
      .then((resp) => {
        setResponse(resp.data);
      })
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <h1 className={classes.h1}>Chat</h1>
      <Card className={classes.input}>
        <Form onSubmit={msgSubmitHandler}>
          <input onChange={msgInputHandler} value={msg} type='text' name='body'></input>
          <Button type='submit'>Send</Button>
        </Form>
      </Card>
      <div className={classes.chat}>
        {response.map((el) => {
          return (
            <Message
              message={el.body}
              username={el.author.login}
              time={new Date(el.updatedAt).toString().substring(0, 24)}
              id={el._id}
              className={classes.msg}></Message>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
