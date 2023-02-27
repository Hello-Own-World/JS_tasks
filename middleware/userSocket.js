const { v4: uuidv4 } = require('uuid');

const checkSessionId = (sessionStore) => {
  // Check if there is sessionId saved in browser,
  // if so assign same sessionId,
  // otherwise create new one
  return (socket, next) => {
    const sessionId = socket.handshake.auth.sessionId;
    if (sessionId) {
      const session = sessionStore.findSession(sessionId);
      if (session) {
        socket.sessionId = sessionId;
        socket.userId = session.userId;
        socket.username = session.username;
        return next();
      }
    }
    const username = socket.handshake.auth.username;
    if (!username || username === 'Guest') {
      return next(new Error('invalid username'));
    }
    // create new session
    socket.sessionId = uuidv4();
    socket.userId = uuidv4();
    socket.username = username;
    next();
  };
};

module.exports = { checkSessionId };
