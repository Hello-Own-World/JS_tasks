const express = require('express');
const createError = require('http-errors');
const Book = require('../../models/book');
const { validate } = require('../../middleware');
const { bookSchema } = require('../../modules/schemas');

const router = express.Router();

// Get all books
router.get('/', async (req, res, next) => {
  const searchOptions = {};

  if (req.query.name) {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }

  try {
    const books = await Book.find(searchOptions);
    res.send(books);
  } catch {
    next(createError(500, 'Error occured while retrieving books from DB'));
  }
});

// Create book
router.post(
  '/',
  validate(bookSchema.bodyPost, 'body'),
  async (req, res, next) => {
    const { title, author, genre } = req.body;

    const book = new Book({ title, author, genre });

    req.defaultQueue.add({ title });

    try {
      await book.save();
      res.status(200).json({ msg: 'Success' });
    } catch {
      next(createError(500, 'Error occured while saving book to DB'));
    }
  }
);

// Delete book
router.delete('/:author/:title', async (req, res, next) => {
  const { title, author } = req.params;

  const bookExist = await Book.findOne({ title, author });

  if (!bookExist) {
    next(createError(400, "Book doesn't exist"));
    return;
  }

  try {
    await Book.deleteOne({ title, author });

    res.status(200).json({ msg: `Successful deletion of book: ${title}` });
  } catch {
    next(createError(500, 'Error occured while deleting the book from DB'));
  }
});

// Get particular book
router.get('/:author/:title', async (req, res, next) => {
  const { title, author } = req.params;

  const bookExist = await Book.findOne({ title, author });

  if (!bookExist) {
    next(createError(400, `Book ${title} is not in the DB`));
    return;
  }

  try {
    res.status(200).send(bookExist);
  } catch {
    next(createError(500, 'Error occured while retrieving the book from DB'));
  }
});

// Edit particular book
router.put(
  '/',
  validate(bookSchema.bodyPut, 'body'),
  async (req, res, next) => {
    const { title, author, genre, newTitle, newAuthor } = req.body;

    const bookExist = await Book.findOne({ title, author });

    if (!bookExist) {
      next(createError(400, `Book ${title} is not in the DB`));
      return;
    }

    try {
      if (newTitle) {
        bookExist.title = newTitle;
      }
      if (newAuthor) {
        bookExist.author = newAuthor;
      }
      if (genre) {
        bookExist.genre = genre;
      }

      const newBook = await bookExist.save();

      res.status(200).send(newBook);
    } catch {
      next(createError(500, 'Error occured while updating the book from DB'));
    }
  }
);

module.exports = router;
