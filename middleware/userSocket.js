const { v4: uuidv4 } = require('uuid');

const checkUsernameInSocket = (socket, next) => {
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error('invalid username'));
  }
  console.log(username);
  socket.username = username;
  next();
};

const checkSessionId = (sessionStore) => {
  return (socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;
    console.log('sessionId ' + sessionID);
    if (sessionID) {
      // find existing session
      const session = sessionStore.findSession(sessionID);
      console.log('Found session ' + session);
      console.log('all sessions in store ' + sessionStore.findAllSessions());
      if (session) {
        socket.sessionID = sessionID;
        socket.userID = session.userID;
        socket.username = session.username;
        console.log(
          'Found local session with params: ' + socket.sessionID + ' ' + socket.userID + ' ' + socket.username
        );
        return next();
      }
    }
    const username = socket.handshake.auth.username;
    if (!username) {
      return next(new Error('invalid username'));
    }
    // create new session
    socket.sessionID = uuidv4();
    socket.userID = uuidv4();
    socket.username = username;
    console.log('created new session ' + socket.sessionID + ' ' + socket.userID);
    next();
  };
};

module.exports = { checkUsernameInSocket, checkSessionId };
