const usersHandler = (socket, setUsersArr) => {
  socket.on('users', (users) => {
    setUsersArr(users); //overwrite local user storage on new connection
  });
};

export const addMsg = (setMessages, msg) => {
  setMessages((prevArr) => {
    const newArr = [...prevArr, msg];
    return newArr;
  }); //overwrite local user storage on new connection
};

const sentMessageHandler = (socket, setMessages) => {
  socket.on('Sent message', (msg) => {
    addMsg(setMessages, msg);
  });
};

const messagesHandler = (socket, setMessages, setLoading) => {
  socket.on('messages', (messages) => {
    setMessages(messages); //overwrite local message storage on new connection
    setLoading(false);
  });
};

const userConectedHandler = (socket, setUsersArr) => {
  socket.on('user connected', (user) => {
    let present = false;
    setUsersArr((prevArr) => {
      const newArr = [...prevArr];
      // if user alredy is present set status to "Online"
      newArr.forEach((el) => {
        if (el.userID === user.userID) {
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
        const newArr = [...prevArr, user];
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
        if (el.userID === user.userID) {
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
    // Connect after pafe refresh
    const sessionID = localStorage.getItem('sessionID');
    socket.auth = { sessionID, username };
    socket.connect();
  }

  socket.emit('user joined room');

  usersHandler(socket, setUsersArr);
  sentMessageHandler(socket, setMessages);
  messagesHandler(socket, setMessages, setLoading);
  userConectedHandler(socket, setUsersArr);
  userLeftRoomHandler(socket, setUsersArr);
  disconnectHandler(socket, setUsersArr);
};
