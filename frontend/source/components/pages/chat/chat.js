import React, { useState, useEffect } from 'react';

import axios from 'axios';

import classes from './chat.module.css';

import Message from '../../UI/message';
import Card from '../../UI/Card';
import Button from '../../UI/Button';
import { Form } from 'react-router-dom';

const Chat = () => {
  const [response, setResponse] = useState([]);
  const [msg, setMsg] = useState('');
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
      body: msg
    };

    // manually clearing fields
    setMsg('');

    console.log(inputData);

    axios
      .post('http://localhost:3000/api/chat/message', inputData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        }
      })
      .then((data) => {
        console.log('Successful delivery' + data.status);
      })
      .catch((error) => console.log(error));

    axios
      .get(`http://localhost:3000/api/chat`, { headers: { Authorization: `${token}` } })
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
          <input onChange={msgInputHandler} value={msg} type="text" name="body"></input>
          <Button type="submit">Send</Button>
        </Form>
      </Card>
      <div className={classes.chat}>
        {response.map((el) => {
          return (
            <Message
              message={el.body}
              username={el.author.login}
              time={new Date(el.updatedAt).toJSON()}
              id={el._id}
              className={classes.msg}></Message>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
