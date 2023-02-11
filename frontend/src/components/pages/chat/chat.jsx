import React, { useEffect, useState } from 'react';
import { Form, useNavigate } from 'react-router-dom';
import { getToken } from '../../logic/auth';
import { tryGetMsg, trySendMsg } from '../../logic/requests';
import { formatHtmlText } from '../../logic/helpers';

import Button from '../../common/button';
import Card from '../../common/card';
import Message from '../../common/message';

import classes from './chat.module.css';

const Chat = () => {
  const [response, setResponse] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const token = getToken();

  if (!token) {
    return (
      <div class='alert alert-danger'>
        <strong>Error!</strong> You have to be logged in to access global chat.{' '}
        <a href='/login' class='alert-link'>
          Log in page
        </a>
      </div>
    );

    // return navigate('/login');
  }

  useEffect(() => {
    setLoading(true);
    tryGetMsg(token)
      .then((resp) => {
        setResponse(resp.data);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

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
        <form onSubmit={msgSubmitHandler}>
          <textarea onChange={msgInputHandler} value={msg} type='text' name='body' class='form-control'></textarea>
          <br />
          <Button type='submit'>Send</Button>
        </form>
      </Card>

      {loading ? (
        <div className={classes.spinner}>
          <div class='spinner-border text-light'></div>
        </div>
      ) : null}

      <div className={classes.chat}>
        {response.map((el) => {
          return (
            <Message
              message={formatHtmlText(el.body)}
              username={el.author.login}
              time={new Date(el.updatedAt).toString().substring(0, 24)}
              key={el._id}
              className={classes.msg}></Message>
          );
        })}
      </div>
    </div>
  );
};

export default Chat;
