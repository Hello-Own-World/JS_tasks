import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ChatApi from '../../core/logic/chatApi';
import UserApi from '../../core/logic/userApi';
import { formatHtmlText } from '../../core/logic/utils';

import Button from '../../components/common/button';
import Card from '../../components/common/card';
import Message from '../../components/common/message';

import classes from './chat.module.css';

const Chat = () => {
  const [response, setResponse] = useState([]);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  if (!UserApi.IsLoggedIn()) {
    return (
      <div className='alert alert-danger'>
        <strong>Error!</strong> You have to be logged in to access global chat.{' '}
        <a href='/login' className='alert-link'>
          Log in page
        </a>
      </div>
    );

    // return navigate('/login');
  }

  useEffect(() => {
    setLoading(true);
    ChatApi.GetMsg()
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

    setMsg('');

    console.log(inputData);

    ChatApi.SendMsg(inputData)
      .then((data) => {
        console.log('Successful delivery' + data.status);
      })
      .catch((error) => console.log(error));

    ChatApi.GetMsg()
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
          <textarea onChange={msgInputHandler} value={msg} type='text' name='body' className='form-control'></textarea>
          <br />
          <Button type='submit'>Send</Button>
        </form>
      </Card>

      {loading ? (
        <div className={classes.spinner}>
          <div className='spinner-border text-light'></div>
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
