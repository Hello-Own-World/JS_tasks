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
    const { name } = req.body
    if (!name){
        res.redirect(400, '/')
        return
    }

    const book = new Book({ name })

    req.defaultQueue.add({ name });

    try {
        if (book.name === '') {
            throw Error("Empty name")
        }
        const newBook = await book.save()
        
        res.redirect('/books')

    } catch {
        res.render('books/new', {
            book: book,
            errorMessage: "Error creating book"
        })
    }

})

module.exports = router