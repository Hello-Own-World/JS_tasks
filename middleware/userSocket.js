const { v4: uuidv4 } = require('uuid');

const checkSessionId = (sessionStore) => {
  // Check if there is sessionID saved in browser,
  // if so asign same sessionID,
  // otherwise create new one
  return (socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;
    if (sessionID) {
      const session = sessionStore.findSession(sessionID);
      if (session) {
        socket.sessionID = sessionID;
        socket.userID = session.userID;
        socket.username = session.username;
        return next();
      }
    }
    const username = socket.handshake.auth.username;
    if (!username || username === 'Guest') {
      return next(new Error('invalid username'));
    }
    // create new session
    socket.sessionID = uuidv4();
    socket.userID = uuidv4();
    socket.username = username;
    next();
  };
};

module.exports = { checkSessionId };
