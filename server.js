const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');
const { Server } = require('socket.io');
const { createServer } = require('http');

const { initConnection } = require('./config/db');
const defaultQueue = require('./queue');

const apiRouter = require('./routes/api/index');

const { PORT } = process.env;

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
  /* options */
});

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
  console.log('New user connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  });
});

initConnection((err) => {
  if (err) console.log(err);

  httpServer.listen(PORT, () => {
    console.log(`Listening http://localhost:${PORT}`);
  });
});
