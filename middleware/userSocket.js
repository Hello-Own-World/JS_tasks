const { v4: uuidv4 } = require('uuid');

const checkSessionId = (sessionStore) => {
  return (socket, next) => {
    const sessionID = socket.handshake.auth.sessionID;
    console.log('sessionId ' + sessionID);
    if (sessionID) {
      // find existing session
      console.log('looking for session' + sessionID);
      const session = sessionStore.findSession(sessionID);
      console.log('Found session ' + session);
      const allSessions = sessionStore.findAllSessions();
      allSessions.forEach((el) => {
        console.log('sessionID ' + el.sessionID);
      });
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
    if (!username || username === 'Guest') {
      return next(new Error('invalid username'));
    }
    // create new session
    socket.sessionID = uuidv4();
    socket.userID = uuidv4();
    socket.username = username;
    console.log('created new session ' + socket.sessionID + ' ' + socket.userID + ' ' + socket.username);
    next();
  };
};

module.exports = { checkSessionId };
