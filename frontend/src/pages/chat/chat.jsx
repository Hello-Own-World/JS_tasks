import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/common/message';
import Spinner from '../../components/common/spinner';
import SendMsgForm from '../../components/forms/SendMsgForm';
import { UserContext } from '../../core/contexts/userContext';
import UserApi from '../../core/logic/userApi';
import { formatHtmlText } from '../../core/logic/utils';
import classes from './chat.module.css';

const Chat = ({ socket }) => {
  const [response, setResponse] = useState([]); // used foe msgs
  const [loading, setLoading] = useState(true);

  const { username } = useContext(UserContext);

  const [messages, setMessages] = useState({});
  const [usersArr, setUsersArr] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    if (!UserApi.IsLoggedIn()) {
      return navigate('/login', { state: { notAuthorised: true } });
    }

    socket.auth = { username: username };
    socket.connect();

    socket.on('users', (users) => {
      console.log(users);
      setUsersArr(users); //overwrite local udser storage on new connection
      console.log('After successful local save ' + usersArr);
    });

    socket.on('user connected', (user) => {
      setUsersArr((prevArr) => {
        const newArr = [...prevArr, user];
        return newArr;
      });
    });

    return () => {
      socket.off('users');
      socket.disconnect();
    };
  }, [socket]);

  // useEffect(() => {
  //   setLoading(true);
  //   ChatApi.GetMsg()
  //     .then((resp) => {
  //       setResponse(resp.data);
  //       setLoading(false);
  //     })
  //     .catch((err) => console.log(err));
  // }, []);

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
