const express = require('express');
const createError = require('http-errors');
const Message = require('../../models/message');
const { auth, validate } = require('../../middleware');
const { chatSchema } = require('../../modules/schemas');

const router = express.Router();

// Get all messages
router.get('/', auth, async (req, res, next) => {
  try {
    const messages = await Message.find().populate('author', '-pass');

    res.send(messages);
  } catch {
    next(createError(500, 'Error occured while retrieving messages from DB'));
  }
});

// Send message
router.post('/message', [validate(chatSchema.msgBodyPostPut, 'body'), auth], async (req, res, next) => {
  try {
    const { body } = req.body;

    const msg = new Message({ body, author: req.user });

    const newMsg = await msg.save();

    res.status(200).json(newMsg);
  } catch (err) {
    console.error(err);
    next(createError(500, 'Error occured while saving messages into DB'));
  }
});

// Delete message
router.delete('/message/:id', [validate(chatSchema.msgParamDelPut, 'body'), auth], async (req, res, next) => {
  const { id } = req.params;

  const message = await Message.findOne({ _id: id });

  if (!message) {
    next(createError(400, "Message does't exist"));
    return;
  }

  if (String(message.author) === String(req.user.id)) {
    try {
      await Message.deleteOne({ _id: id });
      res.status(200).json({ msg: `Successful deletion of message: ${message.body}` });
    } catch {
      next(createError(500, 'Error occured while deleting messages from DB'));
    }
  } else {
    next(createError(403, 'Forbidden action'));
  }
});

// Edit message
router.put(
  '/message/:id',
  [validate(chatSchema.msgBodyPostPut, 'body'), validate(chatSchema.msgParamDelPut, 'params'), auth],
  async (req, res, next) => {
    const { body } = req.body;
    const { id } = req.params;

    const message = await Message.findOne({ _id: id });

    if (!message) {
      next(createError(400, "Message doesn't exist"));
      return;
    }

    if (String(message.author) === String(req.user.id)) {
      try {
        message.body = body;
        await message.save();

        res.status(200).json({ msg: `Successful message update: ${message.body}` });
      } catch {
        next(createError(500, 'Error occured while updating messages in DB'));
      }
    } else {
      next(createError(403, 'Forbidden action'));
    }
  }
);

module.exports = router;
