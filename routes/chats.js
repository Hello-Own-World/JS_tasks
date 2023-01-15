const express = require("express")
const router = express.Router()
const auth = require("../middleware/auth")
const Message = require("../models/message")

router.get('/', auth, async (req, res) => {

    try {
        const messages = await Message.find()

        // res.render("chat/index", { messages: messages }) // render page with all messagees and oand input/send msg field

        res.send(messages) // return json of all messages
    } catch {
        res.redirect('/')
    }

})


router.post('/sendMsg', auth, async (req, res) => {

    const { body } = req.body

    try {
        if (!body) {
            throw Error("Empty name")
        }

        let date_ob = new Date();
        const currTime = date_ob.getFullYear() + "/" + (date_ob.getMonth() + 1) + "/" + date_ob.getDate() + " " + (date_ob.getHours() + 2) + ":" + date_ob.getMinutes();

     
        const msg = new Message({ body, author: req.user.email, datetime: currTime })


        const newMsg = await msg.save()

        // res.redirect('/chat')

        res.status(200).send("Message successfully created " + newMsg)

    } catch {
        res.status(404).send("Error creating a book")
    }
})


module.exports = router