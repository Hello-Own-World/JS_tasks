const express = require("express")
const router = express.Router()
const Book = require('../models/book')

//Get all books 
router.get('/', (req, res) => {
    res.render("books/index")
})

//New book route 
router.get('/new', (req, res) => {
    res.render("books/new", { book: new Book() })
})

//Create book route 
router.post('/', (req, res) => {
    const book = new Book({
        name: req.body.name
    })
    book.save((err, newBook)=>{
        if(err){
            res.render('books/new', {
                book: book,
                errorMessage: "Error creating book"
            })
        }else{
            // res.redirect('books/${newBook.id}')
            res.redirect('/books')
        }
    })
    // res.send(req.body.name)
})

module.exports = router