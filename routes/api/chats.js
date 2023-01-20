const express = require('express');
const Message = require('../../models/message');
const { auth, validate } = require('../../middleware');
const { chatSchema } = require('../../modules');

const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const messages = await Message.find().populate('author', '-pass');

    res.send(messages); // return json of all messages
  } catch {
    res.redirect('/');
  }
});

router.post(
  '/message',
  [validate(chatSchema.msgBodyPost), auth],
  async (req, res) => {
    const { body } = req.body;

    try {
      const msg = new Message({ body, author: req.user });

      const newMsg = await msg.save();

      res.status(200).json(newMsg);
    } catch {
      res.status(404).send('Error creating a book');
    }
  }
);

// FIXME /api/chat/message/:id - DELETE

// Delete message
router.delete(
  '/message',
  [validate(chatSchema.msgBodyDel), auth],
  async (req, res) => {
    // Deletion is based on mongodb id
    // (idea: you get response from server with list of messages, then client chooses which one to delete and passes that document back to DB)

    const { id } = req.body;

    const message = await Message.findOne({ _id: id });

    if (!message) {
      res.status(404).send('No such message');
      return;
    }

    if (message.author.id === req.user.id) {
      try {
        await Message.deleteOne({ _id: id });

        res
          .status(200)
          .json({ msg: `Successful deletion of message: ${message.body}` });
      } catch {
        res
          .status(404)
          .json({ msg: `Error occured while deleting the message` });
      }
    } else {
      res.status(404).json({ msg: `Permission denied` });
    }
  }
);

// FIXME /api/chat/message/:id - PUT/PATCH
// Edit message
router.put(
  '/message',
  [validate(chatSchema.msgBodyPut), auth],
  async (req, res) => {
    const { id, body } = req.body;

    const message = await Message.findOne({ _id: id });

    if (!message) {
      res.status(404).send('No such message');
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
        res
          .status(404)
          .json({ msg: `Error occured while editing the message` });
      }
    } else {
      res.status(404).send('Permission denied');
    }
  }
);

module.exports = router;
