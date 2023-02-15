import React, { useEffect, useState } from 'react';
import ChatApi from '../../core/logic/chatApi';
import UserApi from '../../core/logic/userApi';
import { formatHtmlText } from '../../core/logic/utils';

import Message from '../../components/common/message';

import classes from './chat.module.css';
import Spinner from '../../components/common/spinner';

import SendMsgForm from '../../components/forms/SendMsgForm';

const Chat = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div>
      <h1 className={classes.h1}>Chat</h1>

      <SendMsgForm setResponse={setResponse} />

      <Spinner loading={loading} />

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
