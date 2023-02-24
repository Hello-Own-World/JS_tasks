const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');
const { createServer } = require('http');
const Message = require('./models/message');

const { initConnection } = require('./config/db');
const defaultQueue = require('./queue');

const apiRouter = require('./routes/api/index');
const { checkSessionId } = require('./middleware');
const { SessionStore } = require('./modules/sessionStore');

const { PORT } = process.env;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:4000',
  },
});

const sessionStore = new SessionStore();

io.use(checkSessionId(sessionStore));

app.use(expressLayouts);
app.set('layout', 'layouts/layout');

app.use(bodyParser.urlencoded({ limit: '10mb', extended: false }));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  req.defaultQueue = defaultQueue;
  next();
});

app.use(express.static(path.join(__dirname, './dist')));

app.use('/api', apiRouter);

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './dist/index.html'));
});

io.on('connection', (socket) => {
  console.log('New user connected' + socket.id);

  socket.emit('session', {
    sessionID: socket.sessionID,
    userID: socket.userID,
  });

  sessionStore.saveSession(socket.sessionID, {
    userID: socket.userID,
    username: socket.username,
  });

  socket.on('user joined room', async () => {
    // get list of all current users and send it to new user
    const users = [];
    const savedUserIds = []; // to avoid diferent sockets that are used by sa,e pc but in different tabs
    for (let [id, sockets] of io.of('/').sockets) {
      if (!savedUserIds.includes(sockets.userID)) {
        console.log('sockets.userID ' + sockets.userID + ' socket.userID' + socket.userID);
        users.push({
          userID: sockets.userID,
          username: sockets.username,
          status: 'Online',
        });
        savedUserIds.push(sockets.userID);
      }
    }

    socket.emit('users', users);
    console.log('users were emited ');

    // const messages = [];

    const GetMessages = async () => {
      return await Message.find().populate('author', '-pass');
    };

    const messages = await GetMessages();

    messages.map((el) => {
      console.log(el.body);
    });

    socket.emit('messages', messages);
    console.log('mesagges were emited ');

    // warn all users that new user has connected (used to update local lists of users)
    socket.broadcast.emit('user connected', {
      userID: socket.userID,
      username: socket.username,
      status: 'Online',
    });
  });

  socket.on('leave room', () => {
    socket.broadcast.emit('user left room', {
      userID: socket.userID,
      username: socket.username,
    });
  });

  socket.on('Send message', (msg) => {
    console.log('GOT SEND MESSAGE');
    console.log('msg ' + msg);
    console.log('body ' + msg.body);
    console.log('author' + msg.author);
    socket.broadcast.emit('Sent message', msg);
    console.log('EMIT SENT USER MESSAGE');
  });

  socket.onAny((event, ...args) => {
    console.log(event, args);
  });

  socket.on('disconnect', async () => {
    console.log('check matching sockets ' + socket.userID);
    const matchingSockets = await io.in(socket.sessionID).fetchSockets();
    console.log('matching sockets ' + matchingSockets);
    if (matchingSockets) {
      socket.broadcast.emit('user disconnected', {
        userID: socket.userID,
        username: socket.username,
      });

      sessionStore.saveSession(socket.sessionID, {
        userID: socket.userID,
        username: socket.username,
      });

      console.log('session was saved lcoaly ');
    }

    console.log('User was disconnected');
  });
});

initConnection((err) => {
  if (err) console.log(err);

  httpServer.listen(PORT, () => {
    console.log(`Listening http://localhost:${PORT}`);
  });
});
