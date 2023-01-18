const express = require("express")
const router = express.Router()
const Message = require("../models/message")
const { auth, validate } = require("../middleware")
const schemas = require('../modules/schemas');

router.get('/', auth, async (req, res) => {
    try {
        const messages = await Message.find().populate('author', '-pass')

        res.send(messages) // return json of all messages
    } catch {
        res.redirect('/')
    }
})


router.post('/sendMsg', [validate(schemas.sendMsgPOST), auth], async (req, res) => {

    const { body } = req.body

    try {

        let date_ob = new Date();
        const currTime = date_ob.getFullYear() + "/" + (date_ob.getMonth() + 1) + "/" + date_ob.getDate() + " " + (date_ob.getHours() + 2) + ":" + date_ob.getMinutes();

        const msg = new Message({ body, author: req.user, datetime: currTime })


        const newMsg = await msg.save()

        // res.redirect('/chat')

        res.status(200).json(newMsg)

    } catch {
        res.status(404).send("Error creating a book")
    }
})

// FIXME /api/chat/message/:id - DELETE

//Delete message  
router.delete('/sendMsg', [validate(schemas.sendMsgDELETE), auth], async (req, res) => { // Deletion is based on mongodb id 
    //(idea: you get response from server with list of messages, then client chooses which one to delete and passes that document back to DB)

    const { id } = req.body

    const message = await Message.findOne({ _id: id })

    if (!message) {
        res.status(404).send('No such message')
        return
    }

    if (message.author.id === req.user.id) {
        try {
            const result = await Message.deleteOne({ _id: id })

            res.status(200).send("Successful deletion of message: \n" + message.body + "\n")

        } catch {
            res.status(404).send("Error occured while deleting the message")
        }
    } else {
        res.status(404).send("Permission denied")
    }

})

// FIXME /api/chat/message/:id - PUT/PATCH
//Edit message  
router.put('/sendMsg', [validate(schemas.sendMsgPUT), auth], async (req, res) => { 
    const { id, body } = req.body

    const message = await Message.findOne({ _id: id })

    if (!message) {
        res.status(404).send('No such message')
        return
    }

    if (message.author === req.user.id) {
        try {
            message.body = body
            message.edited = true

            let date_ob = new Date();
            const currTime = date_ob.getFullYear() + "/" + (date_ob.getMonth() + 1) + "/" + date_ob.getDate() + " " + (date_ob.getHours() + 2) + ":" + date_ob.getMinutes();


            message.datetime = currTime

            const newMsg = await message.save()
            
            res.status(200).send("Successful edit of message: \n" + message.body + "\n")

        } catch {
            res.status(404).send("Error occured while editing the message")

        }
    } else {
        res.status(404).send("Permission denied")
    }

})


module.exports = router