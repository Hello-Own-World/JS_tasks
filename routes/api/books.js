const express = require('express');
const Book = require('../../models/book');
const { validate } = require('../../middleware');
// const schemas = require('../../modules/schemas');
const { bookSchema } = require('../../modules');

const router = express.Router();

// Get all books
router.get('/', async (req, res) => {
  const searchOptions = {};

  if (req.query.name) {
    searchOptions.name = new RegExp(req.query.name, 'i');
  }

  try {
    const books = await Book.find(searchOptions);
    res.send(books); // return json with all books
  } catch {
    res.redirect('/');
  }
});

// Create book
router.post('/', validate(bookSchema.bodyPost), async (req, res) => {
  const { title, author, genre } = req.body;

  const book = new Book({ title, author, genre });

  req.defaultQueue.add({ title });

  try {
    await book.save();
    res.status(200).json({ msg: 'Success' });
  } catch {
    res.status(400).json({ msg: 'Fail' });
  }
});

// Delete book
router.delete('/', validate(bookSchema.bodyDelGet), async (req, res) => {
  const { title, author } = req.body;

  const bookExist = await Book.findOne({ title, author });

  if (!bookExist) {
    res.status(404).send('Book  is not in the DB');
    return;
  }

  try {
    await Book.deleteOne({ title, author });

    res.status(200).json({ msg: `Successful deletion of book: ${title}` });
  } catch {
    res.status(404).send('Error occured while deleting the book');
  }
});

// Get particular book
router.get('/search', validate(bookSchema.bodyDelGet), async (req, res) => {
  const { title, author } = req.body;

  const bookExist = await Book.findOne({ title, author });

  if (!bookExist) {
    res.status(404).json({ msg: `Book ${title} is not in the DB` });
    return;
  }

  try {
    res.status(200).send(bookExist);
  } catch {
    res.status(404).send('Error occured getting the book');
  }
});

// Edit particular book
router.put('/', validate(bookSchema.bodyPut), async (req, res) => {
  const {
    title,
    author,
    genre,
    new_title: newTitle,
    new_author: newAuthor,
  } = req.body;

  const bookExist = await Book.findOne({ title, author });

  if (!bookExist) {
    res.status(404).json({ msg: `Book ${title} is not in the DB` });
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
    res.status(404).send('Error occured while updating the book');
  }
});

module.exports = router;
