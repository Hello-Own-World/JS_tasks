const Message = require('../models/message');

const getUserList = (io) => {
  // Get list of all current users from sockets
  const users = [];
  const savedUserIds = []; // to avoid diferent sockets that are used by same browser but in different tabs
  for (let [id, sockets] of io.of('/').sockets) {
    if (!savedUserIds.includes(sockets.userID)) {
      users.push({
        userID: sockets.userID,
        username: sockets.username,
        status: 'Online',
      });
      savedUserIds.push(sockets.userID);
    }
  }
  return users;
};

const GetMessages = async () => {
  // Get messages from DB
  return await Message.find().populate('author', '-pass');
};

const userJoinedRoomHandler = (socket, io) => {
  socket.on('user joined room', async () => {
    // Send new user list of users in chat
    const users = getUserList(io);
    socket.emit('users', users);

    // Send new user list of messages in chat
    const messages = await GetMessages();
    socket.emit('messages', messages);

    // Warn all users that new user has connected (used to update local lists of users)
    socket.broadcast.emit('user connected', {
      userID: socket.userID,
      username: socket.username,
      status: 'Online',
    });
  });
};

const userLeftRoomHandler = (socket) => {
  // Warn all users that user left room
  socket.on('leave room', () => {
    socket.broadcast.emit('user left room', {
      userID: socket.userID,
      username: socket.username,
    });
  });
};

const sendMessageHandler = (socket) => {
  // Warn all users that msg was sent
  socket.on('Send message', (msg) => {
    socket.broadcast.emit('Sent message', msg);
  });
};

const disconnectHandler = (socket) => {
  // Warn all users that user disconected
  socket.on('disconnect', async () => {
    socket.broadcast.emit('user disconnected', {
      userID: socket.userID,
      username: socket.username,
    });
  });
};

const connectionHandler = (io, sessionStore) => {
  io.on('connection', (socket) => {
    // Asign sessionID used to distinguish sessions from same browser
    socket.emit('session', {
      sessionID: socket.sessionID,
      userID: socket.userID,
    });
    // Save asigned sessionID on server
    sessionStore.saveSession(socket.sessionID, {
      userID: socket.userID,
      username: socket.username,
    });

    userJoinedRoomHandler(socket, io);

    userLeftRoomHandler(socket);

    sendMessageHandler(socket);

    disconnectHandler(socket);
  });
};

module.exports = {
  userJoinedRoomHandler,
  userLeftRoomHandler,
  sendMessageHandler,
  disconnectHandler,
  connectionHandler,
};
