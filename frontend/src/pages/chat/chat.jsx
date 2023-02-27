import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/common/message';
import Spinner from '../../components/common/spinner';
import UserCard from '../../components/common/userCard';
import SendMsgForm from '../../components/forms/SendMsgForm';
import { UserContext } from '../../core/contexts/userContext';
import { chatSocketHandler } from '../../core/logic/socketManager';
import UserApi from '../../core/logic/userApi';
import { formatHtmlText } from '../../core/logic/utils';
import classes from './chat.module.css';

const Chat = ({ socket }) => {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState(null);
  const [usersArr, setUsersArr] = useState([{}]);

  const { username } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!UserApi.IsLoggedIn()) {
      return navigate('/login', { state: { notAuthorised: true } });
    }
    if (socket) {
      // Wait on socket creation after page refresh
      chatSocketHandler(socket, setUsersArr, setMessages, setLoading, username);
      return () => {
        socket.emit('leave room');
      };
    }
  }, [socket]);

  return (
    <div className='row'>
      <div className='col'>
        <h1 className={classes.h1}>Chat</h1>
        <SendMsgForm socket={socket} setMessages={setMessages} />
        <Spinner loading={loading} />

        <div className={classes.chat}>
          {messages &&
            messages
              .slice(0)
              .reverse()
              .map((el) => {
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

      <div className='col'>
        <h1 className={classes.h1}>Users</h1>
        <div className={classes.chat}>
          {usersArr.map((el) => {
            return <UserCard username={el.username} key={el.userId} status={el.status} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Chat;
