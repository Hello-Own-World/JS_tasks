import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/common/message';
import Spinner from '../../components/common/spinner';
import SendMsgForm from '../../components/forms/SendMsgForm';
import { UserContext } from '../../core/contexts/userContext';
import UserApi from '../../core/logic/userApi';
import { formatHtmlText } from '../../core/logic/utils';
import classes from './chat.module.css';
import UserCard from '../../components/common/userCard';

const Chat = ({ socket }) => {
  const [loading, setLoading] = useState(true);

  const { username } = useContext(UserContext);

  const [messages, setMessages] = useState(null);
  const [usersArr, setUsersArr] = useState([{}]);

  const navigate = useNavigate();

  useEffect(() => {
    if (!UserApi.IsLoggedIn()) {
      return navigate('/login', { state: { notAuthorised: true } });
    }

    if (socket) {
      // wait on socket creation after page refresh
      console.log('socket ' + socket);
      if (!socket.connected) {
        console.log('try connect to socket');
        const sessionID = localStorage.getItem('sessionID');
        socket.auth = { sessionID, username };
        socket.connect();
      }

      socket.emit('user joined room');

      socket.on('users', (users) => {
        setUsersArr(users); //overwrite local user storage on new connection
      });

      socket.on('Sent message', (msg) => {



        setMessages((prevArr) => {
          const newArr = [...prevArr, msg];
          return newArr;
        }); //overwrite local user storage on new connection
        console.log('GOT ANOTHER USERS MESSAGE' + msg.body);
      });

      socket.on('messages', (messages) => {
        console.log('MESSAGES EVENT TRIGGERED ' + messages);

        setMessages(messages); //overwrite local message storage on new connection
        setLoading(false);
      });

      socket.on('user connected', (user) => {
        let present = false;
        console.log('USER CONECTED TRIGGERED');
        setUsersArr((prevArr) => {
          const newArr = [...prevArr];
          newArr.forEach((el) => {
            console.log(
              'el.userID: ' +
                el.userID +
                ' el.username: ' +
                el.userID +
                ' vs ' +
                'user.userID: ' +
                user.userID +
                'user.username: ' +
                user.userID
            );

            if (el.userID === user.userID) {
              el.status = 'Online';
              present = true;
            }
          });

          return newArr;
        });

        console.log('present ' + present);
        if (!present) {
          console.log('add user ' + user.username);
          setUsersArr((prevArr) => {
            user.status = 'Online';
            const newArr = [...prevArr, user];
            return newArr;
          });
        }
      });

      socket.on('user left room', (user) => {
        // change user status to "away"
        setUsersArr((prevArr) => {
          const newArr = [...prevArr];
          newArr.forEach((el) => {
            if (el.userID === user.userID) {
              el.status = 'Away';
            }
          });
          return newArr;
        });
      });

      socket.on('user disconnected', (user) => {
        // del user from userArr in chat
        setUsersArr((prevArr) => {
          const newArr = [...prevArr];
          newArr.splice(newArr.indexOf(user - 1));
          return newArr;
        });
      });

      return () => {
        socket.emit('leave room');
      };
    }
  }, [socket]);

  return (
    <div className='row'>
      <div className='col'>
        <h1 className={classes.h1}>Chat</h1>
        <SendMsgForm socket={socket} />
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
            return <UserCard username={el.username} key={el.userID} status={el.status} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default Chat;
