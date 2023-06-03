import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/common/Message/message';
import Spinner from '../../components/common/Spinner/spinner';
import UserCard from '../../components/common/userCard/userCard';
import SendMsgForm from '../../components/forms/sendMsgFrom/sendMsgForm';
import { UserContext } from '../../core/contexts/userContext';
import { chatSocketHandler, userLeftRoomEmitter } from '../../core/logic/socketManager';
import UserApi from '../../core/logic/userApi';
import { formatHtmlText } from '../../core/logic/utils';
import classes from './chat.css';

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
        userLeftRoomEmitter(socket);
      };
    }
  }, [socket]);

  return (
    <div>
      <div className={classes.mainView}>
        <div className={classes.userList}>
          {usersArr.map((el) => {
            return <UserCard username={el.username} key={el.userId} status={el.status} />;
          })}
        </div>

        <main>
          <div className={classes.chatView}>
            {messages &&
              messages
                .slice(0)
                .reverse()
                .map((el) => {
                  return (
                    // to do: display proper own messages
                    <Message
                      message={formatHtmlText(el.body)}
                      username={el.author.login}
                      time={new Date(el.updatedAt).toString().substring(0, 24)}
                      key={el._id}
                      className={classes.msg}></Message>
                  );
                })}

            <div className={classes.messageBoxOwn}>
              <h2>Username</h2>
              <p>Message text small</p>
              <p className={classes.time}>YYYY-MM-DD HH:mm</p>
            </div>
          </div>

          <Spinner loading={loading} />

          <SendMsgForm socket={socket} setMessages={setMessages} />
        </main>
      </div>
    </div>
  );
};

export default Chat;
