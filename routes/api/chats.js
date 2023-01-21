const express = require('express');
const createError = require('http-errors');
const Message = require('../../models/message');
const { auth, validate } = require('../../middleware');
const { chatSchema } = require('../../modules');

const router = express.Router();

router.get('/', auth, async (req, res, next) => {
  try {
    const messages = await Message.find().populate('author', '-pass');

    res.send(messages); // return json of all messages
  } catch {
    next(createError(500, 'Error occured while retrieving messages from DB'));
  }
});

router.post(
  '/message',
  [validate(chatSchema.msgBodyPost), auth],
  async (req, res, next) => {
    const { body } = req.body;

    try {
      const msg = new Message({ body, author: req.user });

      const newMsg = await msg.save();

      res.status(200).json(newMsg);
    } catch {
      next(createError(500, 'Error occured while saving messages into DB'));
    }
  }
);

// FIXME /api/chat/message/:id - DELETE

// Delete message
router.delete(
  '/message',
  [validate(chatSchema.msgBodyDel), auth],
  async (req, res, next) => {
    const { id } = req.body;

    const message = await Message.findOne({ _id: id });

    if (!message) {
      next(createError(400, "Message does't exist"));
      return;
    }

    if (message.author.id === req.user.id) {
      try {
        await Message.deleteOne({ _id: id });
        res
          .status(200)
          .json({ msg: `Successful deletion of message: ${message.body}` });
      } catch {
        next(createError(500, 'Error occured while deleting messages from DB'));
      }
    } else {
      next(createError(403, 'Forbidden action'));
    }
  }
);

// FIXME /api/chat/message/:id - PUT/PATCH
// Edit message
router.put(
  '/message',
  [validate(chatSchema.msgBodyPut), auth],
  async (req, res, next) => {
    const { id, body } = req.body;

    const message = await Message.findOne({ _id: id });

    if (!message) {
      next(createError(400, "Message doesn't exist"));
      return;
    }

    if (message.author === req.user.id) {
      try {
        message.body = body;
        await message.save();

        res
          .status(200)
          .json({ msg: `Successful deletion of message: ${message.body}` });
      } catch {
        next(createError(500, 'Error occured while updating messages in DB'));
      }
    } else {
      next(createError(403, 'Forbidden action'));
    }
  }
);

module.exports = router;
