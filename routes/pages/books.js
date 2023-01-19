const express = require('express');
const Book = require('../../models/book');

const router = express.Router();

// New book route
router.get('/new', (req, res) => {
  res.render('books/new', { book: new Book() });
});

module.exports = router;
