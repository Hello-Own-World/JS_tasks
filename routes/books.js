const express = require("express")
const router = express.Router()

//Get all books 
router.get('/', (req, res) => {
    res.render("books/index")
})

//New book route 
router.get('/new', (req, res) => {
    res.render("books/new")
})

//Create book route 
router.post('/', (req, res)=>{
    res.send('Create')
})

module.exports = router