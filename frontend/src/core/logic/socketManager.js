/**Subscribe to events:
 * usersHandler
 * sentMessageHandler
 * messagesHandler
 * userConnectedHandler
 * userLeftRoomHandler
 * disconnectHandler
 *
 * Emitters:
 * userJoinedRoomEmitter
 * userLeftRoomEmitter
 */


const sentMessageHandler = (socket, setMessages) => {
  socket.on('Sent message', (msg) => {
    addMsg(setMessages, msg);
  });
};

const userConnectedHandler = (socket, setUsersArr) => {
  socket.on('user connected', (user) => {
    let present = false;
    setUsersArr((prevArr) => {
      const newArr = [...prevArr];
      // if user already is present set status to "Online"
      newArr.forEach((el) => {
        if (el.userId === user.userId) {
          el.status = 'Online';
          present = true;
        }
      });
      return newArr;
    });
    // otherwise add user to arr
    if (!present) {
      setUsersArr((prevArr) => {
        user.status = 'Online';
        const newArr = prevArr.concat(user);
        return newArr;
      });
    }
  });
};

const userLeftRoomHandler = (socket, setUsersArr) => {
  socket.on('user left room', (user) => {
    // change user status to "away"
    setUsersArr((prevArr) => {
      const newArr = [...prevArr];
      newArr.forEach((el) => {
        if (el.userId === user.userId) {
          el.status = 'Away';
        }
      });
      return newArr;
    });
  });
};

const disconnectHandler = (socket, setUsersArr) => {
  socket.on('user disconnected', (user) => {
    // del user from userArr in chat
    setUsersArr((prevArr) => {
      const newArr = [...prevArr];
      newArr.splice(newArr.indexOf(user - 1));
      return newArr;
    });
  });
};

export const chatSocketHandler = (socket, setUsersArr, setMessages, setLoading, username) => {
  // Wait on socket creation after page refresh
  if (!socket.connected) {
    // Connect after page refresh
    const sessionId = localStorage.getItem('sessionId');
    socket.auth = { sessionId, username };
    socket.connect();
  }

    userJoinedRoomEmitter(socket, setUsersArr, setMessages, setLoading);

  sentMessageHandler(socket, setMessages);
  userConnectedHandler(socket, setUsersArr);
  userLeftRoomHandler(socket, setUsersArr);
  disconnectHandler(socket, setUsersArr);
};

const userJoinedRoomEmitter = (socket, setUsersArr, setMessages, setLoading) => {
  socket.emit('user:join-room', function (users, messages) {
    setUsersArr(users); // overwrite local user storage on new connection

    setMessages(messages); // overwrite local message storage on new connection
    setLoading(false);
  });
};

export const userLeftRoomEmitter = (socket) => {
  socket.emit('user:leave-room');
};

export const addMsg = (setMessages, msg) => {
  setMessages((prevArr) => {
    const newArr = prevArr.concat(msg);
    return newArr;
  }); // overwrite local user storage on new connection
};
