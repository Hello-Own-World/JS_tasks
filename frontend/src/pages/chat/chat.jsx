import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/common/message';
import Spinner from '../../components/common/spinner';
import SendMsgForm from '../../components/forms/SendMsgForm';
import { ChatContext } from '../../core/contexts/chatContext';
import ChatApi from '../../core/logic/chatApi';
import UserApi from '../../core/logic/userApi';
import { formatHtmlText } from '../../core/logic/utils';
import classes from './chat.module.css';

import { socket } from '../../core/socket/socket';

socket.on('users', (users) => {
  // console.log('list of all users: ' + users);
  console.log('before function2');
  saveUsers(users);
  console.log('after function');
});

const Chat = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);

  const { userArray, setUserArray } = useContext(ChatContext);

  const navigate = useNavigate();

  function saveUsers(users) {
    console.log('function');
    setUserArray(users);
  }

  socket.on('users', (users) => {
    // console.log('list of all users: ' + users);
    console.log('before function2');
    saveUsers(users);
    console.log('after function');
  });

  useEffect(() => {
    socket.on('users', (users) => {
      // console.log('list of all users: ' + users);
      console.log('before function3');
      saveUsers(users);
      console.log('after function');
    });
  }, [socket]);

  useEffect(() => {
    if (!UserApi.IsLoggedIn()) {
      return navigate('/login', { state: { notAuthorised: true } });
    }
  }, []);

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
