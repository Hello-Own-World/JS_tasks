const express = require("express")
const router = express.Router()
const Book = require('../models/book')
const validate = require("../middleware/validation")
const schemas = require('../modules/schemas');

//Get all books 
router.get('/', async (req, res) => {
    let searchOptions = {}

    if (req.query.name) {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }

    try {
        const books = await Book.find(searchOptions)

        // res.render("books/index", { books: books, searchOptions: req.query }) // render page with search option and display list of books

        res.send(books) //return json with all books
    } catch {
        res.redirect('/')
    }

})

//New book route 
router.get('/new', (req, res) => {
    res.render("books/new", { book: new Book() })
})

//Create book  
router.post('/', validate(schemas.bookPOST), async (req, res) => {
    const { title, author, genre } = req.body

    const book = new Book({ title, author, genre })

    req.defaultQueue.add({ title });

    try {
        const newBook = await book.save()

        res.redirect('/books')

    } catch {
        res.render('books/new', {
            book: book,
            errorMessage: "Error creating book"
        })
    }

})

//Delete book  
router.delete('/', validate(schemas.bookDelGet), async (req, res) => {
    const { title, author } = req.body

    const bookExist = await Book.findOne({ title: title, author: author })
    console.log('Bookexist' + bookExist)

    if (!bookExist) {
        res.status(404).send('Book "' + title + '" is not in the DB')
        return
    }

    try {
        const result = await Book.deleteOne({ title: title, author: author })

        res.status(200).send("Successful deletion of book: " + title)

    } catch {
        res.status(404).send("Error occured while deleting the book")

    }

})

//Get particular book  
router.get('/search', validate(schemas.bookDelGet), async (req, res) => {
    const { title, author } = req.body

    const bookExist = await Book.findOne({ title: title, author: author })
    console.log('Bookexist' + bookExist)

    if (!bookExist) {
        res.status(404).send('Book "' + title + '" is not in the DB')
        return
    }

    try {

        res.status(200).send(bookExist)

    } catch {
        res.status(404).send("Error occured getting the book")

    }

})

//Edit particular book  
router.put('/', validate(schemas.bookPUT), async (req, res) => {
    const { title, author, genre, new_title, new_author } = req.body

    const bookExist = await Book.findOne({ title: title, author: author })
    console.log('Bookexist' + bookExist)

    if (!bookExist) {
        res.status(404).send('Book "' + title + '" is not in the DB')
        return
    }

    try {
        if (new_title) {
            bookExist.title = new_title
        }
        if (new_author) {
            bookExist.author = new_author
        }
        if (genre) {
            bookExist.genre = genre
        }

        const newBook = await bookExist.save()

        res.status(200).send(newBook)

    } catch {
        res.status(404).send("Error occured while updating the book")
    }

})


module.exports = router