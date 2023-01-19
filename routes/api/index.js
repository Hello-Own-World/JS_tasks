const express = require('express');

const bookRouter = require('./books');
const userRouter = require('./users');
const chatRouter = require('./chats');

const router = express.Router();

router.use('/book', bookRouter);
router.use('/chat', chatRouter);
router.use('/user', userRouter);

module.exports = router;
