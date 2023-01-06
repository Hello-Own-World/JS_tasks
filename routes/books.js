const express = require("express")
const router = express.Router()
const Book = require('../models/book')

//Get all books 
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({}) // no condition
        res.render("books/index", { books: books })
    } catch {
        res.redirect('/')
    }

})

//New book route 
router.get('/new', (req, res) => {
    res.render("books/new", { book: new Book() })
})

//Create book route 
router.post('/', async (req, res) => {
    const book = new Book({
        name: req.body.name
    })

    try {
        const newBook = await book.save()
        if (newBook.name === '') {
            throw Error("Empty name")
        }
        res.redirect('/books')

    } catch {
        res.render('books/new', {
            book: book,
            errorMessage: "Error creating book"
        })
    }


    // console.log(book.name)

    // book.save((err, newBook)=>{
    //     if(err || book.name !== ''){
    //         res.render('books/new', {
    //             book: book,
    //             errorMessage: "Error creating book"
    //         })
    //     }else{
    //         // res.redirect('books/${newBook.id}')
    //         res.redirect('/books')
    //     }
    // })
    // // res.send(req.body.name)



})

module.exports = router