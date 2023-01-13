const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const Message = require("../models/message")

//with auth
// router.get('/', auth, (req, res) => {
//     res.render("chat/index")
// })

// without auth
router.get('/', async (req, res) => {

    try {
        const messages = await Message.find()

        res.render("chat/index", { messages: messages})
    } catch {
        res.redirect('/')
    }

})


router.post('/sendMsg', async (req, res) => {

    const { body, author } = req.body

    try {
        if (body === '') {
            throw Error("Empty name")
        }

        let date_ob = new Date();
        const currTime = date_ob.getFullYear() + "/" + (date_ob.getMonth()+1) + "/" + date_ob.getDate() + " " + (date_ob.getHours()+2) + ":" + date_ob.getMinutes();
        
        const msg = new Message({ body, author, datetime:currTime })


        const newMsg = await msg.save()

        res.redirect('/chat')

    } catch {
        res.render('chat/index', {
            messages: msg,
            errorMessage: "Error creating book"
        })
    }




})


module.exports = router