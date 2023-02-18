const checkUsernameInSocket = (socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error('invalid username'));
  }
  console.log(username);
  socket.username = username;
  next();
};

module.exports = checkUsernameInSocket;
