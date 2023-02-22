import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../../components/common/message';
import Spinner from '../../components/common/spinner';
import SendMsgForm from '../../components/forms/SendMsgForm';
import { UserContext } from '../../core/contexts/userContext';
import UserApi from '../../core/logic/userApi';
import { formatHtmlText } from '../../core/logic/utils';
import classes from './chat.module.css';
import Card from '../../components/common/card';
import UserCard from '../../components/common/userCard';

const Chat = ({ socket }) => {
  const [response, setResponse] = useState([]); // used foe msgs
  const [loading, setLoading] = useState(true);

  const { username } = useContext(UserContext);

  const [messages, setMessages] = useState({});
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

      socket.on('session', ({ sessionID, userID }) => {
        console.log('SESSION RECIEVED');
        // attach the session ID to the next reconnection attempts
        socket.auth = { sessionID };
        // store it in the localStorage
        localStorage.setItem('sessionID', sessionID);
        // save the ID of the user
        socket.userID = userID;
      });

      socket.on('users', (users) => {
        setUsersArr(users); //overwrite local user storage on new connection
      });

      socket.on('user connected', (user) => {
        let present = false;

        setUsersArr((prevArr) => {
          const newArr = [...prevArr];
          newArr.forEach((el) => {
            if (el.userID === user.userID) {
              el.status = 'Online';
              present = true;
            }
          });
          return newArr;
        });

        if (!present) {
          setUsersArr((prevArr) => {
            user.status = 'Online';
            const newArr = [...prevArr, user];
            return newArr;
          });
        }
      });

      socket.on('user left room', (user) => {
        // change status to away
        setUsersArr((prevArr) => {
          const newArr = [...prevArr];
          newArr.forEach((el) => {
            if (el.userID === user.userID) {
              el.status = 'Away';
            }
          });

          // newArr.forEach((el) => console.log(el));

          return newArr;
        });
      });

      socket.on('user disconnected', (user) => {
        // del user from userArr in chat
        setUsersArr((prevArr) => {
          const newArr = [...prevArr];
          newArr.splice(newArr.indexOf(user));
          return newArr;
        });
      });

      socket.on('disconnect', () => {
        console.log('disconnect triggered');
        // const sessionID = socket.handshake.auth.sessionID;
        // const username = socket.handshake.auth.username;
        // socket.auth = { sessionID, username };
        socket.connect();
      });

      socket.on('reconnect', () => {
        console.log('Socket reconnected:', socket.id);
      });

      return () => {
        socket.emit('leave room');
        // socket.off('users');
        // socket.off('user connected');
        // socket.off('user disconnected');
      };
    }
  }, [socket]);

  return (
    <div className='row'>
      <div className='col'>
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
