const Message = require('../models/message');

const getUserList = (io) => {
  // Get list of all current users from sockets
  const users = [];
  const savedUserIds = []; // to avoid different sockets that are used by same browser but in different tabs
  for (let [id, sockets] of io.of('/').sockets) {
    if (!savedUserIds.includes(sockets.userId)) {
      users.push({
        userId: sockets.userId,
        username: sockets.username,
        status: 'Online',
      });
      savedUserIds.push(sockets.userId);
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
      userId: socket.userId,
      username: socket.username,
      status: 'Online',
    });
  });
};

const userLeftRoomHandler = (socket) => {
  // Warn all users that user left room
  socket.on('leave room', () => {
    socket.broadcast.emit('user left room', {
      userId: socket.userId,
      username: socket.username,
    });
  });
};

const disconnectHandler = (socket) => {
  // Warn all users that user disconnected
  socket.on('disconnect', async () => {
    socket.broadcast.emit('user disconnected', {
      userId: socket.userId,
      username: socket.username,
    });
  });
};

const connectionHandler = (io, sessionStore) => {
  io.on('connection', (socket) => {
    // Assign sessionId used to distinguish sessions from same browser
    socket.emit('session', {
      sessionId: socket.sessionId,
      userId: socket.userId,
    });
    // Save assigned sessionId on server
    sessionStore.saveSession(socket.sessionId, {
      userId: socket.userId,
      username: socket.username,
    });

    userJoinedRoomHandler(socket, io);

    userLeftRoomHandler(socket);

    disconnectHandler(socket);
  });
};

module.exports = {
  userJoinedRoomHandler,
  userLeftRoomHandler,
  disconnectHandler,
  connectionHandler,
};
