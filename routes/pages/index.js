const express = require('express');

const router = express.Router();

const bookRouter = require('./books');
const userRouter = require('./users');
const chatRouter = require('./chats');

router.use('/book', bookRouter);
router.use('/chat', chatRouter);
router.use('/user', userRouter);

router.get('/', (req, res) => {
  res.render('index', {
    accessToken: '123123',
  });
});

module.exports = router;
